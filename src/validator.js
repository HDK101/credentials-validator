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
  if (name !== undefined) {
    /*Verifying name length*/
    const nameMinError =
      name.length >= nameMin
        ? ""
        : `Name length should be equal or higher than ${nameMin}`;
    const nameMaxError =
      name.length <= nameMax
        ? ""
        : `Name length should be equal or less than ${nameMax}`;
    errors.push(nameMinError, nameMaxError);
  } else if ((name !== undefined) & (name == "")) {
    errors.push("Empty name!");
  }
  if (email !== undefined) {
    const emailParts = email.split("@");
    const emailProvider = emailParts.length > 1 ? emailParts[1].split(".") : [];

    /*Verify if exists a value before @*/
    if (!emailParts[0]) errors.push("Invalid email!");

    /*Verify if is an valid email provider*/
    if (!emailProvider[0]) errors.push("Invalid email!");
  } else if ((email !== undefined) & (email == "")) {
    errors.push("Empty email!");
  }
  if (password !== undefined) {
    /*Verifying password length*/
    const passwordMinError =
      password.length >= passwordMin
        ? ""
        : `Password length should be equal or higher than ${passwordMin}`;
    const passwordMaxError =
      password.length <= passwordMax
        ? ""
        : `Password length should be equal or less than ${passwordMax}`;

    errors.push(passwordMinError, passwordMaxError);

    /*Verifying if password contains certain characters*/
    if (passwordCharMustContain) {
      const errorText = "Password should contain this character: ";
      passwordCharMustContain.forEach(element => {
        if (!password.includes(element)) errors.push(`${errorText}${element}`);
      });
    }

    /*Verify if password contains uppercase*/
    regexUpper = /[A-Z]/;
    if (passwordMustContainUpper) {
      regexUpper.test(password)
        ? console.log("Password contains uppercase!")
        : errors.push("Password should contain at last 1 uppercase");
    }

    /*Verify if password contains number*/
    regexNumber = /[0-9]/;
    if (passwordMustContainNumber) {
      regexNumber.test(password)
        ? console.log("Password contains number!")
        : errors.push("Password should contain at last 1 number");
    }

    /*Verify if password*/
    regexSpecial = /^[A-Za-z0-9 ]+$/;
    if (passwordSpecialCharacters == "forbidden") {
      regexSpecial.test(password)
        ? console.log("Password doesn't contains special characters!")
        : errors.push("Forbidden characters in password");
    } else if (passwordSpecialCharacters == "permitted") {
      regexSpecial.test(password)
        ? errors.push("Password doesn't contains special characters!")
        : console.log("Password contains special characters!");
    }
  } else if ((password !== undefined) & (password == "")) {
    errors.push("Empty password!");
  }
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

module.exports = { settings, useDefaultSettings, setSettings, validate };
