import {connect} from "react-redux"
import Services from "services"

import * as actions from "ducks/profile"

import Avatar from "./Avatar"
import Accordion from "./Accordion"
import Form from "../Common/Form"
import GoBack from "../Common/GoBack"
import Preloader from "../Common/Preloader"

import "./Index.sass"

@connect(store => {
  return {store: store.profile}
})

class Profile extends React.Component {
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
    const {isTour} = Services
    const {history} = this.context.router
    
    this.props.dispatch(
      actions.getState(Services.request, history, isTour)
    )
  }

  componentDidUpdate (prevProps, prevState) {
    const {loading} = this.props.store
    const {debug, debuggers, isTour} = Services
    const {PROFILE_PAGE_TOUR_MESSAGE} = debuggers

    if (!loading && isTour("$/profile")) 
      debug("info", PROFILE_PAGE_TOUR_MESSAGE)
  }

  onUploadAvatar (avatar) { 
    const {dispatch} = this.props

    Services.request({
      method: "PUT",
      url: "/upload",
      data: {avatar}
    }, success => {
      // Global dispatch
      dispatch({
        type: "GLOBAL_DISPATCHING_PROFILE_FIELDS",
        fields: {avatar}
      })
    })
  }

  onSubmit (fields) {
    const {isTour} = Services
    const {dispatch} = this.props
    const {history} = this.context.router
    const {isAvatarEditor} = this.props.store.avatar

    if (isAvatarEditor)
      this.refs.avatar.refs.avatarDone.click()

    // Run tour
    isTour("/im")

    const options = {
      method: "PUT",
      url: "/profile",
      successRedirect: "/im",
      data: fields, 
      history
    }

    Services.validate(fields, "editorFields")
      .then(fields => {
        Services.request(options, response => {
          // Update readOnly email value
          if (fields.email)
            fields.myEmail = fields.email

          // Global dispatch
          dispatch({
            type: "GLOBAL_DISPATCHING_PROFILE_FIELDS",
            fields
          })

          // Reset email and password fields
          dispatch(actions.resetEmailAndPassword())

          const {PROFILE_EDIT_SUCCESS} = Services.debuggers
          Services.debug("success", PROFILE_EDIT_SUCCESS)
        })
      })
  }

  normalizeAccordionData (auth, data) {
    const {isTour} = Services

    if (auth != "native") {
      data[0].fields = data[0].fields.filter(field => {
        return field.name != "myEmail"
      })
      
      return [data[0], data[data.length - 1]]
    }

    return isTour("/im", true) ? data.slice(0, -1) : data
  }

  render () {
    const {getDictionary, getCookie, isTour} = Services
    const {form} = getDictionary("profile")
    const {accordion, title, button} = form
    const {store} = this.props
    const auth = getCookie("auth")

    return store.loading
      ? <Preloader/>
      : <div className="container flex">
          <div className="row profile-page flex">
            {
              isTour("/im", true) ? null : <GoBack to="/im"/>
            }
            <Form 
              store={store}
              title={title}
              button={button}
              onSubmit={::this.onSubmit}
              accordion={{
                Component: Accordion,
                data: this.normalizeAccordionData(auth, accordion)
              }}
              avatar={
                <Avatar
                  store={store}
                  ref="avatar"
                  validate={Services.validate}
                  onUploadAvatar={::this.onUploadAvatar}
                />
              }
            />
          </div>
        </div>
  }
}

export default Profile