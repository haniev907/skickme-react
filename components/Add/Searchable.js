import Field from "../Common/Field"

class Searchable extends React.Component {
  filteringLinks (links, value) {
    const regExp = new RegExp(value.trim(), "i")

    return links.filter(link => link.text.match(regExp))
  }

  onChange (event) {
    const {links} = this.props
    const {value} = event.target

    const {dispatch, actions} = this.context
    const filteredLinks = this.filteringLinks(links, value)
    
    const reFilteredLinks = filteredLinks.length
      ? filteredLinks : links

    dispatch(actions.setSearchableValue(value))
    dispatch(actions.setFilteredLinks(reFilteredLinks))
  }

  render () {
    const {placeholder, store} = this.props

    return <Field
      type="text"
      name="searchable"
      placeholder={placeholder}
      value={store.searchable}
      onChange={::this.onChange}
    />
  }
}

Searchable.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setSearchableValue: PropTypes.func.isRequired,
    setFilteredLinks: PropTypes.func.isRequired
  }).isRequired
}

Searchable.propTypes = {
  store: PropTypes.shape({
    searchable: PropTypes.string.isRequired
  }).isRequired,

  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  placeholder: PropTypes.string.isRequired
}

export default Searchable