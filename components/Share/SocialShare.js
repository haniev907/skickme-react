import "./SocialShare.sass"

class SocialShare extends React.Component {
  onClick (event) {
    const {url} = event.currentTarget.dataset

    window.open(url, "_blank")
  }

  render () {
    const {items, store, jsonReplacer} = this.props

    return (
      <div className="social-share-wrapper flex">
        {
          items.map((item, i) => {
            const {name, url} = item

            return (
              <div 
                data-url={jsonReplacer(url, store)}
                className="flex" 
                key={i} 
                onClick={::this.onClick}>
                <div className={`icon ${name}`}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

SocialShare.propTypes = {
  jsonReplacer: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  store: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default SocialShare