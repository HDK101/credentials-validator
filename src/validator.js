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
  errorPasswordSpecialFalse: "Forbidden characters in password",
  errorPasswordSpecialTrue:
    "Password should contain at last 1 special characters!"
};

function setErrorMessages(messages) {
  errorMessages = Object.assign(errorMessages, messages);
}

function getErrorMessage(messageName, value) {
  let message = errorMessages[`${messageName}`];
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
    name.length < nameMin && callback(getErrorMessage("errorNameMin", nameMin));
    name.length > nameMax && callback(getErrorMessage("errorNameMax", nameMax));
  } else if ((name !== undefined) & (name == "")) {
    return callback(getErrorMessage("errorNameEmpty"));
  }
}

function checkEmail(email, callback) {
  if (email !== undefined) {
    const emailParts = email.split("@");
    const emailProvider = emailParts.length > 1 ? emailParts[1].split(".") : [];

    /*Verify if exists a value before @*/
    if (!emailParts[0]) return callback(getErrorMessage("errorEmailInvalid"));

    /*Verify if is an valid email provider*/
    if (!emailProvider[0])
      return callback(getErrorMessage("errorEmailInvalid"));
  } else if ((email !== undefined) & (email == "")) {
    return callback(getErrorMessage("errorEmailEmpty"));
  }
}

function checkPassword(password, callback) {
  const {
    passwordMin,
    passwordMax,
    passwordMustContainUpper,
    passwordMustContainNumber,
    passwordSpecialCharactersPermit,
  } = settings;
  if (password !== undefined) {
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
    } else if (passwordSpecialCharactersPermit) {
      regexSpecial.test(password) &&
        callback(getErrorMessage("errorPasswordSpecialTrue"));
    }
  } else if ((password !== undefined) & (password == "")) {
    return callback(getErrorMessage("errorPasswordEmpty"));
  }
}

module.exports = {
  useDefaultSettings,
  setSettings,
  setErrorMessages,
  validate,
  checkName,
  checkEmail,
  checkPassword
};
