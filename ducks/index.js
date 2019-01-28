import {combineReducers} from "redux"
import signin from "./signin"
import signup from "./signup"
import restore from "./restore"
import profile from "./profile"
import add from "./add"
import user from "./user"
import share from "./share"
import analytics from "./analytics"

export default combineReducers({
  action: (state, action) => action,
  signin,
  signup,
  restore,
  profile,
  add,
  user,
  share,
  analytics
})