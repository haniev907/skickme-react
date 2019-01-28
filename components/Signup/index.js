import {connect} from "react-redux"
import Services from "services"

import * as actions from "ducks/signup"

import Form from "../Common/Form"
import FormMore from "../Common/FormMore"
import SocialAuth from "../Common/SocialAuth"
import Legal from "./Legal"

import "./Index.sass"

@connect(store => {
  return {store: store.signup}
})

class Signup extends React.Component {
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
      url: "/signup",
      successRedirect: "/add",
      data: fields,
      history
    }

    Services
      .validate(fields, "fields", 7)
      .then(fields => {
        Services.request(options, ok => {
          localStorage.setItem("sk-newUser", "yes")
        })
      })
  }

  render () {
    const {
      form, 
      more, 
      socialAuth, 
      legal
    } = Services.getDictionary("signup")
    
    const {title, fields, button} = form
    const {store, dispatch} = this.props

    return (
      <div className="container flex">
        <div className="row signup-page flex">
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
              legal={
                <Legal legal={legal}/>
              }
            />
            <FormMore items={more}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup