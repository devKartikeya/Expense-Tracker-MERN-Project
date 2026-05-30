const TransactionSummary = ({ transactions, budget }) => {
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;
    const profitOrLoss = netBalance >= 0 ? "Profit" : "Loss";

    const percentUsed = budget > 0 ? ((totalExpenses / budget) * 100).toFixed(1) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
            {/* Income */}
            <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold text-green-700">Total Income</h2>
                <p className="text-2xl font-semibold text-green-600">₹{totalIncome}</p>
            </div>

            {/* Expenses */}
            <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold text-red-700">Total Expenses</h2>
                <p className="text-2xl font-semibold text-red-600">₹{totalExpenses}</p>
            </div>

            {/* Net Balance */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold text-blue-700">Net Balance</h2>
                <p className={`text-2xl font-semibold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {netBalance >= 0 ? `+₹${netBalance}` : `-₹${Math.abs(netBalance)}`}
                </p>
                <p className="text-sm text-gray-600">{profitOrLoss}</p>
            </div>

            {/* Budget Usage */}
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-bold text-yellow-700">Budget Usage</h2>
                <p className="text-2xl font-semibold text-yellow-600">{percentUsed}%</p>
                <p className="text-sm text-gray-600">of ₹{budget} monthly budget</p>
            </div>
        </div>
    );
};


export default TransactionSummary;