var settings = {
  nameMin: 5,
  nameMax: 15,
  passwordMin: 8,
  passwordMax: 20,
  passwordMustContainUpper: false,
  passwordMustContainNumber: false,
  passwordSpecialCharactersPermit: false
};

var errorMessages = {
  errorNameEmpty: "Empty name!",
  errorNameMin: "Name too short, min length: __VALUE__",
  errorNameMax: "Name too long, max length: __VALUE__",
  errorEmailEmpty: "Empty email!",
  errorEmailInvalid: "Invalid email adress!",
  errorPasswordEmpty: "Empty password!",
  errorPasswordMin: "Password too short, min length: __VALUE__",
  errorPasswordMax: "Password too long, max length: __VALUE__",
  errorPasswordUpper: "Password should contain at last 1 uppercase!",
  errorPasswordNumber: "Password should contain at last 1 number!",
  errorPasswordSpecialFalse: "Forbidden characters in password"
};

function setErrorMessages(messages) {
  errorMessages = Object.assign(errorMessages, messages);
}

function getErrorMessage(errorName, value) {
  let message = errorMessages[`${errorName}`];
  if (message != undefined)
    return value ? message.replace("__VALUE__", value) : message;
}

function useDefaultSettings() {
  settings = {
    nameMin: 5,
    nameMax: 15,
    passwordMin: 8,
    passwordMax: 20,
    passwordMustContainUpper: false,
    passwordMustContainNumber: false,
    passwordSpecialCharactersPermit: false
  };
}

function setSettings(set) {
  settings = Object.assign(settings, set);
}

/*
Default validate
*/

function validate(user, callback) {
  const { name, email, password } = user;

  var errors = [];
  checkName(name, function(error) {
    errors.push(error);
  });

  checkEmail(email, function(error) {
    errors.push(error);
  });

  checkPassword(password, function(error) {
    errors.push(error);
  });
  if (errors) callback(errors);
}

function checkName(name, callback) {
  const { nameMin, nameMax } = settings;
  if (name !== undefined) {
    /*Verifying name length*/
    if (name !== "") {
      name.length < nameMin &&
        callback(getErrorMessage("errorNameMin", nameMin));
      name.length > nameMax &&
        callback(getErrorMessage("errorNameMax", nameMax));
    }
    if (name === "") {
      return callback(getErrorMessage("errorNameEmpty"));
    }
  }
}

function checkEmail(email, callback) {
  if (email !== undefined) {
    if (email !== "") {
      const emailParts = email.split("@");
      const emailProvider =
        emailParts.length > 1 ? emailParts[1].split(".") : [];

      /*Verify if exists a value before @*/
      if (!emailParts[0]) return callback(getErrorMessage("errorEmailInvalid"));

      /*Verify if is an valid email provider*/
      if (!emailProvider[0])
        return callback(getErrorMessage("errorEmailInvalid"));
    } else if (email === "") {
      return callback(getErrorMessage("errorEmailEmpty"));
    }
  }
}

function checkPassword(password, callback) {
  const {
    passwordMin,
    passwordMax,
    passwordMustContainUpper,
    passwordMustContainNumber,
    passwordSpecialCharactersPermit
  } = settings;
  if (password !== undefined) {
    if (password !== "") {
      /*Verifying password length*/
      password.length < passwordMin &&
        callback(getErrorMessage("errorPasswordMin", passwordMin));
      password.length > passwordMax &&
        callback(getErrorMessage("errorPasswordMin", passwordMax));

      /*Verify if password contains uppercase*/
      regexUpper = /[A-Z]/;
      if (passwordMustContainUpper) {
        !regexUpper.test(password) &&
          callback(getErrorMessage("errorPasswordUpper"));
      }

      /*Verify if password contains number*/
      regexNumber = /[0-9]/;
      if (passwordMustContainNumber) {
        !regexNumber.test(password) &&
          callback(getErrorMessage("errorPasswordNumber"));
      }

      /*Verify if password has special characters*/
      regexSpecial = /^[A-Za-z0-9 ]+$/;
      if (!passwordSpecialCharactersPermit) {
        !regexSpecial.test(password) &&
          callback(getErrorMessage("errorPasswordSpecialFalse"));
      }
    } else if (password === "") {
      return callback(getErrorMessage("errorPasswordEmpty"));
    }
  }
}

function checkCustom(
  credential,
  name,
  callback,
  customSettings,
  customErrorMessages
) {
  let cSettings = {
    min: 0,
    max: 0,
    mustContainWord: [],
    mustContainUpper: false,
    mustContainNumber: false,
    specialCharactersPermit: true
  };
  cSettings = Object.assign(cSettings, customSettings);
  const {
    min,
    max,
    mustContainWord,
    mustContainUpper,
    mustContainNumber,
    specialCharactersPermit
  } = cSettings;

  function getCustomErrorMessage(errorName, cName, value) {
    let message = cErrorMessages[`${errorName}`];
    if (message != undefined) {
      replacedValueMessage = value
        ? message.replace("__VALUE__", value)
        : message;
      return replacedValueMessage.replace("__NAME__", cName);
    }
    return message;
  }

  if (!name) return console.log("Crendetial name required!");
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
  cErrorMessages = Object.assign(cErrorMessages, customErrorMessages);

  if (credential !== undefined) {
    if (credential !== "") {
      /*Min/max length verification*/

      (min > 0) & (credential.length < min) &&
        callback(getCustomErrorMessage("errorMin", name, min));
      (max > 0) & (credential.length > max) &&
        callback(getCustomErrorMessage("errorMax", name, max));

      /*Check if credentials has required words*/
      if (mustContainWord) {
        mustContainWord.forEach(element => {
          !credential.includes(element) &&
            callback(getCustomErrorMessage("errorWord", name, element));
        });
      }
      /*Check if credential has at last 1 uppercase*/
      if (mustContainUpper) {
        regexUpper = /[A-Z]/;
        !regexUpper.test(credential) &&
          callback(getCustomErrorMessage("errorUpper", name));
      }
      /*Check if credential has at last 1 number*/
      if (mustContainNumber) {
        regexNumber = /[0-9]/;
        !regexNumber.test(credential) &&
          callback(getCustomErrorMessage("errorNumber", name));
      }
      /*Check if credentials has special characters*/
      if (!specialCharactersPermit) {
        regexSpecial = /^[A-Za-z0-9 ]+$/;
        !regexSpecial.test(credential) &&
          callback(getCustomErrorMessage("errorSpecialFalse", name));
      }
    } else {
      return callback(getCustomErrorMessage("errorEmpty", cName));
    }
  }
}

module.exports = {
  useDefaultSettings,
  setSettings,
  setErrorMessages,
  validate,
  checkName,
  checkEmail,
  checkPassword,
  checkCustom
};
