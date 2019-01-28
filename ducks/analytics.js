// Constants
const SET_ANALYTICS_DATA = "SET_ANALYTICS_DATA"
const TOGGLE_LOADING_ANALYTICS = "TOGGLE_LOADING_ANALYTICS"
const SET_SELECT_DATE = "SET_SELECT_DATE"
const SET_ANALYTICS_STAGE = "SET_ANALYTICS_STAGE"

// Reducer
const initialState = {
  loading: true,
  stage: "day",
  data: {
    dates: [],
    visits: [],
    clicks: []
  }
}

export default (state=initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING_ANALYTICS:
      state.loading = action.loading
      return {...state}

    case SET_ANALYTICS_DATA:
      state.data.dates  = action.response.dates  || []
      state.data.visits = action.response.visits || []
      state.data.clicks = action.response.clicks || []
      return {...state}

    case SET_ANALYTICS_STAGE:
      state.stage = action.stage
      return {...state}
  }

  return state
}

// Actions
export const setStage = stage => ({
  type: SET_ANALYTICS_STAGE,
  stage
})

export const getAnalytics = (request, router) => dispatch => {
  const {
    route: {
      match: {
        params: {username}
      }
    }, 
    history
  } = router

  const requestOptions = {
    method: "GET", 
    errorRedirect: "/404",
    url: `/get-analytics/${username}`, 
    history
  }

  request(requestOptions, response => {
    dispatch({
      type: SET_ANALYTICS_DATA,
      response
    })

    dispatch({
      type: TOGGLE_LOADING_ANALYTICS,
      loading: false
    })
  })
}