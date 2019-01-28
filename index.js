import ReactDOM from "react-dom"
import {AppContainer} from "react-hot-loader"
import Router from "./Router"
import Services from "services"
import elementDataset from "element-dataset"

import "styles/Index.sass"

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById("root")
  )
}

// Check auth before render
Services.checkAuth()

// Set dataset polyfill
elementDataset()

// Render application
render(Router)

// Hot Module Replacement API
module.hot &&
  module.hot.accept("./Router", () => {
    const NewRouter = require("./Router").default
    render(NewRouter)
  })

// Load all icons to static folder
require.context("./images", true)