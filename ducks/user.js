// Helper
const getUrlType = ok => window.screen.width > 768 
  ? "site" : "application"

// Constants
const SET_USER_STATE = "SET_USER_STATE"
const TOGGLE_LOADING_USER = "TOGGLE_LOADING_USER"
const SET_URL_TYPE = "SET_URL_TYPE"
const REMOVE_LINK = "REMOVE_LINK"
const TOGGLE_BURGER_MENU = "TOGGLE_BURGER_MENU"

// Reducer
const initialState = {
  loading: true,
  auth: "native",
  id: null,
  name: "Skicker",
  bio: "",
  avatar: "",
  username: "",
  links: [],
  isVerified: false,
  isOpenBurgerMenu: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    // For global dispatching
    case "SET_LAZY_PROFILE_FIELDS":
      return {...state, ...action.fields}

    // For global dispatching
    case "SET_LAZY_LINKS":
      return {
        ...state, 
        links: state.links.concat(
          action.links.map((link, i) => {
            const {length} = state.links

            return {
              ...link,
              urlType: getUrlType()
            }
          })
        )
      }

    case TOGGLE_LOADING_USER:
      state.loading = action.loading
      return {...state}

    case TOGGLE_BURGER_MENU:
      state.isOpenBurgerMenu = action.isOpen
      return {...state}

    case SET_USER_STATE:
      // Add default open url type to link 
      action.response.links = action.response.links.map(link => {
        return {
          ...link,
          urlType: getUrlType()
        }
      })

      return {...state, ...action.response}

    case SET_URL_TYPE:
      state.links = state.links.map(link => {
        const {id, urlType} = link

        return {
          ...link,
          urlType: id == action.id 
            ? urlType == "site" 
              ? "application" : "site" 
            : urlType 
        }
      })

      return {...state}

    case REMOVE_LINK:
      state.links = state.links.filter(link => {
        return link.id != action.id
      })

      return {...state}
  }

  return state
}

// Actions
export const getState = (request, history, isIm, emitAnalytics) => {
  return dispatch => {
    const options = {
      method: "GET",
      errorRedirect: "/signin",
      url: "/get-state/im/null",
      history
    }

    const dispatching = response => {
      dispatch({
        type: SET_USER_STATE,
        response
      })

      dispatch({
        type: TOGGLE_LOADING_USER,
        loading: false
      })

      setTimeout(ok => emitAnalytics("visit"))
    }

    isIm 
    ? request(options, dispatching) 
    : dispatching(window.state)
  }
}

export const toggleBurgerMenu = isOpen => ({
  type: TOGGLE_BURGER_MENU,
  isOpen
})

export const removeLink = id => ({
  type: REMOVE_LINK,
  id
})

export const setUrlType = id => ({
  type: SET_URL_TYPE,
  id
})
