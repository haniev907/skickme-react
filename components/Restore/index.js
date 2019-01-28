import {connect} from "react-redux"
import Services from "services"

import * as actions from "ducks/restore"

import Form from "../Common/Form"
import FormMore from "../Common/FormMore"
import SocialAuth from "../Common/SocialAuth"

import "./Index.sass"

@connect(store => {
  return {store: store.restore}
})

class Restore extends React.Component {
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

  onSubmit (event) {
    const {email} = this.props.store.fields
    
    Services
      .validate({email}, "fields")
      .then(data => {
        Services.request({
          method: "POST",
          url: "/restore",
          data
        }, success => {
          const {RESTORE_EMAIL_SENDED} = Services.debuggers
          Services.debug("info", RESTORE_EMAIL_SENDED)
        })
      })
  }

  render () {
    const {
      form,
      more, 
      socialAuth
    } = Services.getDictionary("restore")
    
    const {title, fields, button} = form
    const {store, dispatch} = this.props

    return (
      <div className="container flex">
        <div className="row restore-page flex">
          <div className="content">
            <SocialAuth 
              auth={socialAuth}
              oAuth={Services.oAuth}
            />
            <Form
              store={store}
              title={title}
              fields={fields}
              button={button}
              onSubmit={::this.onSubmit}
            />
            <FormMore items={more}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Restore