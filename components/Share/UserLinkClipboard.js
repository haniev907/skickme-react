import Clipboard from "react-clipboard.js"

import "./UserLinkClipboard.sass"

class UserLinkClipboard extends React.Component {
  getUsername ({username}, withoutProtocol) {
    const {origin, host} = location

    return `${withoutProtocol ? host : origin}/${username}`
  }

  onSuccess () {
    const {debuggers, debug} = this.props
    debug("info", debuggers.LINK_COPIED)
  }

  onClick () {    
    this.refs.username.focus()
    this.refs.username.selectionStart = 0
    this.refs.username.selectionEnd = 999
  }

  render () {
    const {text, store} = this.props

    return (
      <div className="user-link-clipboard-wrapper flex">
        <input 
          className="text font"
          ref="username"
          defaultValue={this.getUsername(store, true)}
          readOnly
        />
        <Clipboard 
          className="clipboard" 
          component="span" 
          onClick={::this.onClick}
          onSuccess={::this.onSuccess}
          data-clipboard-text={this.getUsername(store)}>
          {text}
        </Clipboard>
      </div>
    )
  }
}

UserLinkClipboard.propTypes = {
  text: PropTypes.string.isRequired,
  debuggers: PropTypes.object.isRequired,
  debug: PropTypes.func.isRequired,
  store: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
}

export default UserLinkClipboard