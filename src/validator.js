var settings = {
  nameMin: 5,
  nameMax: 15,
  passwordMin: 8,
  passwordMax: 20,
  passwordCharMustContain: [],
  passwordMustContainUpper: false,
  passwordMustContainNumber: false,
  passwordSpecialCharactersPermit: false
};

function useDefaultSettings() {
  settings = {
    nameMin: 5,
    nameMax: 15,
    passwordMin: 8,
    passwordMax: 20,
    passwordCharMustContain: [],
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
    name.length < nameMin && callback(`Name too short, min length: ${nameMin}`);
    name.length > nameMax && callback(`Name too long, max length: ${nameMax}`);
  } else if ((name !== undefined) & (name == "")) {
    return callback(`Empty name`);
  }
}

function checkEmail(email, callback) {
  if (email !== undefined) {
    const emailParts = email.split("@");
    const emailProvider = emailParts.length > 1 ? emailParts[1].split(".") : [];

    /*Verify if exists a value before @*/
    if (!emailParts[0]) return callback("Invalid email!");

    /*Verify if is an valid email provider*/
    if (!emailProvider[0]) return callback("Invalid email!");
  } else if ((email !== undefined) & (email == "")) {
    return callback("Empty email!");
  }
}

function checkPassword(password, callback) {
  const {
    passwordMin,
    passwordMax,
    passwordMustContainUpper,
    passwordMustContainNumber,
    passwordSpecialCharactersPermit,
    passwordCharMustContain
  } = settings;
  if (password !== undefined) {
    /*Verifying password length*/
    password.length < passwordMin &&
      callback(`Password too short, min length: ${passwordMin}`);
    password.length > passwordMax &&
      callback(`Password too long, max length: ${passwordMax}`);

    /*Verifying if password contains certain characters*/
    if (passwordCharMustContain) {
      const errorText = "Password should contain this character: ";
      passwordCharMustContain.forEach(element => {
        if (!password.includes(element)) callback(`${errorText}${element}`);
      });
    }

    /*Verify if password contains uppercase*/
    regexUpper = /[A-Z]/;
    if (passwordMustContainUpper) {
      !regexUpper.test(password) &&
        callback("Password should contain at last 1 uppercase");
    }

    /*Verify if password contains number*/
    regexNumber = /[0-9]/;
    if (passwordMustContainNumber) {
      !regexNumber.test(password) &&
        callback("Password should contain at last 1 number");
    }

    /*Verify if password has special characters*/
    regexSpecial = /^[A-Za-z0-9 ]+$/;
    if (!passwordSpecialCharactersPermit) {
      !regexSpecial.test(password) &&
        callback("Forbidden characters in password");
    } else if (passwordSpecialCharactersPermit) {
      regexSpecial.test(password) &&
        callback("Password should contain at last 1 special characters!");
    }
  } else if ((password !== undefined) & (password == "")) {
    return callback("Empty password!");
  }
}

module.exports = {
  useDefaultSettings,
  setSettings,
  validate,
  checkName,
  checkEmail,
  checkPassword
};
