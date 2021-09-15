import React, {memo, useMemo, useState} from "react"
import {Row, Col, Button, Modal} from "antd"
import "./ListItems.stylesheet.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"
import Cookies from "js-cookie";

const ListItem = memo(({ name, state, id=1, getToUpdate, deleteTask }) => {
    const [deletePopupVisible, setDeletePopupVisible] = useState(false)
  const checkBackgroundColor = useMemo(() => {
    if (state === "Todo") {
      return {
        color: "#404040", border: "1px solid #404040"
      }
    } else if (state === "In Progress") {
      return {
          color: "#ffcc00", border: "1px solid #ffcc00"
      }
    } else {
      return {
          color: "#1f7a1f", border: "1px solid #1f7a1f"
      }
    }
  }, [state])

  return (
        <Row className="item-container">
            <Col span={2} className="item-container__id">{id}</Col>
            <Col span={12} className="item-container__name">{name}</Col>
            <Col span={6} className="item-container__status">
                 <span className="item-container__status__name" style={checkBackgroundColor} >{state}</span>
            </Col>
            <Col span={2} className="item-container__edit">
                <span className="item-container__edit__wrapper" onClick={()=>{getToUpdate(id, state, name)}}><FontAwesomeIcon className="item-container__edit__wrapper__icon" size="1x" icon={faPencilAlt}/></span>
            </Col>
            <Col span={2} className="item-container__remove">
                <span className="item-container__remove__wrapper" onClick={()=>setDeletePopupVisible(true)}><FontAwesomeIcon className="item-container__remove__wrapper__icon" size="1x" icon={faTrashAlt}/></span>
            </Col>
            <Modal
                title="Delete"
                centered
                visible={deletePopupVisible}
                onOk={() => setDeletePopupVisible(false)}
                onCancel={() => setDeletePopupVisible(false)}
                width={500}
                footer={[
                    <Button key="back" onClick={() => setDeletePopupVisible(false)}>
                        NO
                    </Button>,
                    <Button key="submit" type="primary" onClick={()=> {
                        deleteTask(id)
                        setDeletePopupVisible(false)
                    }} >
                        YES
                    </Button>
                ]}
            >
                Are you sure want to delete ?
            </Modal>
        </Row>
  )
})

export default ListItem

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
}
