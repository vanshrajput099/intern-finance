export const convertToCategoryData = (transactions) => {
    const categoryMap = {};

    transactions.forEach((txn) => {
        const category = txn.category;

        if (!categoryMap[category]) {
            categoryMap[category] = 0;
        }

        categoryMap[category] += txn.amount;
    });

    const result = Object.entries(categoryMap).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
    }));

    return result;
}
