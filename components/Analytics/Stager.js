import "./Stager.sass"

class Stager extends React.Component {
  onClick (event) {
    const {stage} = event.currentTarget.dataset
    const {dispatch, actions} = this.context

    dispatch(actions.setStage(stage))
  }

  render () {
    const {store, view} = this.props
    const {stage, data} = store

    return !data.dates.length ? null : (
      <div className="analytics-stager-wrapper flex">
        {
          view.stager.map((item, i) => {
            const className = item.stage == stage 
              ? "active" : ""

            return <div 
              className={className} 
              key={i} 
              onClick={::this.onClick}
              data-stage={item.stage}>
              {item.text}
            </div>
          })
        }
      </div>
    )
  }
}

Stager.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setStage: PropTypes.func.isRequired
  }).isRequired
}

Stager.propTypes = {
  store: PropTypes.shape({
    stage: PropTypes.string.isRequired,
    data: PropTypes.shape({
      dates: PropTypes.array
    }).isRequired
  }).isRequired,
  view: PropTypes.shape({
    stager: PropTypes.arrayOf(
      PropTypes.shape({
        stage: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
}

export default Stager