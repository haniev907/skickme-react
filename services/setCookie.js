export default (name, value, options={}) => {
  let expires = options.expires

  if (typeof expires == "number" && expires) {
    const date = new Date()
    date.setTime(date.getTime() + expires * 1000)

    expires = options.expires = date
  }

  if (expires && expires.toUTCString)
    options.expires = expires.toUTCString()

  value = encodeURIComponent(value)
  let updatedCookie = name + "=" + value

  for (const propName in options) {
    updatedCookie += "; " + propName
    const propValue = options[propName]

    if (propValue !== true)
      updatedCookie += "=" + propValue
  }

  document.cookie = updatedCookie
}