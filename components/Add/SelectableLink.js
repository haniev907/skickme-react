import "./SelectableLink.sass"

class SelectableLink extends React.Component {
  onSelect (event) {
    const {dispatch, actions} = this.context
    const isSelected = this.isSelected()
    
    const {
      name, 
      placeholder, 
      background, 
      icon,
      prefix,
      postfix
    } = event.currentTarget.dataset

    dispatch(
      actions.toggleSelectingLink(isSelected, {
        name, 
        placeholder, 
        background, 
        icon,
        prefix,
        postfix
      })
    ) 
  }

  getIcon (name) {
    return `url(${__PUBLIC_PATH__}link-${name}.svg)`
  }

  isSelected () {
    const {link, store} = this.props
    const {name} = link

    return store.selectedLinks.filter(link => {
      return link.name == name
    }).length ? "selected" : false
  }

  render () {
    const {link} = this.props
    const {
      background, 
      name, 
      text, 
      placeholder,
      prefix,
      postfix
    } = link
    
    const parentStyle = {background}
    const childStyle = {
      backgroundImage: this.getIcon(name)
    }

    return (
      <div 
        data-name={name}
        data-placeholder={placeholder}
        data-prefix={prefix}
        data-postfix={postfix}
        data-background={background}
        data-icon={this.getIcon(name)}
        onClick={::this.onSelect}
        className="selectable-link-wrapper">
        <div 
          className={`link ${this.isSelected()}`} 
          style={parentStyle}>
          <div className="icon" style={childStyle}/>
          <div className="text">{text}</div>
        </div>
      </div>
    )
  }
}

SelectableLink.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    toggleSelectingLink: PropTypes.func.isRequired
  }).isRequired
}

SelectableLink.propTypes = {
  link: PropTypes.shape({
    background: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    postfix: PropTypes.string
  }).isRequired,

  store: PropTypes.shape({
    selectedLinks: PropTypes.array.isRequired
  }).isRequired
}

export default SelectableLink