import { addMovement } from "./addMovement";
import { findDeleteOrDecrease } from "./findDeleteOrDecrease";
import { updateData } from "./updateData";

export const updateCurrAcc = (otherAcc, transactionTyp, amount, message, prev, date, isAccExistsInLended) => {
    let debt, lend;

    if (transactionTyp === "repayment") {
        debt = findDeleteOrDecrease(prev.currentAcc.debt, otherAcc, amount);
        lend = prev.currentAcc.lended;
        amount = -amount;
    } else if (transactionTyp === "lend" && isAccExistsInLended) {
        debt = prev.currentAcc.debt;
        lend = updateData(prev.currentAcc.lended, otherAcc, -amount);
    } else if (transactionTyp === "lend" && !isAccExistsInLended) {
        debt = prev.currentAcc.debt;
        lend = [{ value: -amount, to: otherAcc }, ...prev.currentAcc.lended];
    }

    return {
        ...prev.currentAcc,
        movements: addMovement(
            prev.currentAcc.username,
            otherAcc,
            amount,
            transactionTyp,
            message,
            date,
            prev.currentAcc
        ),
        balance: prev.currentAcc.balance + amount,
        debt: debt,
        lended: lend
    };
};