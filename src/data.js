// Data
const account1 = {
    owner: 'John Miller',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

const account2 = {
    owner: 'Joana Miller',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
};

const account3 = {
    owner: 'Steven Miller',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
};

const account4 = {
    owner: 'Katie Miller',
    movements: [430, 1000, 700, 50, 90],
};

const accounts = [account1, account2, account3, account4];

const createUsername = function(accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toUpperCase().split(' ').map(item => item[0]).join('')
    });
    console.log(accounts);
}
createUsername(accounts)