import Services from "./services"

class Catch extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  componentDidCatch (error) {
    Services.debug("error", error.message)
  }

  render () {
    return this.props.children
  }
}

export default Catch

