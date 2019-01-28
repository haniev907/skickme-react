// Constants
const SET_FIELD = "SET_FIELD"

// Reducer
const initialState = {
  fields: {
    email: "",
    password: ""
  }
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      state.fields[action.name] = action.value
      return {...state}
  }

  return state
}

// Actions
export const setField = (name, value) => ({
  type: SET_FIELD,
  name, value
})