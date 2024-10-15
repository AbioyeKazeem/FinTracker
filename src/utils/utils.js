export function spendingAnalyze(transactions, limits) {
    // Ensure transactions is a valid array
    if (!Array.isArray(transactions) || transactions.length === 0) {
        return ["No transactions available for analysis."];
    }

    // Ensure limits is a valid object
    if (!limits || typeof limits !== 'object') {
        return ["No spending limits defined."];
    }

    const categoryTotals = {};

    transactions.forEach((transaction) => {
        if (transaction.type === "expense") {
            const category = transaction.category || "uncategorized";
            if (!categoryTotals[category]) {
                categoryTotals[category] = 0;
            }
            categoryTotals[category] += transaction.amount;
        }
    });

    const insights = [];

    // Compare each category total against its limit
    Object.keys(limits).forEach((category) => {
        if (categoryTotals[category] > limits[category]) {
            insights.push(`You are spending a lot on ${category} this month. Consider cutting back.`);
        }
    });

    // If no spending issues found, provide positive feedback
    if (!insights.length) {
        insights.push("Great job! You are managing your spending well.");
    }

    return insights;
}
