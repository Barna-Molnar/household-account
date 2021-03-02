export const addMovement = (fromAcc, forAcc, amount, transactionTyp, message, date, acc) => {
    return [{
        amount: Number(amount),
        date: date,
        transactionTyp: transactionTyp,
        sender: fromAcc,
        recepient: forAcc,
        message: message,
    }, ...acc.movements];
};