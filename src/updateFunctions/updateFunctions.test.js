import { addMovement } from "./addMovement";
import { findDeleteOrDecrease } from "./findDeleteOrDecrease";
import { updateData } from "./updateData";
import { updateCurrAcc } from "./updateCurrAcc";
import { accounts, date } from '../data';


/// 24.02.2021 Working on tests




/// Testing findDeleteOrDecrease()
describe("findDeleteOrDecrease()", () => {
    const testDebtArr = {
        debt: [{ to: "jm", value: 2000 }, { to: "km", value: 1000 }],

    };

    test(`repayment with the half of the value of the first debt("jm")`, () => {
        const result = findDeleteOrDecrease(testDebtArr.debt, "jm", 1000)

        // Assertion 

        expect(result).toEqual([{ to: "jm", value: 1000 }, { to: "km", value: 1000 }])
    });
    test(`repayment with the whole value of the first debt`, () => {
        const result = findDeleteOrDecrease(testDebtArr.debt, "jm", 2000)

        // Assertion 

        expect(result).toEqual([{ to: "km", value: 1000 }])
    });
});

/// Testing addMovement()
describe('addMovement()', () => {
    const accWithEmptyMov = { movements: [] }
    const accWithMov = {
        movements: [{
            amount: -200,
            date: date,
            transactionTyp: "casual",
            sender: 'jm',
            recepient: 'km',
            message: `i don't know`
        }]
    }


    test(`add movement with positive amount when acc movements array is empty`, () => {
        const result = addMovement("jm", "km", 100, "lend", "nothing", date, accWithEmptyMov);

        //Assertion 
        expect(result).toEqual([{
                amount: 100,
                date: date,
                transactionTyp: "lend",
                sender: "jm",
                recepient: "km",
                message: "nothing",
            },

        ])
    });

    test(`add movement with negative amount when acc movements  array is empty`, () => {
        const result = addMovement("jm", "km", -100, "lend", "nothing", date, accWithEmptyMov);

        // Assertion 
        expect(result).toEqual([{
                amount: -100,
                date: date,
                transactionTyp: "lend",
                sender: "jm",
                recepient: "km",
                message: "nothing",
            },

        ])
    });
    test(`add movement with string(but numbers) when acc movements array is empty`, () => {
        const result = addMovement("jm", "km", "100", "lend", "nothing", date, accWithEmptyMov);

        //Assertion 
        expect(result).toEqual([{
                amount: 100,
                date: date,
                transactionTyp: "lend",
                sender: "jm",
                recepient: "km",
                message: "nothing",
            },

        ])
    });
    test(`add movement with invalid amount(string und letters) when  acc movements array is empty`, () => {
        const result = addMovement("jm", "km", "hundert", "lend", "nothing", date, accWithEmptyMov);

        //Assertion 
        expect(result).toEqual([{
                amount: NaN,
                date: date,
                transactionTyp: "lend",
                sender: "jm",
                recepient: "km",
                message: "nothing",
            },

        ])
    });

    test(`add movement with positive when acc movements array is not empty`, () => {
        const result = addMovement("jm", "km", 100, "lend", "nothing", date, accWithMov);
        // Assertion
        expect(result).toEqual([{
                amount: 100,
                date: date,
                transactionTyp: "lend",
                sender: "jm",
                recepient: "km",
                message: "nothing",
            }, {
                amount: -200,
                date: date,
                transactionTyp: "casual",
                sender: 'jm',
                recepient: 'km',
                message: `i don't know`
            }

        ])
    })
});
////////////////////////////
// Testing updateData()
describe('updateData()', () => {
    const testUser = {
        ...accounts[0],
        lended: [{
            value: 200,
            to: 'km'
        }, {
            value: 200,
            to: 'tm'
        }]
    };
    test('updateData adds amount to otherAccount\'s lended / debt object', () => {
        const results = updateData(testUser.lended, 'km', 1000);

        // Assertion
        expect(results).toEqual([{
            value: 1200,
            to: 'km'
        }, {
            value: 200,
            to: 'tm'
        }]);
    });
    test('updateData adds negative amount to otherAccount\'s lended / debt object', () => {
        const results = updateData(testUser.lended, 'km', -100);

        // Assertion
        expect(results).toEqual([{
            value: 100,
            to: 'km'
        }, {
            value: 200,
            to: 'tm'
        }]);
    });
    test('updateData returns original array if lended object doesn\'nt exist for user', () => {
        const results = updateData(testUser.lended, 'sm', 1000);

        // Assertion
        expect(results).toEqual(testUser.lended);
    });
});