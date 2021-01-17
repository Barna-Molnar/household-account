// Data
export const account1 = {
    owner: 'John Miller',
    balance: 10000,
    movements: [{
        amount: -200,
        date: "11-11",
        transactionTyp: "casual",
        sender: 'jm',
        recepient: 'km',
        message: `i don't know`
    }],
    debt: [],
    owed: [],


};

export const account2 = {
    owner: 'Teresa Miller',
    balance: 7000,
    movements: [],
    debt: [],
    owed: [],
};

export const account3 = {
    owner: 'Steven Miller',
    balance: 0,
    movements: [],
    isBlocked: false,
    debt: [],
    owed: [],
};

export const account4 = {
    owner: 'Katie Miller',
    balance: 0,
    movements: [{
        amount: 200,
        date: "11-11",
        transactionTyp: "casual",
        sender: 'jm',
        recepient: 'km',
        message: `i don't know`
    }],
    isBlocked: false,
    debt: [],
    owed: [],

};
export const testAcc = {
    owner: 'Test Person',
    username: "tp",
    balance: [5000],
    movements: [{
        amount: -200,
        time: "11-11",
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

/// implement actuel Date
const today = new Date();
export let date = today.getMonth() + 1 + "-" + today.getDate();


// Create username

const createUsername = function(accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase().split(' ').map(item => item[0]).join('')
    });
}
createUsername(accounts);
console.log(accounts)