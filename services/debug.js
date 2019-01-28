let debugOuterTimeout, debugInnerTimeout

export default (type, text, delay, callback) => {
  const debug = document.querySelector(".react-debug")

  text = __DICTIONARY__.logs[text] || text

  if (!text) return

  clearInterval(debugOuterTimeout)
  clearTimeout(debugInnerTimeout)

  debugOuterTimeout = setTimeout(() => {
    debug.innerHTML = text

    type == "error"
    ? (debug.className = "react-debug error")
    : (debug.className = "react-debug info")

    debugInnerTimeout = setTimeout(() => {
      if (callback) callback()
      debug.className = "react-debug"
    }, delay * 1000 || 3000)
  })
}