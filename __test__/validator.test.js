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
  };
  test("returns no errors for a valid user", () => {
    validator.validate(user, function(errs) {
      errors = errs;
    });

    expect(errors.length).toBe(0);
  });
});
describe("checkName, checkEmail and checkPassword functions, different settings, different users", () => {
  const user = {
    name: "JohnC",
    email: "johncare@gmail.com",
    password: "Passwo"
  };
  test("nameMin: 10, should return an error", () => {
    validator.setSettings({
      nameMin: 10
    });
    validator.checkName(user.name, function(errs) {
      errors.push(errs);
    });

    expect(errors[0]).not.toBeFalsy();
  });
  test("nameMax: 3, should return an error", () => {
    validator.setSettings({
      nameMax: 3,
      nameMin: 1
    });
    validator.checkName(user.name, function(errs) {
      errors.push(errs);
    });

    expect(errors[0]).not.toBeFalsy();
  });
  test("passwordMin: 10, should return an error", () => {
    validator.setSettings({
      passwordMin: 10
    });
    validator.checkPassword(user.password, function(errs) {
      errors.push(errs);
    });

    expect(errors[0]).not.toBeFalsy();
  });
  test("passwordMax: 3, should return an error", () => {
    validator.setSettings({
      passwordMin: 1,
      passwordMax: 3
    });
    validator.checkPassword(user.password, function(errs) {
      errors.push(errs);
    });

    expect(errors[0]).not.toBeFalsy();
  });
  const anotherUser = {
    name: "JohnC",
    email: "johncare@gmail.com",
    password: "Password0"
  };
  test("passwordMustContainUpper, should not return an error", () => {
    validator.setSettings({
      passwordMustContainUpper: true
    });
    validator.checkPassword(anotherUser.password, function(errs) {
      errors.push(errs);
    });

    expect(errors.length).toBe(0);
  });
  test("passwordMustContainNumber, should not return an error", () => {
    validator.setSettings({
      passwordMustContainNumber: true
    });
    validator.checkPassword(anotherUser.password, function(errs) {
      errors.push(errs);
    });

    expect(errors.length).toBe(0);
  });
  const specialCharUser = {
    name: "JohnC",
    email: "johncare@gmail.com",
    password: "Password!0"
  };
  test("passwordSpecialCharacters: false, should return an error", () => {
    validator.setSettings({
      passwordSpecialCharactersPermit: false
    });
    validator.checkPassword(specialCharUser.password, function(errs) {
      errors.push(errs);
    });

    expect(errors[0]).not.toBeFalsy();
  });
  test("passwordSpecialCharacters: true, should not return an error", () => {
    validator.setSettings({
      passwordSpecialCharactersPermit: true
    });
    validator.checkPassword(specialCharUser.password, function(errs) {
      errors.push(errs);
    });

    expect(errors.length).toBe(0);
  });
  test("checkEmail, should not return an error", () => {
    validator.checkEmail(specialCharUser.email, function(errs) {
      errors.push(errs);
    });

    expect(errors.length).toBe(0);
  });
});

describe("empty name, email and password", () => {
  const emptyUser = {
    name: "",
    email: "",
    password: ""
  };
  test("name", () => {
    validator.checkName(emptyUser.name, function(errs) {
      errors.push(errs);
    });
    expect(errors[0]).not.toBeFalsy();
  });
  test("email", () => {
    validator.checkEmail(emptyUser.email, function(errs) {
      errors.push(errs);
    });
    expect(errors[0]).not.toBeFalsy();
  });
  test("password", () => {
    validator.checkPassword(emptyUser.password, function(errs) {
      errors.push(errs);
    });
    expect(errors[0]).not.toBeFalsy();
  });
  describe("custom credentials", () => {
    const customCredential = "TestForCredential";
    test("default settings, should return no error", () => {
      validator.checkCustom(customCredential, "Custom credential", function(
        errs
      ) {
        errors.push(errs);
      });
      expect(errors.length).toBe(0);
    });
    test("different settings, should return an error", () => {
      settings = {
        min: 45,
        max: 60
      };
      errorMessages = {
        errorMin: "__NAME__ is low! Min length: __VALUE__"
      };
      validator.checkCustom(
        customCredential,
        "Custom credential",
        function(errs) {
          errors.push(errs);
        },
        settings,
        errorMessages
      );
      expect(errors[0]).not.toBeFalsy();
    });
  });
});
