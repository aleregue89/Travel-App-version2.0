import { checkForName } from '../client/js/nameValidation';

// creating a Jest test - function must exist in my app.js
describe('function checkForName', () => {
    test("function must exist", () => {
        expect(checkForName).toBeDefined();
    });
});

// second jest test - function must return typeOf = function
describe('function checkForName', () => {
    test("function must return a typeOf = function", () => {
        expect(typeof checkForName).toBe("function");
    });
});