import getCookie from "./getCookie"

export default ok => {
  const {pathname} = location 
  const {authPaths} = __CONFIG__

  const isMatch = authPaths.some(pathByGet => {
    return pathByGet == pathname
  })

  const sid = getCookie("sid")
  const auth = getCookie("auth")
  const id = getCookie("id")

  return isMatch && (!sid || !auth || !id) 
    ? location.href = "/signin" 
    : true
}