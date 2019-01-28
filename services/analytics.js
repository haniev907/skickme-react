function convertDate (stage, view, date) {
  const {months} = view

  const year = date.getFullYear()
  const slicedYear = String(year).slice(2)
  const month = date.getMonth()
  const day = date.getDate()

  const monthText = `${months.default[month]}, ${year}`
  const dayText = `${day} ${months.postfix[month]}, ${year}`

  return {
    position: `${year}-${month}-${day}`,
    month: `${months.default[month]}'${slicedYear}`,
    day: `${day} ${months.postfix[month]}'${slicedYear}`,
    text: stage == "month" 
      ? monthText
      : dayText
  }
}

function mergeItems (items) {
  const mergedItems = []

  items.forEach(item => {
    const {position} = item
    const isExistItemInMerged = mergedItems.some(item => {
      return item.position == position
    })

    if (isExistItemInMerged) {
      const matchedItem = mergedItems.filter(item => {
        return item.position == position
      })[0] 

      matchedItem.visits += item.visits
      matchedItem.clicks += item.clicks
    }

    else mergedItems.push(item)
  })

  return mergedItems
}

function createItem (data, stage, date) {
  stage == "day" 
  ? date.setDate(date.getDate() -1) 
  : date.setMonth(date.getMonth() -1)
  
  data.dates.unshift(date.toISOString())
  data.visits.unshift(0)
  data.clicks.unshift(0)
}

// Normalize data
const normalizeData = (stage, view, data) => {
  if (!data.dates.length) return

  if (stage == "month") {
    const values = {}
    const positions = []
    const dataAsMonths = {
      dates:  [],
      visits: [],
      clicks: []
    }

    data.dates.forEach((item, i) => {
      const date = new Date(item)
      const year = date.getFullYear()
      const month = date.getMonth()

      values[`${year}-${month}`] = i
    })

    Object.keys(values).forEach((key, i) => {
      positions.push(values[key])
    })

    positions.forEach((position, i) => {
      const first = i == 0 ? 0 : positions[i - 1] + 1
      const last = position + 1

      const visits = data.visits
        .slice(first, last)
        .reduce((previous, next) => previous + next)

      const clicks = data.clicks
        .slice(first, last)
        .reduce((previous, next) => previous + next)

      dataAsMonths.dates.push(data.dates[first])
      dataAsMonths.visits.push(visits)
      dataAsMonths.clicks.push(clicks)
    })

    data = dataAsMonths
  }

  if (data.dates.length == 1) 
    createItem(data, stage, new Date(data.dates[0]))

  return mergeItems(
    data.dates.map((date, i) => {
      return {
        ...convertDate(stage, view, new Date(date)),
        ...{
          visits: data.visits[i],
          clicks: data.clicks[i]
        }
      }
    })
  )
}

// Is user limited to trigger analytics events
const isUserLimitToAnalytics = (username, type, id) => {
  const setLimits = limits => {
    localStorage.setItem("sk-limits", JSON.stringify(limits))
  }

  let limits = JSON.parse(localStorage.getItem("sk-limits"))
  let maxAge = new Date
  
  maxAge.setHours(23)
  maxAge.setMinutes(59)
  maxAge.setSeconds(59)
  maxAge.setMilliseconds(999)
  maxAge = maxAge.getTime()

  limits = limits instanceof Array ? limits : []
  limits = limits.length > 1000 ? [] : limits

  let user = limits.filter((item={}) => {
    return item.username == username
  })[0]

  if (type == "visit") {
    if (!user) {
      limits.push({
        username,
        maxAge, 
        links: []
      })

      setLimits(limits)
      return false
    } else {
      if (Date.now() > +user.maxAge) {
        user.maxAge = maxAge
        user.links = []

        setLimits(limits)

        return false
      }

      return true
    }
  }

  else {
    const isLinkExist = user.links.indexOf(id) != -1

    if (!isLinkExist) {
      user.links.push(id)
      setLimits(limits)
      return false
    }

    return true
  }
}

export default {
  normalizeData, 
  isUserLimitToAnalytics
}