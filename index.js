const validator = require("./src/validator");

user = {
  name: "AnnieCarr1010",
  email: "annie@email.com",
  password: "Pass"
};

validator.validate(user, function(errors) {
  console.table(errors);
});
