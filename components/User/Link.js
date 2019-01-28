import UrlChanger from "./UrlChanger"

import "./Link.sass"

class Link extends React.Component {
  onClick (event) {
    const {url, id, im} = event.currentTarget.dataset

    this.props.onClick(url, id)
    location.href = `/open-link?link=${url}`
  }

  onRemove (event) {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    
    const {dispatch, actions} = this.context
    const {id} = event.currentTarget.dataset

    dispatch(actions.removeLink(id))
    this.props.onRemove(id)
  }

  render () {
    const {
      type, linkConfigure, isIm,
      link: {
        name, 
        code, 
        background, 
        id, 
        urlType
      }
    } = this.props

    const icon = `url(${__PUBLIC_PATH__}link-${name}.svg)`
    const {url, text, withChanger} = linkConfigure({
      name, 
      code,
      urlType
    })

    return (
      <div 
        data-url={url}
        data-id={id}
        onClick={::this.onClick}
        className={`link-wrapper ${type} ${isIm && "padding"}`}>
        {
          !isIm ? null : (
            <div 
              className="remove" 
              onClick={::this.onRemove} 
              data-id={id}
            >
              <div className="icon"/>
            </div>
          )
        }
        {
          type == "other" 
          ? <div className="link flex" style={{background}}>
              <div 
                className="icon" 
                style={{backgroundImage: icon}}
              />
              <div className="text">{text}</div>
              {
                withChanger
                ? <UrlChanger 
                    id={id} 
                    urlType={urlType}
                  /> 
                : null
              }
            </div>
          : <div className="text">{text}</div>
        }
      </div>
    )
  }
}

Link.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    removeLink: PropTypes.func.isRequired
  }).isRequired
}

Link.propTypes = {
  type: PropTypes.string.isRequired,
  isIm: PropTypes.bool.isRequired,
  
  link: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    urlType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,

  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  linkConfigure: PropTypes.func.isRequired
}

export default Link