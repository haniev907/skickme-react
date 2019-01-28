// Constants
const SET_SHARE_STATE = "SET_SHARE_STATE"
const TOGGLE_LOADING_SHARE = "TOGGLE_LOADING_SHARE"
const SCALE_QR_CODE = "SCALE_QR_CODE"

// Reducer
const initialState = {
  username: "",
  name: "",
  scale: 19,
  loading: true
}

export default (state=initialState, action) => {
  switch (action.type) {
    // For global dispatching
    case "SET_LAZY_PROFILE_FIELDS":
      state.username = action.fields.username
      return {...state}

    case TOGGLE_LOADING_SHARE:
      state.loading = action.loading
      return {...state}

    case SET_SHARE_STATE:
      return {...state, ...action.response}

    case SCALE_QR_CODE:
      state.scale = action.scale
      return {...state}
  }

  return state
}

// Actions
export const scaleQRCode = scale => ({
  type: SCALE_QR_CODE,
  scale
})

export const getState = (request, history) => {
  return dispatch => {
    const options = {
      method: "GET",
      errorRedirect: "/signin",
      url: "/get-state/share/null",
      history
    }

    request(options, response => {
      dispatch({
        type: SET_SHARE_STATE,
        response
      })

      dispatch({
        type: TOGGLE_LOADING_SHARE,
        loading: false
      })
    }) 
  }
}