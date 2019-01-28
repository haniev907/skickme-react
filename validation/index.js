import debuggers from "debuggers"

const regExp = {
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^[a-zA-Z0-9\S]{6,16}$/,
  avatar: /image\/(jpeg|png)/,
  username: /^[a-zA-Z0-9_\-\.]+$/
}

const commonValidation = {
  email: {
    type: String,
    search: regExp.email,
    message: debuggers.INCORRECT_EMAIL
  },

  password: {
    type: String,
    search: regExp.password,
    message: debuggers.INCORRECT_PASSWORD
  }
}

export default {
  fields: {
    email: commonValidation.email,
    password: commonValidation.password
  },

  editorFields: {
    passwordToEmail: {
      ...commonValidation.password,
      setRequiring: (value, body) => body.email ? true : false
    },

    email: {
      ...commonValidation.email,
      required: false
    },

    passwordToPassword: {
      ...commonValidation.password,
      setRequiring: (value, body) => body.password ? true : false
    },

    password: {
      ...commonValidation.password,
      required: false
    },

    name: {
      type: String,
      min: 2,
      max: 33,
      message: debuggers.INCORRECT_NAME
    },

    username: {
      type: String,
      min: 2,
      max: 33,
      search: regExp.username,
      message: debuggers.INCORRECT_USERNAME
    },

    bio: {
      type: String,
      min: 0,
      max: 255,
      message: debuggers.INCORRECT_BIO,
      required: false
    }
  },

  avatar: {
    mimeType: {
      type: String,
      search: regExp.avatar,
      message: debuggers.INCORRECT_FILE_TYPE
    },

    size: {
      type: Number,
      validator: size => size <= Math.pow(1024, 2) * 5,
      message: debuggers.LIMIT_FILE_SIZE
    }
  }
}