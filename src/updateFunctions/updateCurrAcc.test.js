import { updateCurrAcc } from "./updateCurrAcc";
import { date } from '../data';
import { addMovement } from './addMovement'

jest.mock('./addMovement', () => {
    return {
        __esModule: true,
        addMovement: jest.fn()
    }
})

////////// Testing updateCurrentAcc()
// I'm using here the addMovement() as a subfunction , I'd already tested it...(see below)
describe("updateCurrAcc()", () => {
    const currentAcc = {
        owner: 'Test Acc',
        balance: 10000,
        movements: [{
            amount: -200,
            date: date,
            transactionTyp: "casual",
            sender: 'ta',
            recepient: 'km',
            message: `i don't know`
        }],
        debt: [{ to: "km", value: 1000 }],
        lended: [],
    };
    const accs = { currentAcc }
    afterEach(() => { jest.clearAllMocks(); });
    test(`update CurrentAcc by repayment`, () => {

        addMovement.mockReturnValueOnce("addMovement return value first call (Repayment)")

        const result = updateCurrAcc("km", "repayment", 1000, "nothing", accs, date, false)
            // Assertion 
        expect(addMovement).toHaveBeenCalledTimes(1);
        expect(addMovement).toHaveBeenCalledWith(accs.currentAcc.username, "km", -1000, "repayment", "nothing", date, accs.currentAcc)

        expect(result).toEqual({
            owner: 'Test Acc',
            balance: 9000,
            movements: "addMovement return value first call (Repayment)",
            debt: [],
            lended: [],

        })

    });

    test(`update CurrentAcc by lend when acc exists in lended array`, () => {
        addMovement.mockReturnValueOnce("addMovement return value first call (lend + acc exists)")
        const currentAcc = {
            owner: 'Test Acc',
            balance: 9000,
            movements: [{
                amount: -200,
                date: date,
                transactionTyp: "casual",
                sender: 'ta',
                recepient: 'km',
                message: `i don't know`
            }],
            debt: [],
            lended: [{ to: "km", value: 1000 }],
        };
        const accs = { currentAcc }

        const result = updateCurrAcc("km", "lend", -1000, "nothing", accs, date, true)

        // Assertion 
        expect(addMovement).toHaveBeenCalledTimes(1);
        expect(addMovement).toHaveBeenCalledWith(accs.currentAcc.username, "km", -1000, "lend", "nothing", date, accs.currentAcc);

        expect(result).toEqual({
            owner: 'Test Acc',
            balance: 8000,
            movements: "addMovement return value first call (lend + acc exists)",
            debt: [],
            lended: [{ to: "km", value: 2000 }],

        })

    });

    test(`update CurrentAcc by lend when acc doesn't exist in lended array`, () => {
        addMovement.mockReturnValueOnce("addMovement return value first call (lend + acc does NOT exists)")
        const currentAcc = {
            owner: 'Test Acc',
            balance: 9000,
            movements: [{
                amount: -200,
                date: date,
                transactionTyp: "casual",
                sender: 'ta',
                recepient: 'km',
                message: `i don't know`
            }],
            debt: [],
            lended: [],
        };
        const accs = { currentAcc }
        const result = updateCurrAcc("km", "lend", -1000, "nothing", accs, date, false)
            // Assertion 

        expect(addMovement).toHaveBeenCalledTimes(1);
        expect(addMovement).toHaveBeenLastCalledWith(accs.currentAcc.username, "km", -1000, "lend", "nothing", date, accs.currentAcc)
        expect(result).toEqual({
            owner: 'Test Acc',
            balance: 8000,
            movements: "addMovement return value first call (lend + acc does NOT exists)",
            debt: [],
            lended: [{ to: "km", value: 1000 }],

        })
    })
});