export default (name, url, id) => {
  url = url.trim()

  const isUsername = !url.match(new RegExp(name, "i"))

  if (isUsername && !id) return url
  else {
    if (id) {
      const idIndex = url.lastIndexOf(`${id}=`)

      return url.slice(idIndex == -1 ? 0 : idIndex + `${id}=`.length)
    } else {
      let newUrl = url.slice(0, 
        url.indexOf("?") == -1 
          ? url.length 
          : url.indexOf("?")
      )
      let letter = newUrl[newUrl.length - 1]

      newUrl = newUrl
        .slice(0, letter == "/" ? -1 : newUrl.length)

      return newUrl.slice(newUrl.lastIndexOf("/") + 1)
    }
  }
}