import { date } from '../data';
import { updateAccsRepay } from './updateAccsRepay';
import { findDeleteOrDecrease } from "./findDeleteOrDecrease";
jest.mock("./findDeleteOrDecrease", () => {
    return {
        __esModule: true,
        findDeleteOrDecrease: jest.fn()
    }
});

////////// Testing updateAccsRepay()

describe("updateAccsRepay()", () => {
    const acc1 = {
        owner: 'Acc1',
        username: "a1",
        balance: 10000,
        movements: [{
                amount: -2000,
                date: date,
                transactionTyp: "lend",
                sender: 'a1',
                recepient: 'a2',
                message: `i don't know`
            },
            {
                amount: 1000,
                date: date,
                transactionTyp: "borrow",
                sender: 'a3',
                recepient: 'a1',
                message: `i don't know`
            }
        ],
        debt: [{ to: "a3", value: 1000 }],
        lended: [{ to: "a2", value: 2000 }],
    };
    const acc2 = {
        owner: 'Acc2',
        username: "a2",
        balance: 2000,
        movements: [{
            amount: 2000,
            date: date,
            transactionTyp: "borrow",
            sender: 'a1',
            recepient: 'a2',
            message: `i don't know`
        }],
        debt: [{ to: "a1", value: 2000 }],
        lended: [],
    };
    const acc3 = {
        owner: 'Acc3',
        username: "a3",
        balance: 6000,
        movements: [{
            amount: -1000,
            date: date,
            transactionTyp: "lend",
            sender: 'a3',
            recepient: 'a1',
            message: `i don't know`
        }],
        debt: [],
        lended: [{ to: "a1", value: 1000 }],
    };

    const accounts = [acc1, acc2, acc3];
    let currentAcc
    currentAcc = acc2
    const prev = { currentAcc }
    let state = { accounts }


    test(`update Accounts by repayment`, () => {
        findDeleteOrDecrease.mockReturnValueOnce("lended return value")
        findDeleteOrDecrease.mockReturnValueOnce("debt return value")
        const result = updateAccsRepay("a2", "a1", "repayment", 2000, "nothing", state, prev, date)

        //Assertion
        expect(findDeleteOrDecrease).toHaveBeenCalledTimes(2);
        expect(findDeleteOrDecrease).toHaveBeenCalledWith([{ to: "a2", value: 2000 }], "a2", 2000);
        expect(findDeleteOrDecrease).toHaveBeenCalledWith([{ to: "a1", value: 2000 }], "a1", 2000);


        expect(result).toEqual([{
            owner: 'Acc1',
            username: "a1",
            balance: 12000,
            movements: [{
                    amount: 2000,
                    date: date,
                    transactionTyp: "repayment",
                    sender: 'a2',
                    recepient: 'a1',
                    message: `nothing`
                }, {
                    amount: -2000,
                    date: date,
                    transactionTyp: "lend",
                    sender: 'a1',
                    recepient: 'a2',
                    message: `i don't know`
                },
                {
                    amount: 1000,
                    date: date,
                    transactionTyp: "borrow",
                    sender: 'a3',
                    recepient: 'a1',
                    message: `i don't know`
                }
            ],
            debt: [{ to: "a3", value: 1000 }],
            lended: "lended return value",
        }, {
            owner: 'Acc2',
            username: "a2",
            balance: 0,
            movements: [{
                amount: -2000,
                date: date,
                transactionTyp: "repayment",
                sender: 'a2',
                recepient: 'a1',
                message: `nothing`
            }, {
                amount: 2000,
                date: date,
                transactionTyp: "borrow",
                sender: 'a1',
                recepient: 'a2',
                message: `i don't know`
            }],
            debt: 'debt return value',
            lended: [],
        }, acc3])

    });

})