# Credentials Validator
![npm](https://img.shields.io/npm/v/credentials-validator)
### A quick way to validate credentials in server-side


#### How to install
1. Run npm install
```
npm install credentials-validator
```
2. Write the following code:
```
const validator = require("credentials-validator");

user = {
  name: "AnnieCare1010",
  email: "annie@email.com",
  password: "Password10"
};

validator.validate(user, function(errors) {
  console.table(errors);
});
```

You will notice that will produce no errors.
But what happens if we change the password to "Pass", which has only 4 characters?

```
  password: "Pass"
```
It will produce...
```
┌─────────┬────────────────────────────────────────────────────┐
│ (index) │                       Values                       │
├─────────┼────────────────────────────────────────────────────┤
│    0    │ 'Password too long, max length: 8'                 │
└─────────┴────────────────────────────────────────────────────┘
```
Voila! it produced an error.

### Settings
Here is the available settings:
```
var settings = {
  nameMin: 5,
  nameMax: 15,
  passwordMin: 8,
  passwordMax: 20,
  passwordMustContainUpper: false,
  passwordMustContainNumber: false,
  passwordSpecialCharactersPermit: false
};
```
And you can change the settings using the setSettings() method
```
const validator = require("credentials-validator");

const newSettings = {
  nameMin: 10,
  nameMax: 25,
  passwordMustContainUpper: false
};

validator.setSettings(newSettings);
```

### Custom error messages
You can set custom error messages.

```
user = {
  name: "AnnieCare1010",
  email: "annie@email.com",
  password: "Password10"
};

const errorMessages = {
  errorPasswordMin: "Senha curta, tamanho máximo: __VALUE__" 
  //__VALUE__ gets replaced by the current value, which is password min length in this case
};

validator.validate(user, function(errors) {
  console.table(errors);
});
validator.setErrorMessages(errorMessages);
```
It will print...

```
┌─────────┬──────────────────────────────────┐
│ (index) │              Values              │
├─────────┼──────────────────────────────────┤
│    0    │ 'Senha curta, tamanho máximo: 8' │
└─────────┴──────────────────────────────────┘
```

### Other things you must know
```

//A method that individually checks a name
validator.checkName("JohnDoe" ,function(errs) {
  console.log(errs);
});
//A method that individually checks an email
validator.checkEmail("john@gmail.com",function(errs) {
  console.log(errs);
});
//A method that individually checks an email
validator.checkEmail("Password10",function(errs) {
  console.log(errs);
});

```




