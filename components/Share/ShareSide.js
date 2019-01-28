import UserLinkClipboard from "./UserLinkClipboard"
import SocialShare from "./SocialShare"

import "./ShareSide.sass"

const ShareSide = props => {
  const {
    view, 
    store, 
    debuggers, 
    debug,
    jsonReplacer
  } = props
  
  const {
    title, 
    description, 
    socialShare, 
    clipboard
  } = view

  return (
    <div className="share-side flex">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <UserLinkClipboard 
        store={store} 
        text={clipboard}
        debuggers={debuggers}
        debug={debug}
      />
      <div className="title title-2">
        {socialShare.title}
      </div>
      <SocialShare 
        jsonReplacer={jsonReplacer}
        items={socialShare.items}
        store={store}
      />
    </div>
  )
}

ShareSide.propTypes = {
  jsonReplacer: PropTypes.func.isRequired,
  view: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    socialShare: PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired
    }).isRequired,
    clipboard: PropTypes.string.isRequired
  }).isRequired,

  debuggers: PropTypes.object.isRequired,
  debug: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

export default ShareSide