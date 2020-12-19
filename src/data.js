// Data
export const account1 = {
    owner: 'John Miller',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

export const account2 = {
    owner: 'Teresa Miller',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
};

export const account3 = {
    owner: 'Steven Miller',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
};

export const account4 = {
    owner: 'Katie Miller',
    movements: [430, 1000, 700, 50, 90],
};

export const accounts = [account1, account2, account3, account4];


// Create username

const createUsername = function(accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase().split(' ').map(item => item[0]).join('')
    });
    console.log(accounts);
}
createUsername(accounts)

// calc value
const calcValue = (acc) => {
    acc.value = acc.movements.reduce((acc, currVal) => acc + currVal, 0)
    console.log(acc.value);
}

calcValue(account1)