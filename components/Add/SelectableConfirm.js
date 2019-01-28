import "./SelectableConfirm.sass"

class SelectableConfirm extends React.Component {
  onCancel () {
    const {dispatch, actions} = this.context
    dispatch(actions.clearSelectedLinks())
  }

  onApply () {
    const {dispatch, actions} = this.context
    dispatch(actions.setStage("addable"))
  }

  render () {
    const {count, className} = this.props

    return (
      <div className={`selectable-confirm-wrapper flex ${className}`}>
        <div className="selectable-confirm flex">
          <div 
            className="cancel" 
            onClick={::this.onCancel}
          />
          <div className="count">{!count ? "" : count}</div>
          <div 
            className="apply"
            onClick={::this.onApply}
          />
        </div>
      </div>
    )
  }
}

SelectableConfirm.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    clearSelectedLinks: PropTypes.func.isRequired,
    setStage: PropTypes.func.isRequired
  }).isRequired
}

SelectableConfirm.propTypes = {
  className: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default SelectableConfirm