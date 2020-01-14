var settings = {
  nameMin: 5,
  nameMax: 15,
  passwordMin: 8,
  passwordMax: 20,
  passwordCharMustContain: [],
  passwordMustContainUpper: false,
  passwordMustContainNumber: false,
  passwordMustContainSpace: false,
  passwordSpecialCharacters: "forbidden",
  emailMustContain: ["@", "."]
};

function useDefaultSettings() {
  settings = {
    nameMin: 5,
    nameMax: 15,
    passwordMin: 8,
    passwordMax: 20,
    passwordCharMustContain: [],
    emailMustContain: ["@", "."]
  };
}

function setSettings(set) {
  settings = Object.assign(settings, set);
  console.table(settings);
}

function validate(user, callback) {
  const { name, email, password } = user;

  const {
    nameMin,
    nameMax,
    passwordMin,
    passwordMax,
    passwordMustContainUpper,
    passwordMustContainNumber,
    passwordSpecialCharacters
  } = settings;
  const passwordCharMustContain = settings.passwordCharMustContain.join();

  var errors = [];
  checkName(name, function(error) {
    errors.push(error);
  });

  checkEmail(email, function(error) {
    errors.push(error);
  });

  CheckPassword(password, function(error) {
    errors.push(error);
  });
  if (errors) {
    /*Clear duplicate or empty strings*/
    var cleanedErrors = [];
    for (var index = 0; index < errors.length; index++) {
      error = errors[index];
      if (!cleanedErrors.includes(error) & (error != "")) {
        cleanedErrors.push(error);
      }
    }

    /*Pass errors to callback*/
    callback(cleanedErrors);
  }
}

function checkName(name, callback) {
  if (name !== undefined) {
    /*Verifying name length*/
    name.length >= nameMin
      ? console.log("Name length is equal or higher than min!")
      : callback(`Name length should be equal or higher than ${nameMin}`);
    name.length <= nameMax
      ? console.log("Name length is equal or less than max!")
      : callback(`Name length should be equal or less than ${nameMax}`);
  } else if ((name !== undefined) & (name == "")) {
    return callback(`Name length should be equal or higher than ${nameMin}`);
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

function CheckPassword(password, callback) {
  if (password !== undefined) {
    /*Verifying password length*/
    password.length >= passwordMin
      ? ""
      : callback(
          `Password length should be equal or higher than ${passwordMin}`
        );
    password.length <= passwordMax
      ? ""
      : callback(`Password length should be equal or less than ${passwordMax}`);

    /*Verifying if password contains certain characters*/
    if (passwordCharMustContain) {
      const errorText = "Password should contain this character: ";
      passwordCharMustContain.forEach(element => {
        if (!password.includes(element))  callback(`${errorText}${element}`);
      });
    }

    /*Verify if password contains uppercase*/
    regexUpper = /[A-Z]/;
    if (passwordMustContainUpper) {
      regexUpper.test(password)
        ? console.log("Password contains uppercase!")
        : callback("Password should contain at last 1 uppercase");
    }

    /*Verify if password contains number*/
    regexNumber = /[0-9]/;
    if (passwordMustContainNumber) {
      regexNumber.test(password)
        ? console.log("Password contains number!")
        : callback("Password should contain at last 1 number");
    }

    /*Verify if password*/
    regexSpecial = /^[A-Za-z0-9 ]+$/;
    if (passwordSpecialCharacters == "forbidden") {
      regexSpecial.test(password)
        ? console.log("Password doesn't contains special characters!")
        : callback("Forbidden characters in password");
    } else if (passwordSpecialCharacters == "permitted") {
      regexSpecial.test(password)
        ? errors.push("Password doesn't contains special characters!")
        : callback("Password contains special characters!");
    }
  } else if ((password !== undefined) & (password == "")) {
    return callback("Empty password!");
  }
}

module.exports = { settings, useDefaultSettings, setSettings, validate };
