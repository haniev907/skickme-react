import {connect} from "react-redux"
import Services from "services"
import * as actions from "ducks/user"

import Preloader from "../Common/Preloader"
import Info from "./Info"
import LinkList from "./LinkList"
import Header from "./Header"
import BurgerMenu from "./BurgerMenu"

import "./Index.sass"

@connect(store => {
  return {store: store.user}
})

class User extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
  }

  getChildContext () {
    const {dispatch} = this.props

    return {dispatch, actions}
  }

  componentWillMount () {
    this.props.dispatch(
      actions.getState(
        Services.request, 
        this.context.router.history, 
        this.isIm(),
        this.emitAnalytics.bind(this)
      )
    )
  }

  componentDidUpdate () {
    const {router} = this.context
    const {loading} = this.props.store
    const {isTour, debug, debuggers} = Services

    if (this.isIm() && !loading && isTour("/share")) {
      const {USER_PAGE_TOUR_MESSAGE} = debuggers

      debug("info", USER_PAGE_TOUR_MESSAGE, 5, ok => {
        router.history.push("/share")
      })
    }
  }

  emitAnalytics (type, linkId) {
    const {isUserLimitToAnalytics} = Services.analytics
    const {id, auth, username} = this.props.store

    !this.isMyPage() 
      && !isUserLimitToAnalytics(username, type, linkId) 
        && Services.request({
          method: "PUT",
          url: "/analytics",
          data: {type, auth, id}
        })
  }

  isIm () {
    return location.pathname == "/im" ? true : false
  }

  isMyPage () {
    const {store} = this.props
    const id = Services.getCookie("id")

    return this.isIm() || id == store.id
  }

  onRemove (id) {
    Services.request({
      method: "DELETE",
      url: "/remove/" + id
    })
  }

  onMenuOpen () {
    this.props.dispatch(actions.toggleBurgerMenu(true))
  }

  onClick (url, id) {
    !this.isMyPage() && this.emitAnalytics("click", id)
  }

  render () {
    const isIm = this.isIm()
    const {store} = this.props

    const {
      linkConfigure, 
      getDictionary,
      jsonReplacer,
      getCookie
    } = Services
    
    const [
      {
        info, 
        empty, 
        languages, 
        menu
      }, 
      links
    ] = getDictionary(["user", "links"])

    return store.loading
    ? <Preloader/>
    : [
        <BurgerMenu 
          key="burger-menu"
          pageWrapId="user-page-container"
          outerContainerId="root"
          store={store}
          jsonReplacer={jsonReplacer}
          menu={menu}
        />,
        <div 
          className="container" 
          id="user-page-container" 
          key="user-page-container">
          <div className="user-page flex">
            <Header
              isIm={isIm}
              languages={languages}
              getLanguage={Services.language}
              onMenuOpen={::this.onMenuOpen}
            />
            <Info 
              store={store} 
              view={info}
              isIm={isIm}
              getCookie={getCookie}
            />
            <LinkList
              view={{links, empty}}
              store={store}
              linkConfigure={linkConfigure}
              isIm={isIm}
              onRemove={::this.onRemove}
              onClick={::this.onClick}
            />
          </div>
        </div>
      ]
  }
}

export default User