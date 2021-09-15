import React, { PureComponent } from "react"
import HeaderView from "./Header.view"
import { actions as loginPageActions } from "../../pages/login"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class Header extends PureComponent {
  constructor () {
    super()
    this.state = {
      visible: false
    }
    this.setVisible = this.setVisible.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  setVisible (value) {
    this.setState({
      visible: value
    })
  }

  logOut () {
    const { logOutAction } = this.props
    logOutAction()
  }

  get generateProps () {
    const { visible } = this.state
    const { user } = this.props
    return {
      setVisible: this.setVisible,
      visible: visible,
      logOut: this.logOut,
      user: user
    }
  }

  render () {
    return (
            <HeaderView {...this.generateProps} />
    )
  }
}
const mapStateToProps = ({login: {user}}) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  logOutAction: () => dispatch(loginPageActions.logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

Header.propTypes = {
  logOutAction: PropTypes.func.isRequired
}
