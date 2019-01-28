import Searchable from "./Searchable"
import SelectableLinksList from "./SelectableLinksList"
import SelectableConfirm from "./SelectableConfirm"

import "./Selectable.sass"

class Selectable extends React.Component {
  componentWillMount () {
    const {dispatch, actions} = this.context
    const {links} = this.props.view

    dispatch(actions.setFilteredLinks(links))
  }

  render () {
    const {
      store, 
      view, 
      mapArrayByCategories
    } = this.props

    const {searchable, links} = view
    const {filteredLinks, selectedLinks} = store
    const linksLists = mapArrayByCategories(filteredLinks)

    return (
      <div className="selectable-wrapper">
        <Searchable 
          store={store} 
          placeholder={searchable}
          links={links}
        />
        {
          linksLists.map((list, i) => {
            return <SelectableLinksList 
              key={i} 
              list={list}
              store={store}
            />
          })
        }
        <SelectableConfirm
          className={selectedLinks.length ? "on" : "off"}
          count={selectedLinks.length}
        />
      </div>
    )
  }
}

Selectable.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setFilteredLinks: PropTypes.func.isRequired
  }).isRequired
}

Selectable.propTypes = {
  store: PropTypes.shape({
    filteredLinks: PropTypes.array.isRequired,
    selectedLinks: PropTypes.array.isRequired
  }).isRequired,
  
  mapArrayByCategories: PropTypes.func.isRequired,

  view: PropTypes.shape({
    searchable: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired
  }).isRequired
}

export default Selectable