import SelectableLink from "./SelectableLink"

import "./SelectableLinksList.sass"

const SelectableLinksList = props => {
  const {list, store} = props
  const {category} = list[0]

  return (
    <div className="selectable-links-list-wrapper">
      <div className="category">{category}</div>
      <div className="list flex">
        {
          list.map(link => {
            // do not use increment key 
            const key = link.name
                      
            return <SelectableLink 
              link={link} 
              key={key} 
              store={store}
            />
          })
        }
      </div>
    </div>
  )
}

SelectableLinksList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  store: PropTypes.object.isRequired
}

export default SelectableLinksList