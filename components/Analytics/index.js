import {connect} from "react-redux"
import Services from "services"

import * as actions from "ducks/analytics"
import GoBack from "../Common/GoBack"
import LineChart from "./LineChart"
import Stager from "./Stager"
import TextChart from "./TextChart"

import "./Index.sass"

@connect(store => {
  return {store: store.analytics}
})

class Analytics extends React.Component {
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
    const {dispatch} = this.props
    const {request} = Services
    const {router} = this.context

    dispatch(actions.getAnalytics(request, router)) 
  }

  render () {
    const {store} = this.props
    const view = Services.getDictionary("analytics")

    return store.loading ? null : (
      <div className="container">
        <div className="analytics-page flex">
          <div className="row flex">
            <GoBack to="/im"/>
            <div className="analytics-wrapper">
              <Stager
                store={store}
                view={view}
              />
              <LineChart 
                store={store} 
                view={view}
                normalizeData={Services.analytics.normalizeData}
              />
              <TextChart
                store={store}
                view={view}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Analytics