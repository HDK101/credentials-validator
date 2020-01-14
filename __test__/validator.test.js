const validator = require("../src/validator");

describe("Validate function, default settings", () => {
    user = {
        name: "AnnieCare",
        email: "anniecare@gmail.com",
        password: "Password10"
    }
    test("returns no errors for a valid user", () => {
        let errors = [];
        validator.validate(user, function(errs) {
            errors = errs;
        });
        expect(errors.length).toBe(0);
    });
});