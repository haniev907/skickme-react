// Constants
const SET_ADD_LINK_STAGE = "SET_ADD_LINK_STAGE"
const SET_SEARCHABLE_VALUE = "SET_SEARCHABLE_VALUE"
const SET_FILTERED_LINKS = "SET_FILTERED_LINKS"
const TOGGLE_SELECTING_LINK = "TOGGLE_SELECTING_LINK"
const CLEAR_SELECTED_LINKS = "CLEAR_SELECTED_LINKS"
const SET_ADDABLE_FIELD = "SET_ADDABLE_FIELD"

// Reducer
const initialState = {
  stage: "selectable",
  searchable: "",
  filteredLinks: [],
  selectedLinks: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_ADD_LINK_STAGE:
      state.stage = action.stage
      return {...state}

    case SET_SEARCHABLE_VALUE:
      state.searchable = action.value
      return {...state}

    case SET_FILTERED_LINKS:
      state.filteredLinks = action.links
      return {...state}

    case TOGGLE_SELECTING_LINK:
      action.isSelected
      ? state.selectedLinks = state.selectedLinks.filter(link => {
          return link.name == action.link.name
            ? false : true
        })

      : state.selectedLinks.push({...action.link, fields: []})

      return {...state}

    case CLEAR_SELECTED_LINKS:
      state.selectedLinks = []
      return {...state}

    case SET_ADDABLE_FIELD:
      const {name, position, value} = action.options

      state.selectedLinks
        .filter(link => link.name == name)[0]
        .fields[position] = value
        
      return {...state}
  }

  return state
}

// Actions
export const setAddableField = options => ({
  type: SET_ADDABLE_FIELD,
  options
})

export const clearSelectedLinks = ok => ({
  type: CLEAR_SELECTED_LINKS
})

export const toggleSelectingLink = (isSelected, link) => ({
  type: TOGGLE_SELECTING_LINK,
  isSelected, link
})

export const setFilteredLinks = links => ({
  type: SET_FILTERED_LINKS,
  links
})

export const setSearchableValue = value => ({
  type: SET_SEARCHABLE_VALUE,
  value
})

export const setStage = stage => ({
  type: SET_ADD_LINK_STAGE,
  stage
})