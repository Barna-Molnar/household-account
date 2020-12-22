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
}
createUsername(accounts)

// calc value
export const calcValue = (accs) => {
    accs.forEach(acc => {
        acc.value = acc.movements.reduce((acc, currVal) => acc + currVal, 0)
    })
}

calcValue(accounts)

const arr = accounts.find(acc => acc.username === "jm")
arr.movements.push(-100)
calcValue(accounts)
console.log(arr);

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