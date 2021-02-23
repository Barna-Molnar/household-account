export const updateCurrAcc = (otherAcc, transactionTyp, amount, message, prev, date, isAccExistsInLended) => {
    let debt, lend

    if (transactionTyp === "repayment") {
        debt = findDeleteOrDecrease(prev.currentAcc.debt, otherAcc, amount)
        lend = prev.currentAcc.lended
        amount = -amount
    } else if (transactionTyp === "lend" && isAccExistsInLended) {
        debt = prev.currentAcc.debt
        lend = updateData(prev.currentAcc.lended, otherAcc, -amount)
    } else if (transactionTyp === "lend" && !isAccExistsInLended) {
        debt = prev.currentAcc.debt
        lend = [{ value: -amount, to: otherAcc }, ...prev.currentAcc.lended]
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
}

export const updateData = (where, otherAcc, amount) => {
    return where.map((item) => {
        if (item.to === otherAcc) {
            return { value: item.value + amount, to: otherAcc }
        } else {
            return item;
        }
    })
}

export const findDeleteOrDecrease = (where, otherAcc, amount) => {
    const result = where.find((item) => item.to === otherAcc && item.value - amount !== 0)
    if (!result) {
        return where.filter(item => item.to !== otherAcc)
    } else {
        return where.map((item, i) => {
            if (item.to === otherAcc) {
                return { value: item.value - amount, to: otherAcc }
            } else {
                return item
            }
        })
    }
}

export const addMovement = (fromAcc, forAcc, amount, transactionTyp, message, date, acc) => {
    return [{
        amount: Number(amount),
        date: date,
        transactionTyp: transactionTyp,
        sender: fromAcc,
        recepient: forAcc,
        message: message,
    }, ...acc.movements]
}

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