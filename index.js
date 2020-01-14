const validator = require("./src/validator");

user = {
    name: "L",
    email: "lucashidekigmailcom",
    password: "Shamblerfaust"
};

validator.validate(user, function(errors) {
    console.table(errors);
})