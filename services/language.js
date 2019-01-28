const detectLanguage = language => {
  return __CONFIG__.languages.filter(item => {
    return item == language
  })[0] || "ru"
}

export default ok => {
  const language = localStorage.getItem("sk-language")
  
  return language
  ? detectLanguage(language)
  : detectLanguage(navigator.language)
}