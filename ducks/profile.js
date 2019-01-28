// Constants
const SET_FIELD = "SET_FIELD"
const TOGGLE_AVATAR_EDITOR = "TOGGLE_AVATAR_EDITOR"
const SET_IMAGE = "SET_IMAGE"
const SCALE_IMAGE = "SCALE_IMAGE"
const SET_STATE_PROFILE = "SET_STATE_PROFILE"
const TOGGLE_LOADING_PROFILE = "TOGGLE_LOADING_PROFILE"
const SET_ACCORDION_POSITION = "SET_ACCORDION_POSITION"
const ROTATE_IMAGE = "ROTATE_IMAGE"
const RESET_EMAIL_AND_PASSWORD = "RESET_EMAIL_AND_PASSWORD"

// Reducer
const initialState = {
  loading: true,

  fields: {
    avatar: "",
    name: "Skicker",
    passwordToEmail: "",
    email: "",
    myEmail: "",
    passwordToPassword: "",
    password: "",
    username: "",
    bio: ""
  },

  avatar: {
    image: "",
    mimeType: "image/jpeg",
    isAvatarEditor: false,
    scale: 12,
    rotate: 0
  },

  accordionPosition: 0
}

export default (state=initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING_PROFILE:
      state.loading = action.loading
      return {...state}

    case SET_STATE_PROFILE:
      state.fields = {...state.fields, ...action.response}
      return {...state}

    case SET_FIELD:
      state.fields[action.name] = action.value
      return {...state}

    case SET_IMAGE:
      // if mimeType didn`t passed, because it`s time for upload to server
      if (!action.mimeType)
        state.fields.avatar = action.image

      state.avatar.rotate = 0
      state.avatar.image = action.image
      state.avatar.mimeType = action.mimeType || "image/jpeg"
      
      return {...state}

    case TOGGLE_AVATAR_EDITOR:
      state.avatar.isAvatarEditor = action.stage
      return {...state}

    case SCALE_IMAGE:
      state.avatar.scale = parseFloat(action.scale)
      return {...state}

    case ROTATE_IMAGE:
      state.avatar.rotate = action.rotate
      return {...state}

    case SET_ACCORDION_POSITION:
      state.accordionPosition = +action.position
      return {...state}

    case RESET_EMAIL_AND_PASSWORD:
      state.fields = {
        ...state.fields,
        ...{
          email: "",
          password: "",
          passwordToEmail: "",
          passwordToPassword: ""
        }
      }

      return {...state}
  }

  return state
}

// Actions
export const resetEmailAndPassword = ok => ({
  type: RESET_EMAIL_AND_PASSWORD
})

export const getState = (request, history, isTour) => dispatch => {
  const options = {
    method: "GET",
    url: "/get-state/profile/null",
    errorRedirect: "/signin",
    history
  }

  dispatch(resetEmailAndPassword())

  request(options, response => {
    // response.myEmail is readOnly
    response.myEmail = response.email
    delete response.email

    // Clear [name, username] fields if stage=tour
    if (isTour("/im", true)) {
      response.name = ""
      response.username = ""
    }

    dispatch({
      type: SET_STATE_PROFILE,
      response
    })

    dispatch({
      type: TOGGLE_LOADING_PROFILE,
      loading: false
    })
  })
}

export const setAccordionPosition = position => ({
  type: SET_ACCORDION_POSITION,
  position
})

export const setField = (name, value) => ({
  type: SET_FIELD,
  name, value
})

export const toggleAvatarEditor = stage => ({
  type: TOGGLE_AVATAR_EDITOR,
  stage
})

export const setImage = (image, mimeType) => ({
  type: SET_IMAGE,
  image,
  mimeType
})

export const scaleImage = scale => ({
  type: SCALE_IMAGE,
  scale
})

export const rotateImage = rotate => ({
  type: ROTATE_IMAGE,
  rotate
})