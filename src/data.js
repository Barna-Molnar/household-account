// Data
export const account1 = {
    owner: 'John Miller',
    balance: [10000],
    movements: [-200, -200],
};

export const account2 = {
    owner: 'Teresa Miller',
    balance: [7000],
    movements: [],
};

export const account3 = {
    owner: 'Steven Miller',
    balance: [],
    movements: [200],
    isBlocked: false,
};

export const account4 = {
    owner: 'Katie Miller',
    balance: [],
    movements: [200],
    isBlocked: false,

};

export const accounts = [account1, account2, account3, account4];


// Create username

const createUsername = function(accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase().split(' ').map(item => item[0]).join('')
    });
}
createUsername(accounts)

// calc value
export const calcValue = (accs) => {
    accs.forEach(acc => {
        acc.balance = Number(acc.balance) + Number(acc.movements.reduce((acc, currVal) => acc + currVal, 0))
    })
}

calcValue(accounts)
console.log(accounts);

// const arr = accounts.find(acc => acc.username === "jm")
// arr.movements.push(-100)
// calcValue(accounts)
// console.log(arr);

// {this.props.currentAcc !== undefined
//     ? this.props.currentAcc.movements.map((mov, i) => {
//         const type = mov > 0 ? "dep" : "withD";
//         return `
//       <div className="mov__row">
//       <div className="mov__type mov__type--${type}">
//       ${i + 1} ${type}</div>
//       <div className="mov__date">2 days ago</div>
//       <div className="mov__message">For School</div>
//       <div className="mov__value">${mov}</div>
//     </div>

//       `;
//       })
//     : ""}