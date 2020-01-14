const validator = require("../src/validator");

var errors = [];

beforeEach(() => {
    validator.useDefaultSettings();
    errors = [];
});

describe("Validate function, default settings", () => {
    const user = {
        name: "AnnieCare1000",
        email: "anniecare@gmail.com",
        password: "Password1000"
    }
    test("returns no errors for a valid user", () => {
        validator.validate(user, function(errs) {
            errors = errs;
        });
        console.table(errors);
        expect(errors.length).toBe(0);
    });
});
describe("checkName, checkEmail and checkPassword functions, different settings", () => {
    const user = {
        name: "JohnC",
        email: "johncare@gmail.com",
        password: "Passwo"
    }
    test("nameMin: 10, should return an error", () => {
        validator.setSettings(
            {
                nameMin: 10
            }
        );
        validator.checkName(user.name, function(error) {
            errors.push(error);
        })
        console.table(errors);
        expect(errors[0]).not.toBeFalsy();
    });
    test("nameMax: 3, should return an error", () => {
        validator.setSettings(
            {
                nameMax: 3,
                nameMin: 1
            }
        );
        validator.checkName(user.name, function(error) {
            errors.push(error);
        })
        console.table(errors);
        expect(errors[0]).not.toBeFalsy();
    });
    test("passwordMin: 10, should return an error", () => {
        validator.setSettings(
            {
                passwordMin: 10
            }
        );
        validator.CheckPassword(user.password, function(error) {
            errors.push(error);
        })
        console.table(errors);
        expect(errors[0]).not.toBeFalsy();
    });
    test("passwordMax: 3, should return an error", () => {
        validator.setSettings(
            {
                passwordMin: 1,
                passwordMax: 3
            }
        );
        validator.CheckPassword(user.password, function(error) {
            errors.push(error);
        })
        console.table(errors);
        expect(errors[0]).not.toBeFalsy();
    });
});