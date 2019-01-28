import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import ducks from "ducks"
import globalDispatching from "./GlobalDispatching"

const store = createStore(
  ducks, 
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(ok => globalDispatching(store))

module.hot &&
  module.hot.accept("ducks", () => {
    const newDucks = require("ducks").default
    store.replaceReducer(newDucks)
  })

export default store
