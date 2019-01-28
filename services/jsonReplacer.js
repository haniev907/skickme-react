export default (content, data) => {
  // Replace {{{*}}}
  content = content.replace(/\{{3}[a-zA-Z\.]+\}{3}/g, item => {
    let value

    item.slice(3, -3).split(".").forEach(item => {
      return value 
        ? value = value[item] 
        : value = window[item]
    })

    return value
  })

  // Replace {{*}}
  Object.keys(data).forEach(item => {
    const dataRegExp = new RegExp(`\{{2}${item}\}{2}`, "g")

    content = content.replace(dataRegExp, data[item])
  })

  return content
}