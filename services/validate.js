import list from "../validation"
import debug from "./debug"

export default (body, chunkName, delay) => new Promise (resolve => {
  let valid = true

  const showErrorMessage = message => {
    debug("error", message, delay)
    valid = false
  }

  if (!Object.keys(body).length) {
    showErrorMessage("FORM_NOT_VALID")
    return
  }

  for (const item in body) {
    const vitem = list[chunkName][item]
    const value = body[item]

    if (!vitem || (vitem.if && !vitem.if(value, body))) 
      continue

    const {
      min=1, 
      max=1000, 
      type, 
      validator,
      required,
      search, 
      setMessage,
      setRequiring
    } = vitem
    
    let isRequired = required
    let {message="Unknown"} = vitem

    if (setMessage) 
      message = setMessage(value, body)

    if (setRequiring)
      isRequired = setRequiring(value, body)

    if (isRequired === false && !value)
      continue

    if (type == Number && typeof value != "number") {
      showErrorMessage(message)
      break
    } 

    else if (type == String && typeof value != "string") {
      showErrorMessage(message)
      break
    } 

    else if (type == Boolean && typeof value != "boolean") {
      showErrorMessage(message)
      break
    }

    else if (type == Array && !(value instanceof Array)) {
      showErrorMessage(message)
      break
    }

    else if (type == Object && typeof value != "object") {
      showErrorMessage(message)
      break
    }

    else if ((
      typeof value == "string" || 
      value instanceof Array
    ) && (
      value.length < min || 
      value.length > max
    )) {
      showErrorMessage(message)
      break
    }

    else if (search) {
      if (!~value.search(search)) {
        showErrorMessage(message)
        break
      }
    }

    else if (validator) {       
      if (!validator(value, body)) {
        showErrorMessage(message)
        break
      }
    }
  }

  valid && resolve(body)
})