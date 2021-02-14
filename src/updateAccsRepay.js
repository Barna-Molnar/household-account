import { deleteOrDecreaseDate, findDeleteOrDecrease } from './updateFunctions'
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
                debt:

                // findDeleteOrDecrease(prev.currentAcc.debt, forAcc, amount)


                    prev.currentAcc.debt.map((item, i) => {
                    if (item.to === forAcc) {
                        if (item.value - amount === 0) {
                            return prev.currentAcc.debt.splice(1, i);
                        } else {
                            return { value: item.value - amount, to: forAcc };
                        }
                    } else {
                        return item;
                    }
                }),

            };
        }
        if (acc.username === forAcc) {
            return {
                ...acc,
                movements: [{
                        amount: Number(amount),
                        date: date,
                        transactionTyp: "transactionTyp",
                        sender: fromAcc,
                        recepient: forAcc,
                        message: message,
                    },
                    ...acc.movements,
                ],
                balance: acc.balance + Number(amount),
                lended: acc.lended.map((item, i) => {
                    if (item.to === fromAcc) {
                        if (item.value - amount === 0) {
                            return acc.lended.splice(1, i);
                        } else {
                            return { value: item.value - amount, to: fromAcc };
                        }
                    } else {
                        return item;
                    }
                }),
            };
        }
        return acc;
    })
}

// this.state.accounts.map((acc) => {
//     if (acc.username === fromAcc) {
//       return {
//         ...acc,
//         movements: [
//           {
//             amount: -amount,
//             date: date,
//             transactionTyp: "repayment",
//             sender: fromAcc,
//             recepient: forAcc,
//             message: message,
//           },
//           ...acc.movements,
//         ],
//         balance: acc.balance - amount,
//         debt: prev.currentAcc.debt.map((item, i) => {
//           if (item.to === forAcc) {
//             if (item.value - amount === 0) {
//               return prev.currentAcc.debt.splice(1, i);
//             } else {
//               return { value: item.value - amount, to: forAcc };
//             }
//           } else {
//             return item;
//           }
//         }),
//       };
//     }
//     if (acc.username === forAcc) {
//       return {
//         ...acc,
//         movements: [
//           {
//             amount: Number(amount),
//             date: date,
//             transactionTyp: "repayment",
//             sender: fromAcc,
//             recepient: forAcc,
//             message: message,
//           },
//           ...acc.movements,
//         ],
//         balance: acc.balance + Number(amount),
//         lended: acc.lended.map((item, i) => {
//           if (item.to === fromAcc) {
//             if (item.value - amount === 0) {
//               return acc.lended.splice(1, i);
//             } else {
//               return { value: item.value - amount, to: fromAcc };
//             }
//           } else {
//             return item;
//           }
//         }),
//       };
//     }
//     return acc;
//   })