import {connect} from "react-redux"
import * as actions from "ducks/share"
import Services from "services"

import Preloader from "../Common/Preloader"
import GoBack from "../Common/GoBack"
import ShareSide from "./ShareSide"
import QRCodeSide from "./QRCodeSide"

import "./Index.sass"

@connect(store => {
  return {store: store.share}
})

class Share extends React.Component {
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
      )
    )
  }

  render () {
    const {store} = this.props
    const {debuggers, debug} = Services
    const {jsonReplacer, getDictionary} = Services
    const {shareSide, qrCodeSide} = getDictionary("share")

    return store.loading
    ? <Preloader/>
    : <div className="container flex">
        <div className="share-page flex row">
          <GoBack/>
          <ShareSide 
            jsonReplacer={jsonReplacer}
            view={shareSide} 
            store={store} 
            debuggers={debuggers} 
            debug={debug}
          />
          <QRCodeSide 
            view={qrCodeSide} 
            store={store}
          />
        </div>
      </div>
  }
}

export default Share