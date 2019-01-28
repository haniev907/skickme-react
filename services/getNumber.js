export default string => {
  return string
    .replace(/\++/, "")
    .split(/[^\d]+/)
    .map(item => typeof +item == "number" ? item : false)
    .join("")
}