import "./UrlChanger.sass"

class UrlChanger extends React.Component {
  getClassName (type) {
    const {urlType} = this.props
    return urlType == type ? "active" : ""
  }

  onClick (event) {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    
    const {dispatch, actions} = this.context
    const {id} = event.currentTarget.dataset

    dispatch(actions.setUrlType(+id))
  }

  render () {   
    const {id} = this.props 

    return (
      <div className="url-changer-wrapper flex">
        <div 
          data-id={id}
          className="url-changer flex"
          onClick={::this.onClick}>
          <div 
            className={this.getClassName("application")}>
            Mobile
          </div>
          <div 
            className={this.getClassName("site")}>
            Desktop
          </div>
        </div>
      </div>
    )
  }
}

UrlChanger.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setUrlType: PropTypes.func.isRequired
  }).isRequired
}

UrlChanger.propTypes = {
  id: PropTypes.string.isRequired,
  urlType: PropTypes.oneOf([
    "site", 
    "application"
  ]).isRequired
}

export default UrlChanger