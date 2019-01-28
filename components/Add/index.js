import {connect} from "react-redux"
import Services from "services"

import * as actions from "ducks/add"

import GoBack from "../Common/GoBack"
import Selectable from "./Selectable"
import Addable from "./Addable"

import "./Index.sass"

@connect(store => {
  return {store: store.add}
})

class Add extends React.Component {
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

  onGoBack (history) {
    const {dispatch, store} = this.props
    const links = Services.getDictionary("links")

    store.stage == "addable"
    ? dispatch(actions.setStage("selectable"))
    : links.length > store.filteredLinks.length
      ? dispatch(actions.setFilteredLinks(links))
      : history.push("/im")
  }

  onAddLinks (links) {
    const {isTour} = Services
    const {dispatch} = this.props
    const {history} = this.context.router

    const options = {
      method: "PUT",
      url: "/add",
      data: {links},
      successRedirect: isTour("/profile") ? "/profile" : "/im",
      history
    }

    Services.request(options, response => {
      dispatch({
        type: "GLOBAL_DISPATCHING_LINKS",
        links: links.map((link, i) => {
          return {
            ...link, 
            id: response.ids[i]
          }
        })
      })

      this.props.dispatch(actions.clearSelectedLinks())
    })
  }

  render () {
    const {store} = this.props

    const {
      mapArrayByCategories,
      debug,
      isTour,
      debuggers
    } = Services
    
    const [
      {searchable, addable},
      links
    ] = Services.getDictionary(["add", "links"])

    return (
      <div className="container">
        <div className="add-page flex">
          <div className="row flex">
            {
              isTour("/profile", true) ? null : <GoBack 
                onGoBack={::this.onGoBack}
              />
            }
            {
              store.stage == "selectable"
              ? <Selectable 
                  view={{links, searchable}}
                  store={store}
                  mapArrayByCategories={mapArrayByCategories}
                />
              : <Addable 
                  store={store}
                  button={addable}
                  debug={debug}
                  debuggers={debuggers}
                  onAddLinks={::this.onAddLinks}
                />
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const {isTour, debug, debuggers} = Services
    const {ADD_PAGE_TOUR_MESSAGE} = debuggers

    isTour("/add") 
    ? debug("info", ADD_PAGE_TOUR_MESSAGE)
    : null
  }
}

export default Add