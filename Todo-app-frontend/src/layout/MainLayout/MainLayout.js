import React, { PureComponent } from "react"
import { Layout } from "antd"
import PropTypes from "prop-types"

class MainLayout extends PureComponent {
  render () {
    return (
            <Layout style={{ minHeight: "100vh" }} className="app-layout">
                { this.props.children }
            </Layout>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.any
}

export default MainLayout
