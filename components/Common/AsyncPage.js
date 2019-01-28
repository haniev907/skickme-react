import Services from "services"
import Preloader from "./Preloader"

export default (getComponent, dictionary=[]) => {
  class AsyncPage extends React.Component {
    state = { 
      Component: null
    }

    hideMainPreloader () {
      document
        .querySelector(".main-preloader")
        .classList
        .add("hide")
    }

    setComponent (Component) {
      this.setState({
        Component: Component.default
      })
    }

    componentWillMount () {
      this.hideMainPreloader()
      this.setComponent = this.setComponent.bind(this)

      if (!this.state.Component) {
        dictionary.length
        ? Services
            .dictionary(dictionary)
            .then(getComponent)
            .then(this.setComponent)
        : getComponent()
            .then(this.setComponent)
      }
    }

    render () {
      const {Component} = this.state

      return Component 
        ? <Component {...this.props}/> 
        : <Preloader/>
    }
  }

  return AsyncPage
}