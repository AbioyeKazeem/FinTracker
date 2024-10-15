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
import "../styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import DebtTracker from "./DebtTracker";

const App = () => {
    const [user, setUser] = useState({ name: "your name", email: "your email", phone:"Your phone number" });
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
        return localStorage.getItem('isAuthenticated') === 'true';
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
    }, [setFilteredTransactions]);

    // Split filtered transactions into income and expenses
    const incomeTransactions = filteredTransactions.filter(transaction => transaction.type === "income");
    const expenseTransactions = filteredTransactions.filter(transaction => transaction.type === "expense");

    // Calculate total income and expenses
    const totalIncome = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    return (
        <Router>
            <div className="App">
                <HeaderWrapper />
                <main className="content-container">
                    <Routes>
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/password-reset" element={<Reset />} />
                        <Route path="/profile" element={isAuthenticated ? (
                            <ProfilePage
                                user={user}
                                updateUser={updateUser}
                                changePassword={() => {}}
                                userSettings={{}}
                                updateSettings={() => {}}
                                deleteAccount={() => {}}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )} />
                        <Route path="/dashboard" element={isAuthenticated ? (
                            <>
                                {/* Net Worth Tracker */}
                                
                                {/* <NetworthTracker transactions={transactions} /> */}
                                <Balance transactions={filteredTransactions} />

                                <hr />

                                {/*Spending Trends  */}
                                <SpendingTrends transactions={transactions} />
                                <hr />

                                {/* Search Filter */}
                                <SearchFilter
                                    setSearchQuery={setSearchQuery}
                                    setFilterCriteria={setFilterCriteria}
                                    filterCriteria={filterCriteria}
                                />
                                <hr />
                                {/* Notifications */}
                                <Notifications
                                    transactions={transactions}
                                    limit={notificationLimit}
                                    setNotificationLimit={setNotificationLimit}
                                />
                                <hr />
                                {/* Recurring Transactions */}
                                <ReccuringTransact addRecurringTransaction={addRecurringTransaction} />
                                <hr />
                                {/* Form for transactions */}
                                <TransactForm addTransaction={addTransaction} />
                                 <hr />
                                {/* Balance and Income/Expense */}
                                <IncomeExpense transactions={filteredTransactions} />
                                 <hr />
                                {/* Financial Tips */}
                                <FinancialTips tips={financialTips}/>
                                <hr />
                                {/* Transaction List */}
                                <TransactionList
                                    incomeTransactions={incomeTransactions}
                                    expenseTransactions={expenseTransactions}
                                />
                                <hr />
                                <DebtTracker  transactions={transactions}  />
                                <hr />
                                {/* Export Data */}
                                <ExportData transactions={transactions} />
                            </>
                        ) : (
                            <Navigate to="/login" />
                        )} />
                        <Route path="/chart" element={isAuthenticated ? (
                            <IncomeExpenseChart income={totalIncome} expense={totalExpense} />
                        ) : (
                            <Navigate to="/login" />
                        )} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </main>
                <FooterWrapper />
            </div>
        </Router>
    );
};

function HeaderWrapper() {
    const location = useLocation();
    const hideHeader = ["/login", "/signup", "/password-reset"].includes(location.pathname);
    return !hideHeader ? <Header /> : null;
};

function FooterWrapper() {
    const location = useLocation();
    const hideFooter =["/login", "/signup", "/password-reset"].includes(location.pathname);
    return !hideFooter ? <Footer /> : null;
}

export default App;
