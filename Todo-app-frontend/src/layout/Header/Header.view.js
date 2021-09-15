import React, { memo } from "react"
import "./header.stylesheet.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars, faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons"
import { Button, Modal } from "antd"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
const HeaderView = memo(({ visible, setVisible, logOut, user }) => (
    <div className="mainContainer">
        <div className="mainContainer__bars">
            <FontAwesomeIcon className="mainContainer__bars__icon" size="2x" icon={faBars} />
        </div>
        <div className="mainContainer__content">My Tasks</div>
        <div className="mainContainer__profile">
            <FontAwesomeIcon className="mainContainer__sign-out__icon" size="2x" icon={faUserCircle}  />
            <label className="mainContainer__profile__name">{user.FirstName}</label>
        </div>
        <div className="mainContainer__sign-out">
            <FontAwesomeIcon className="mainContainer__sign-out__icon" size="2x" icon={faSignOutAlt} onClick={() => {
              setVisible(true)
            }} />
        </div>
        <Modal
            title="Logout"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={500}
            footer={[
                <Button key="back" onClick={() => setVisible(false)}>
                    NO
                </Button>,
                <Button key="submit" type="primary" onClick={()=> {
                    logOut()
                    setVisible(false)
                    Cookies.remove("auth")
                }} >
                    YES
                </Button>
            ]}
        >
            Are you sure want to logout ?
        </Modal>
    </div>
))

export default HeaderView

HeaderView.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
}
