import AddableLink from "./AddableLink"
import AddableButton from "./AddableButton"

import "./Addable.sass"

class Addable extends React.Component {
  componentDidUpdate () {
    const {length} = this.props.store.selectedLinks
    const {dispatch, actions} = this.context

    length
    ? null
    : dispatch(actions.setStage("selectable"))
  }

  render () {
    const {
      button, 
      store, 
      debug, 
      debuggers, 
      onAddLinks
    } = this.props

    return (
      <div className="addable-wrapper">
        {
          store.selectedLinks.map((link, i) => {
            return <AddableLink
              key={i}
              link={link}
            />
          })
        }
        <AddableButton 
          text={button} 
          store={store}
          debug={debug}
          debuggers={debuggers}
          onAddLinks={onAddLinks}
        />
      </div>
    )
  }
}

Addable.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setStage: PropTypes.func.isRequired
  }).isRequired
}

Addable.propTypes = {
  store: PropTypes.shape({
    selectedLinks: PropTypes.array.isRequired
  }).isRequired,

  button: PropTypes.string.isRequired,
  debug: PropTypes.func.isRequired,
  debuggers: PropTypes.object.isRequired,
  onAddLinks: PropTypes.func.isRequired
}

export default Addable