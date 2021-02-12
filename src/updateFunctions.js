export const updateCurrAcc = (otherAcc, transactionTyp, amount, message, prev, date) => {

    return {
        ...prev.currentAcc,
        movements: returnMovOut(
            prev.currentAcc.username,
            otherAcc,
            amount,
            transactionTyp,
            message,
            date,
            prev.currentAcc
        ),
        balance: prev.currentAcc.balance - amount,

        debt: transactionTyp === "repayment" ?
            deleteOrSubtractData(prev.currentAcc.debt, otherAcc, amount) : prev.currentAcc.debt,
        lended: transactionTyp === "repayment" ?
            prev.currentAcc.lended : addToData(prev.currentAcc.lended, otherAcc, amount)

    };
}

export const addToData = (where, otherAcc, amount) => {
    return where.map((item) => {
        if (item.to === otherAcc) {
            return { value: item.value + amount, to: otherAcc }
        } else {
            return item;
        }
    })
}

export const subtractFromData = (where, otherAcc, amount) => {
    return where.map((item) => {
        if (item.to === otherAcc) {
            return { value: item.value - amount, to: otherAcc }
        } else {
            return item;
        }
    })
}

export const deleteOrSubtractData = (where, otherAcc, amount) => {
    return where.map((item, i) => {
        if (item.to === otherAcc) {
            if (item.value - amount === 0) {
                return where.splice(1, i)
            } else {
                return { value: item.value - amount, to: otherAcc }
            }
        } else {
            return item
        }
    })
}


export const returnMovOut = (fromAcc, forAcc, amount, transactionTyp, message, date, acc) => {
    return [{
        amount: -Number(amount),
        date: date,
        transactionTyp: transactionTyp,
        sender: fromAcc,
        recepient: forAcc,
        message: message,
    }, ...acc.movements]
}

export const returnMovIn = (fromAcc, forAcc, amount, transactionTyp, message, date, acc) => {
    return [{
        amount: Number(amount),
        date: date,
        transactionTyp: transactionTyp,
        sender: fromAcc,
        recepient: forAcc,
        message: message,
    }, ...acc.movements]
}

export const updateFromAccLend = (acc, fromAcc, forAcc, amount, message, date, ) => {
    return {
        ...acc,
        movements: returnMovOut(
            fromAcc,
            forAcc,
            amount,
            "lend",
            message,
            date,
            acc
        ),

        balance: acc.balance - Number(amount),
        // lended is an array of lended money
        lended: addToData(acc.lended, forAcc, amount),

    }
}


export const updateForAccLend = (acc, fromAcc, forAcc, amount, message, date, ) => {
    return {
        ...acc,
        movements: returnMovIn(
            fromAcc,
            forAcc,
            amount,
            "lend",
            message,
            date,
            acc
        ),

        balance: acc.balance + Number(amount),
        // lended is an array of lended money
        debt: addToData(acc.debt, fromAcc, amount),

    }
}