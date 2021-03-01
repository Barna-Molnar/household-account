import { findDeleteOrDecrease } from "./findDeleteOrDecrease";


export const updateAccsRepay = (fromAcc, forAcc, transactionTyp, amount, message, state, prev, date) => {
    return state.accounts.map((acc) => {
        if (acc.username === fromAcc) {
            return {
                ...acc,
                movements: [{
                        amount: -amount,
                        date: date,
                        transactionTyp: transactionTyp,
                        sender: fromAcc,
                        recepient: forAcc,
                        message: message,
                    },
                    ...acc.movements,
                ],
                balance: acc.balance - amount,
                debt: findDeleteOrDecrease(prev.currentAcc.debt, forAcc, amount),
            };
        }
        if (acc.username === forAcc) {
            return {
                ...acc,
                movements: [{
                        amount: Number(amount),
                        date: date,
                        transactionTyp: transactionTyp,
                        sender: fromAcc,
                        recepient: forAcc,
                        message: message,
                    },
                    ...acc.movements,
                ],
                balance: acc.balance + Number(amount),
                lended: findDeleteOrDecrease(acc.lended, fromAcc, amount),
            };
        }
        return acc;
    })
}