import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TransactForm from "./TransactForm";
import TransactionList from "./TransactionList";
import Balance from "./Balance";
import IncomeExpense from "./IncomeExpense";
import SearchFilter from "./SearchFilter";
import Notifications from "./Notifications"; 
import Signup from "./Signup";
import Login from "./Login";
import Reset from "./Reset";
import ReccuringTransact from "./ReccuringTransact";
import ExportData from "./ExportData";
import ProfilePage from "./ProfilePage";
import { spendingAnalyze } from "../utils/utils";
import FinancialTips from "./FinancialTips";
import IncomeExpenseChart from "./IncExpChart";
import NetworthTracker from "./NetworthTracker";
import SpendingTrends from "./SpendingTrends";
import DebtTracker from "./DebtTracker";
import "../styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// A reusable ProtectedRoute component
const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    const [user, setUser] = useState({ name: "your name", email: "your email", phone: "Your phone number" });
    const [transactions, setTransactions] = useState([]); // Storing transactions
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [recurringTransactions, setRecurringTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [filterCriteria, setFilterCriteria] = useState({ 
        date: "",
        category: "",
        minAmount: "",
        maxAmount: ""
    });
    const [notificationLimit, setNotificationLimit] = useState(0);
    const [financialTips, setFinancialTips] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'false';
    });

    const [spendingLimits, setSpendingLimits] = useState({
        Entertainment: 10000,
        Groceries: 20000,
        Transport: 5000,
    });

    const updateUser = (newUserData) => {
        setUser(prevUser => ({ ...prevUser, ...newUserData }));
    };

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    const addRecurringTransaction = (recurringTransaction) => {
        setRecurringTransactions([...recurringTransactions, recurringTransaction]);
    };

    // Apply filters to the transactions
    useEffect(() => {
        const applyFilters = () => {
            let updatedTransactions = [...transactions];
            
            if (searchQuery) {
                updatedTransactions = updatedTransactions.filter(transaction =>
                    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            
            if (filterCriteria.date) {
                updatedTransactions = updatedTransactions.filter(transaction =>
                    transaction.date === filterCriteria.date
                );
            }
            
            if (filterCriteria.category) {
                updatedTransactions = updatedTransactions.filter(transaction =>
                    transaction.category === filterCriteria.category
                );
            }
            
            if (filterCriteria.minAmount) {
                updatedTransactions = updatedTransactions.filter(transaction =>
                    transaction.amount >= parseFloat(filterCriteria.minAmount)
                );
            }
            
            if (filterCriteria.maxAmount) {
                updatedTransactions = updatedTransactions.filter(transaction =>
                    transaction.amount <= parseFloat(filterCriteria.maxAmount)
                );
            }
            
            setFilteredTransactions(updatedTransactions);
        };

        applyFilters();
    }, [transactions, searchQuery, filterCriteria]);

    // Handle recurring transactions
    useEffect(() => {
        const addRecurringTransactions = () => {
            const now = new Date();
            const updatedTransactions = [...transactions];

            recurringTransactions.forEach((recurring) => {
                const lastAddedDate = new Date(recurring.lastAdded || 0);
                const frequencyInDays = recurring.frequency === "monthly" ? 30 : 7;

                if ((now - lastAddedDate) / (1000 * 60 * 60 * 24) >= frequencyInDays) {
                    updatedTransactions.push({
                        ...recurring,
                        date: new Date().toISOString(),
                    });
                    recurring.lastAdded = new Date().toISOString(); // Update last added date
                }
            });

            if (updatedTransactions.length > transactions.length) {
                setTransactions(updatedTransactions);
            }
        };

        addRecurringTransactions();
    }, [recurringTransactions]);

    // Analyze transactions for financial tips
    useEffect(()=> {
        const insights = spendingAnalyze(filteredTransactions);
        setFinancialTips(insights);
    }, [filteredTransactions]);

    // Split filtered transactions into income and expenses
    const incomeTransactions = filteredTransactions.filter(transaction => transaction.type === "income");
    const expenseTransactions = filteredTransactions.filter(transaction => transaction.type === "expense");

    // Calculate total income and expenses
    const totalIncome = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    // Redirect to login if unauthenticated
    useEffect(() => {
        const unprotectedRoutes = ["/login", "/signup", "/password-reset"];
        const currentPath = window.location.pathname;

        if (!isAuthenticated && !unprotectedRoutes.includes(currentPath)) {
            window.location.href = "/login"; // Redirect to login
        }
    }, [isAuthenticated]);

    return (
        <Router>
            <div className="App">
                <HeaderWrapper />
                <main className="content-container">
                    <Routes>
                        {/* Default redirect to login if unauthenticated */}
                        <Route path="/" element={<Navigate to="/login" />} />

                        {/* Authentication pages */}
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/password-reset" element={<Reset />} />

                        {/* Protected Routes */}
                        <Route path="/profile" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ProfilePage
                                    user={user}
                                    updateUser={updateUser}
                                    changePassword={() => {}}
                                    userSettings={{}}
                                    updateSettings={() => {}}
                                    deleteAccount={() => {}}
                                />
                            </ProtectedRoute>
                        } />

                        <Route path="/dashboard" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <>
                                    <Balance transactions={filteredTransactions} />
                                    <hr />
                                    <SpendingTrends transactions={transactions} />
                                    <hr />
                                    <SearchFilter
                                        setSearchQuery={setSearchQuery}
                                        setFilterCriteria={setFilterCriteria}
                                        filterCriteria={filterCriteria}
                                    />
                                    <hr />
                                    <Notifications
                                        transactions={transactions}
                                        limit={notificationLimit}
                                        setNotificationLimit={setNotificationLimit}
                                    />
                                    <hr />
                                    <ReccuringTransact addRecurringTransaction={addRecurringTransaction} />
                                    <hr />
                                    <TransactForm addTransaction={addTransaction} />
                                    <hr />
                                    <IncomeExpense transactions={filteredTransactions} />
                                    <hr />
                                    <FinancialTips tips={financialTips} />
                                    <hr />
                                    <TransactionList
                                        incomeTransactions={incomeTransactions}
                                        expenseTransactions={expenseTransactions}
                                    />
                                    <hr />
                                    <DebtTracker transactions={transactions} />
                                    <hr />
                                    <ExportData transactions={transactions} />
                                </>
                            </ProtectedRoute>
                        } />

                        <Route path="/chart" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <IncomeExpenseChart income={totalIncome} expense={totalExpense} />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </main>
                <FooterWrapper />
            </div>
        </Router>
    );
};

// Conditionally render Header and Footer based on routes
function HeaderWrapper() {
    const location = useLocation();
    const hideHeader = ["/login", "/signup", "/password-reset"].includes(location.pathname);
    return !hideHeader ? <Header /> : null;
}

function FooterWrapper() {
    const location = useLocation();
    const hideFooter = ["/login", "/signup", "/password-reset"].includes(location.pathname);
    return !hideFooter ? <Footer /> : null;
}

export default App;
