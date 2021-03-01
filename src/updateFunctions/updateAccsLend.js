import { addMovement } from "./addMovement";
import { updateData } from "./updateData";

export const updateAccsLend = (accs, fromAcc, forAcc, amount, message, date, isAccExistsInLended) => {
    let lend, debt

    return accs.map(acc => {
        // decision how to update lend and debt 
        if (isAccExistsInLended) {
            lend = updateData(acc.lended, forAcc, amount);
            debt = updateData(acc.debt, fromAcc, amount);
        } else {
            lend = [{ value: amount, to: forAcc }, ...acc.lended]
            debt = [{ value: amount, to: fromAcc }, ...acc.debt]
        }
        if (acc.username === fromAcc) {
            return {
                ...acc,
                movements: addMovement(
                    fromAcc,
                    forAcc, -amount,
                    "lend",
                    message,
                    date,
                    acc
                ),
                balance: acc.balance - amount,
                lended: lend,
            };
        }
        if (acc.username === forAcc) {
            return {
                ...acc,
                movements: addMovement(
                    fromAcc,
                    forAcc,
                    amount,
                    "borrow",
                    message,
                    date,
                    acc
                ),
                balance: acc.balance + amount,
                debt: debt
            }
        }
        return acc
    })
}