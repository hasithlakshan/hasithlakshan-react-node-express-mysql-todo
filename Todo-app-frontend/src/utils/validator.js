import validate from "validate.js"
const rules = {
  loginUsername: {
    presence: {
      allowEmpty: false,
      message: "^Username is required"
    }
  },

  loginPassword: {
    presence: {
      allowEmpty: false,
      message: "^password is required"
    },
    length: {
      minimum: 6,
      message: "^Password must be minimum 6 character"
    },
    format: {
      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
      flags: "i",
      message: "^At lest one number and special character needed"
    }
  },
  registerPassword: {
    presence: {
      allowEmpty: false,
      message: "^password is required"
    },
    length: {
      minimum: 6,
      message: "^Password must be minimum 6 character"
    },
    format: {
      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
      flags: "i",
      message: "^At lest one number and special character needed"
    }
  },
  registerConfirmPassword: {
    presence: {
      allowEmpty: false,
      message: "^password is required"
    },
    length: {
      minimum: 6,
      message: "^Password must be minimum 6 character"
    },
    format: {
      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
      flags: "i",
      message: "^At lest one number and special character needed"
    }
  },
  registerFirstName: {
    presence: {
      allowEmpty: false,
      message: "^Username is required"
    }
  },
  registerLastName: {
    presence: {
      allowEmpty: false,
      message: "^Username is required"
    }
  },
  registerEmail: {
    presence: {
      allowEmpty: false,
      message: "^Username is required"
    }
  },
  homeTask: {
    presence: {
      allowEmpty: false,
      message: "^Please add task name"
    }
  }
}
const validator = (fieldName, value) => {
  const formValues = {}
  const formFields = {}
  formValues[fieldName] = value
  formFields[fieldName] = rules[fieldName]
  const result = validate(formValues, formFields)
  if (result) {
    return result[fieldName][0]
  }
  return null
}
export default validator
