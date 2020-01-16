# Credentials Validator

![npm](https://img.shields.io/npm/v/credentials-validator)
[![Build Status](https://travis-ci.com/HDK101/credentials-validator.svg?branch=master)](https://travis-ci.com/HDK101/credentials-validator)

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

## Other things you must know

### Invidual check methods for name, email and password

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

### Check for custom credential

Example:
```
const customCredential = "AyeMate"

settings = {
  min: 10,
  max: 20
};
/*
Check out the full settings in next code sample
*/

errorMessages = {
  errorMin: "__NAME__ is low! Min length: __VALUE__"
};
/*
__NAME__ gets replaced by the credential name,
check out the full error message in the next code sample
*/

//checkCustom(credential, name, callback, customSettings, customErrorMessages);
validator.checkCustom(
  customCredential,
  "Custom credential",
  function(errs) {
    errors.push(errs);
  },
  settings,
  errorMessages
);

```

Full custom settings and error messages
```
let cSettings = {
    min: 0,
    max: 0,
    mustContainWord: [],
    mustContainUpper: false,
    mustContainNumber: false,
    specialCharactersPermit: true
};
let cErrorMessages = {
    errorEmpty: "Empty __NAME__!",
    errorMin: "__NAME__ too short, min length: __VALUE__",
    errorMax: "__NAME__ too long, max length: __VALUE__",
    errorWord: "__NAME__ should contain this word: __VALUE__",
    errorUpper: "__NAME__ should contain at last 1 uppercase!",
    errorNumber: "__NAME__ should contain at last 1 number!",
    errorSpecialFalse: "Forbidden characters in __NAME__",
    errorSpecialTrue: "__NAME__ should contain at last 1 special characters!"
};
```
