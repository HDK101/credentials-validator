var settings = {
  nameMin: 5,
  nameMax: 15,
  passwordMin: 8,
  passwordMax: 20,
  passwordCharMustContain: [],
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
  console.log(settings);
}

function validate(user, elementNames, callback) {
  const { name, email, password } = user;

  const {
    nameMin,
    nameMax,
    passwordMin,
    passwordMax,
    passwordCharMustContain,
    emailMustContain
  } = settings;

  var errors = [];
  if (name) {
    const nameMinError =
      name.length >= nameMin
        ? ""
        : `Name length should be equal or higher than ${nameMin}`;
    const nameMaxError =
      name.length <= nameMax
        ? ""
        : `Name length should be equal or less than ${nameMax}`;
    errors.push(nameMinError, nameMaxError);
  } else if (elementNames.name) {
    errors.push("Empty name!");
  }
  if (email) {
    const emailParts = email.split("@");
    const emailProvider = emailParts.length > 1 ? emailParts[1].split(".") : [];

    /*Verify if exists a value before @*/
    if (!emailParts[0]) errors.push("Invalid email!");

    /*Verify if is an valid email provider*/
    if (!emailProvider[0]) errors.push("Invalid email!");

    /*Verify if email has the necessary characters*/
    for (var index = 0; index < emailMustContain.length; index++) {
      if (!email.includes(emailMustContain[index])) {
        errors.push("Invalid email!");
        break;
      }
    }
  } else if (elementNames.email) {
    errors.push("Empty email!");
  }
  if (password) {
    const passwordMinError =
      password.length >= passwordMin
        ? ""
        : `Password length should be equal or higher than ${passwordMin}`;
    const passwordMaxError =
      password.length <= passwordMax
        ? ""
        : `Password length should be equal or less than ${passwordMax}`;

    errors.push(passwordMinError, passwordMaxError);

    if (passwordCharMustContain) {
      const errorText = "Password should contain this character: ";
      passwordCharMustContain.forEach(element => {
        if (password.includes(element)) errors.push(`${errorText}${element}`);
      });
    }
  } else if (elementNames.password) {
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

if (typeof process !== "undefined") {
  module.exports = { useDefaultSettings, setSettings, validate };
}
