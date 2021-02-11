export const updateCurrAcc = (otherAcc, transactionTyp, amount, message, prev, date) => {
    return {
        ...prev.currentAcc,
        movements: [{
                amount: -amount,
                date: date,
                transactionTyp: transactionTyp,
                sender: prev.currentAcc.username,
                recepient: otherAcc,
                message: message,
            },
            ...prev.currentAcc.movements,
        ],
        balance: prev.currentAcc.balance - amount,

        debt: transactionTyp === "repayment" ?
            prev.currentAcc.debt.map((item, i) => {
                if (item.to === otherAcc) {
                    if (item.value - amount === 0) {
                        return prev.currentAcc.debt.splice(1, i);
                    } else {
                        return { value: item.value - amount, to: otherAcc };
                    }
                } else {
                    return item;
                }
            }) : prev.currentAcc.debt,
        owed: transactionTyp === "repayment" ?
            prev.currentAcc.owed : prev.currentAcc.owed.map((item) => {
                if (item.forWho === otherAcc) {
                    return { value: item.value + amount, forWho: otherAcc };
                } else {
                    return item;
                }
            }),
    };
}