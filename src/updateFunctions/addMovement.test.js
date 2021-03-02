import { addMovement } from './addMovement'
import { date } from '../data'

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