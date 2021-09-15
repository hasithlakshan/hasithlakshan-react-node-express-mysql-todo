// import logo from "./logo.svg"
import "antd/dist/antd.css"
import React from "react"
import Routes from "../src/routes/Routes"
import { BrowserRouter as Router } from "react-router-dom"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import store from "./reducers"
import history from "./services/history"
function App () {
  return (
      <Provider store={store}>
          <Router history={history}>
              <Routes />
          </Router>
      </Provider>
  )
}

export default App
App.propTypes = {
  xx: PropTypes.bool
}
