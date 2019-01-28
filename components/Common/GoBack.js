import "./GoBack.sass"

class GoBack extends React.Component {
  goBack () {
    const {to, onGoBack, reloadTo} = this.props
    const {history} = this.context.router

    if (reloadTo) {
      location.href = reloadTo
      return
    }
    
    onGoBack 
    ? onGoBack(history) 
    : to 
      ? history.push(to) 
      : history.goBack()
  }

  render () {
    return (
      <div className="go-back" onClick={::this.goBack}>
        <div className="icon"/>
      </div>
    )
  }
}

GoBack.contextTypes = {
  router: PropTypes.object.isRequired
}

GoBack.propTypes = {
  to: PropTypes.string,
  onGoBack: PropTypes.func,
  reloadTo: PropTypes.string
}

export default GoBack
