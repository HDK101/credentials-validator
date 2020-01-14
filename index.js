const validator = require("./src/validator");

user = {
  name: "AnnieCarr1010",
  email: "annie@email.com",
  password: "Password10"
};

settings = {
  passwordMustContainUpper: true,
  passwordMustContainNumber: true
};

validator.setSettings(settings);

validator.validate(user, function(errors) {
  console.table(errors);
});
