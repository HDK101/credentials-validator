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
    console.table(errors);
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
    validator.checkName(user.name, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors[0]).not.toBeFalsy();
  });
  test("nameMax: 3, should return an error", () => {
    validator.setSettings({
      nameMax: 3,
      nameMin: 1
    });
    validator.checkName(user.name, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors[0]).not.toBeFalsy();
  });
  test("passwordMin: 10, should return an error", () => {
    validator.setSettings({
      passwordMin: 10
    });
    validator.checkPassword(user.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors[0]).not.toBeFalsy();
  });
  test("passwordMax: 3, should return an error", () => {
    validator.setSettings({
      passwordMin: 1,
      passwordMax: 3
    });
    validator.checkPassword(user.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors[0]).not.toBeFalsy();
  });
  const anotherUser = {
    name: "JohnC",
    email: "johncare@gmail.com",
    password: "Password0"
  };
  test("passwordCharMustContain: ['w','o'], should not return an error", () => {
    validator.setSettings({
      passwordCharMustContain: ["w", "o"]
    });
    validator.checkPassword(anotherUser.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors.length).toBe(0);
  });
  test("passwordMustContainUpper, should not return an error", () => {
    validator.setSettings({
      passwordMustContainUpper: true
    });
    validator.checkPassword(anotherUser.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors.length).toBe(0);
  });
  test("passwordMustContainNumber, should not return an error", () => {
    validator.setSettings({
      passwordMustContainNumber: true
    });
    validator.checkPassword(anotherUser.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors.length).toBe(0);
  });
  const specialCharUser = {
    name: "JohnC",
    email: "johncare@gmail.com",
    password: "Password!0"
  };
  test("passwordSpecialCharacters: 'forbidden', should return an error", () => {
    validator.setSettings({
        passwordSpecialCharacters: "forbidden"
    });
    validator.checkPassword(specialCharUser.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors[0]).not.toBeFalsy();
  });
  test("passwordSpecialCharacters: 'permitted', should not return an error", () => {
    validator.setSettings({
        passwordSpecialCharacters: "permitted"
    });
    validator.checkPassword(specialCharUser.password, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors.length).toBe(0);
  });
  test("checkEmail, should not return an error", () => {
    validator.checkEmail(specialCharUser.email, function(error) {
      errors.push(error);
    });
    console.table(errors);
    expect(errors.length).toBe(0);
  });
  
});
