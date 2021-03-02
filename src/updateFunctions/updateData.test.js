import { updateData } from "./updateData";
import { accounts } from '../data';


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