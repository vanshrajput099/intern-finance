import { format } from "date-fns";

export const convertToMonthlyData = (transactions) => {
    const monthMap = {};

    transactions.forEach((txn) => {
        const date = new Date(txn.date);
        const month = format(date, "MMM");

        if (!monthMap[month]) {
            monthMap[month] = 0;
        }

        monthMap[month] += txn.amount;
    });

    const result = Object.entries(monthMap).map(([month, expenses]) => ({
        month,
        expenses,
    }));

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    result.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    return result;
}
