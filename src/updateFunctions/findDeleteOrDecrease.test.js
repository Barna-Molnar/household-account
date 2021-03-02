import { findDeleteOrDecrease } from "./findDeleteOrDecrease";

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