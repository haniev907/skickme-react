import {Switch, Route, BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"

import Async from "components/Common/AsyncPage"
import Debug from "components/Common/Debug"
import NotFound from "components/NotFound"
import Catch from "./Catch"
import Store from "./Store"

// Import dynamic components
const Signin    = Async(ok => import("components/Signin"), ["signin"])
const Signup    = Async(ok => import("components/Signup"), ["signup"])
const Restore   = Async(ok => import("components/Restore"), ["restore"])
const Profile   = Async(ok => import("components/Profile"), ["profile"])
const Add       = Async(ok => import("components/Add"), ["add", "links"])
const User      = Async(ok => import("components/User"), ["user", "links"])
const Analytics = Async(ok => import("components/Analytics"), ["analytics"])
const Index     = Async(ok => import("components/Index"), ["index"])
const PrivacyRu = Async(ok => import("components/Privacy/Index-ru"))
const PrivacyEn = Async(ok => import("components/Privacy/Index-en"))
const Share     = Async(ok => import("components/Share"), ["share"])

const Router = props => {
  return [
    <Debug key="debug"/>,
    <Catch key="application">
      <Provider store={Store} key={Math.random()}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"                    component={Index}/>
            <Route exact path="/privacy/ru"          component={PrivacyRu}/>
            <Route exact path="/privacy/en"          component={PrivacyEn}/>
            <Route exact path="/signin"              component={Signin}/>
            <Route exact path="/signup"              component={Signup}/>
            <Route exact path="/restore"             component={Restore}/>
            <Route exact path="/profile"             component={Profile}/>
            <Route exact path="/add"                 component={Add}/>
            <Route exact path="/im"                  component={User}/>
            <Route exact path="/analytics/:username" component={Analytics}/>
            <Route exact path="/404"                 component={NotFound}/>
            <Route exact path="/share"               component={Share}/>
            <Route exact path="/:username"           component={User}/>
            <Route                                   component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </Catch>
  ]
}

export default Router