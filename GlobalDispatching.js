export default store => {
  const {dispatch, getState} = store
  const {action} = getState()
  
  switch (action.type) {
    case "GLOBAL_DISPATCHING_PROFILE_FIELDS":
      return dispatch({
        type: "SET_LAZY_PROFILE_FIELDS",
        fields: action.fields
      })

    case "GLOBAL_DISPATCHING_LINKS":
      return dispatch({
        type: "SET_LAZY_LINKS",
        links: action.links
      })
  }
}