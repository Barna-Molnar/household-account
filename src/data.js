import { compareAsc, format } from "date-fns";

/// implement actuel Date
// Date formatting with date-fns
export let date = format(new Date(), "dd/MM/yy");
// const today = new Date();
// export let date = today.getMonth() + 1 + "-" + today.getDate();
//////////////////
// Data
export const account1 = {
    owner: 'John Miller',
    balance: 10000,
    accNum: 'DE **** **** **** **** 1234',
    movements: [{
        amount: -200,
        date: date,
        transactionTyp: "casual",
        sender: 'jm',
        recepient: 'km',
        message: `i don't know`
    }],
    debt: [],
    lended: [],


};

export const account2 = {
    owner: 'Teresa Miller',
    accNum: 'DE **** **** **** **** 4444',
    balance: 7000,
    movements: [],
    debt: [],
    lended: [],
};

export const account3 = {
    owner: 'Steven Miller',
    accNum: 'DE **** **** **** **** 5678',
    balance: 0,
    movements: [],
    isBlocked: false,
    debt: [],
    lended: [],
};

export const account4 = {
    owner: 'Katie Miller',
    balance: 0,
    accNum: 'DE **** **** **** **** 9999',
    movements: [{
        amount: 200,
        date: date,
        transactionTyp: "casual",
        sender: 'jm',
        recepient: 'km',
        message: `i don't know`
    }],
    isBlocked: false,
    debt: [],
    lended: [],

};
export const testAcc = {
    owner: 'Test Person',
    username: "tp",
    balance: 5000,
    movements: [{
        amount: -200,
        time: "date",
        transactionTyp: "lend",
        sender: 'jm',
        recepient: 'km',
        message: `i don't know`
    }, {
        amount: 400,
        time: "12-12",
        transactionTyp: "borrow",
        sender: 'tm',
        recepient: 'sm',
        message: `football`
    }],
}



export const accounts = [account1, account2, account3, account4];
// Create username

const createUsername = function(accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase().split(' ').map(item => item[0]).join('')
    });
}
createUsername(accounts);