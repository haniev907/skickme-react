import axios from "axios"
import nprogress from "nprogress"

import debug from "./debug"
import language from "./language"

let cachedUrls = {}
let request = (options, callback) => {
  const {
    method, 
    url, 
    data, 
    successRedirect, 
    errorRedirect,
    history
  } = options

  if (method == "GET" && ~Object.keys(cachedUrls).indexOf(url))
    return

  nprogress.start()

  axios.create({
    headers: {
      "csrf-token": window.csrf,
      "language": language()
    }
  })[method.toLowerCase()](url, data)
  .then(response => {
    const {data} = response

    method == "GET" && (cachedUrls[url] = true)
    callback && callback(data)
    successRedirect && history.push(successRedirect)

    nprogress.done()
  }, error => {
    errorRedirect
    ? history.push(errorRedirect)
    : debug("error", error.response.data)

    nprogress.done()
  })
}

export default request