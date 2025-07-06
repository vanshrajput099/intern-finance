export const transactionSchemaChecker = ({ amount, category, date, setErrors }) => {
    const newErrors = {};
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        newErrors.amount = 'Please enter a valid positive amount';
    }
    if (!category) {
        newErrors.category = 'Please select a category';
    }
    if (!date) {
        newErrors.date = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}