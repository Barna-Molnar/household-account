import { date } from '../data';
import { updateAccsLend } from './updateAccsLend';
import { updateData } from './updateData';

jest.mock('./updateData', () => {
    return {
        __esModule: true,
        updateData: jest.fn(),
    }
})


/////////// Testing updateAccsLend()
describe("updateAccsLend()", () => {

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


    const accs = [acc1, acc2, acc3]
        // afterEach(() => { jest.clearAllMocks(); });
        // test(`update accs by lend when acc doesn't exist in lended array`, () => {
        //     const result = updateAccsLend(accs, "a3", "a2", 1000, 'nothing', date, false)


    //     //Assertion



    //     expect(result).toEqual([acc1, {
    //         owner: 'Acc2',
    //         username: "a2",
    //         balance: 3000,
    //         movements: [{
    //             amount: 1000,
    //             date: date,
    //             transactionTyp: "borrow",
    //             sender: 'a3',
    //             recepient: 'a2',
    //             message: `nothing`
    //         }, {
    //             amount: 2000,
    //             date: date,
    //             transactionTyp: "borrow",
    //             sender: 'a1',
    //             recepient: 'a2',
    //             message: `i don't know`
    //         }],
    //         debt: [{ to: "a3", value: 1000 }, { to: "a1", value: 2000 }],
    //         lended: [],
    //     }, {
    //         owner: 'Acc3',
    //         username: "a3",
    //         balance: 5000,
    //         movements: [{
    //             amount: -1000,
    //             date: date,
    //             transactionTyp: "lend",
    //             sender: 'a3',
    //             recepient: 'a2',
    //             message: `nothing`
    //         }, {
    //             amount: -1000,
    //             date: date,
    //             transactionTyp: "lend",
    //             sender: 'a3',
    //             recepient: 'a1',
    //             message: `i don't know`
    //         }],
    //         debt: [],
    //         lended: [{ to: "a2", value: 1000 }, { to: "a1", value: 1000 }],
    //     }]);
    // });
    afterEach(() => { jest.clearAllMocks(); });
    test(`update accs by lend when acc does exists in lended array`, () => {

        updateData.mockReturnValueOnce("debt return value")
        updateData.mockReturnValueOnce("lended return value")

        const result = updateAccsLend(accs, "a3", "a1", 1000, 'nothing', date, true);


        expect(updateData).toHaveBeenCalledTimes(2);
        expect(updateData).toHaveBeenCalledWith([{ to: "a3", value: 1000 }], "a3", 1000)
        expect(updateData).toHaveBeenCalledWith([{ to: "a1", value: 1000 }], "a1", 1000)




        expect(result).toEqual([{
                owner: 'Acc1',
                username: "a1",
                balance: 11000,
                movements: [{
                        amount: 1000,
                        date: date,
                        transactionTyp: "borrow",
                        sender: 'a3',
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
                debt: "debt return value",
                lended: [{ to: "a2", value: 2000 }],
            }, acc2,
            {
                owner: 'Acc3',
                username: "a3",
                balance: 5000,
                movements: [{
                    amount: -1000,
                    date: date,
                    transactionTyp: "lend",
                    sender: 'a3',
                    recepient: 'a1',
                    message: `nothing`
                }, {
                    amount: -1000,
                    date: date,
                    transactionTyp: "lend",
                    sender: 'a3',
                    recepient: 'a1',
                    message: `i don't know`
                }],
                debt: [],
                lended: "lended return value",
            }
        ])
    })
});