import {connect} from "react-redux"
import Services from "services"

import * as actions from "ducks/signin"

import Form from "../Common/Form"
import FormMore from "../Common/FormMore"
import SocialAuth from "../Common/SocialAuth"

import "./Index.sass"

@connect(store => {
  return {store: store.signin}
})

class Signin extends React.Component {
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

  onSubmit (fields) {
    const {history} = this.context.router

    const options = {
      method: "POST",
      url: "/signin",
      successRedirect: "/im",
      data: fields,
      history
    }

    Services
      .validate(fields, "fields", 7)
      .then(fields => Services.request(options))
  }

  render () {
    const {
      form,
      more, 
      socialAuth
    } = Services.getDictionary("signin")

    const {title, fields, button} = form
    const {store, dispatch} = this.props

    return (
      <div className="container flex">
        <div className="row signin-page flex">
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

export default Signin