export default array => {
  const categories = []
  const arrayMappedByCategories = []

  array.forEach(item => {
    const {category} = item
    const categoryPosition = categories.indexOf(category)

    if (categoryPosition == -1) {
      categories.push(category)
      arrayMappedByCategories.push([])
      arrayMappedByCategories[categories.length - 1].push(item)
    }
    
    else
      arrayMappedByCategories[categoryPosition].push(item)
  })

  return arrayMappedByCategories
}