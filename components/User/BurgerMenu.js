import {scaleDown as Menu} from "react-burger-menu"
import GoBack from "../Common/GoBack"

import "./BurgerMenu.sass"

const BurgerMenuHeader = props => {
  return (
    <div className="header flex">
      <div className="logo"/>
      <GoBack onGoBack={props.onClose}/>
    </div>
  )
}

class BurgerMenu extends React.Component {
  getIcon (name) {
    return `url(${__PUBLIC_PATH__}${name}.svg)`
  }

  onRoute (event) {
    const {history} = this.context.router
    const {to, bynative} = event.currentTarget.dataset

    bynative == "true"
    ? location.href = to
    : history.push(to)

    this.onClose()
  }

  toggleMenu (isOpen) {
    const {dispatch, actions} = this.context

    dispatch(actions.toggleBurgerMenu(isOpen))
  }

  onClose () {
    this.overflowOuterContainer(false)
    this.toggleMenu(false)
  }

  onStateChange({isOpen}) {
    const {isOpenBurgerMenu} = this.props.store

    this.overflowOuterContainer(isOpen)
    isOpenBurgerMenu != isOpen && this.toggleMenu(isOpen)
  }

  overflowOuterContainer (isOpen) { 
    document.getElementById(this.props.outerContainerId)
      .style.overflowY = isOpen ? "hidden" : "visible"
  }

  render () {
    const {
      pageWrapId, 
      outerContainerId,
      menu,
      jsonReplacer,
      store
    } = this.props

    return (
      <Menu
        className="burger-menu"
        overlayClassName="burger-overlay"
        width={280}
        pageWrapId={pageWrapId} 
        isOpen={store.isOpenBurgerMenu}
        onStateChange={::this.onStateChange}
        outerContainerId={outerContainerId}>
        <BurgerMenuHeader onClose={::this.onClose}/>
        <div className="nav">
          {
            menu.map((item, i) => {
              const {to, text, byNative=false} = item
              const url = jsonReplacer(to, store)
              
              const icon = {
                backgroundImage: this.getIcon(item.icon)
              }

              return (
                <div 
                  data-to={url}
                  data-bynative={byNative}
                  onClick={::this.onRoute}
                  className="nav-item flex" 
                  key={i}>
                  <div className="icon" style={icon}/>
                  <div className="text">{text}</div>
                </div>
              )
            })
          }
        </div>
      </Menu>
    )
  }
}

BurgerMenu.contextTypes = {
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    toggleBurgerMenu: PropTypes.func.isRequired
  }).isRequired
}

BurgerMenu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  jsonReplacer: PropTypes.func.isRequired,

  store: PropTypes.shape({
    username: PropTypes.string.isRequired,
    isOpenBurgerMenu: PropTypes.bool.isRequired
  }).isRequired,
  
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      byNative: PropTypes.bool
    }).isRequired
  ).isRequired
}

export default BurgerMenu