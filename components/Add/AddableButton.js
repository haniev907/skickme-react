import "./AddableButton.sass"

class AddableButton extends React.Component {
  mapLinksToSend (links) {
    return links.map(link => {
      const {name, fields} = link

      return {
        name, 
        code: fields.join("@")
      }
    })
  }

  isFieldsFilled (links) {
    return links.every(link => {
      const {fields, placeholder} = link

      return fields.length
        ? fields.length < placeholder.split("@").length
          ? false
          : fields
              .filter(field => field)
              .length == fields.length
            ? true
            : false
        : false
    })
  }

  onClick () {
    const {
      store, 
      debug, 
      debuggers, 
      onAddLinks
    } = this.props
    
    const {selectedLinks} = store

    this.isFieldsFilled(selectedLinks)
    ? onAddLinks(this.mapLinksToSend(selectedLinks))
    : debug("error", debuggers.FILL_ALL_LINKS)
  }

  render () {
    return (
      <button 
        onClick={::this.onClick}
        className="addable-button">
        {this.props.text}
      </button>
    )
  }
}

AddableButton.propTypes = {
  text: PropTypes.string.isRequired,
  store: PropTypes.shape({
    selectedLinks: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,

  debug: PropTypes.func.isRequired,
  debuggers: PropTypes.object.isRequired,
  onAddLinks: PropTypes.func.isRequired
}

export default AddableButton