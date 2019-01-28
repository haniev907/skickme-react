import axios from "axios"
import getLanguage from "./language"

let logsCache
window.__DICTIONARY__ = {}

export default paths => new Promise(resolve => {
  const language = getLanguage()

  !logsCache && paths.push("logs")
  logsCache = true

  const isAllPathsCached = paths.every(path => __DICTIONARY__[path])

  if (isAllPathsCached) {
    return resolve()
  }

  const urls = paths.map(path => `/dictionary/${language}/${path}.json`)
  const requests = urls.map(url => axios.get(`${url}?v=${__VERSION__}`))

  axios.all(requests).then(responses => {
    responses.forEach((response, i) => {
      __DICTIONARY__[paths[i]] = response.data
    })

    resolve()
  })
})