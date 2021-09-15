import React, { useCallback, useEffect, useState } from "react"
import { ListItem, Loading, TextInput } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import {Button, Checkbox, Col, Layout, Modal, Row} from "antd"
import "./home.stylesheet.sass"
import { actions as homeActions } from "./index"
import validator from "../../utils/validator"

export default function Home () {
  // states
  const [visible, setVisible] = useState(false)
  const [visibleToUpdate, setVisibleToUpdate] = useState(false)

  const [checkedTodo, setTodo] = useState(true)
  const [checkedInp, setInp] = useState(false)
  const [checkedComplete, setComplete] = useState(false)

  const [task, setTask] = useState("")
  const [taskId, setTaskId] = useState("")
  const [checkedValue, setCheckedValue] = useState("Todo")
  const [taskError, setTaskError] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const [searchArray, setSearchArray] = useState([])

  //redux
  const { isLoading } = useSelector((state) => state.login)
  const { tasks, isGetTaskInitialLoading,isGetTaskLoading } = useSelector((state) => state.home)

  const dispatch = useDispatch()

  // functions addToList
  function addToList () {
    const taskItem = {
      TaskName: task,
      Status: checkedValue
    }
    const errorTask = validator("homeTask", task)
    setTaskError(errorTask)
    if (!errorTask) {
      dispatch((homeActions.addTaskREQUEST(taskItem)))
      setVisible(false)
      setVisibleToUpdate(false)
    }
  }

  // functions deleteTask getToUpdate
  function getToUpdate (id, state, name) {
    setTaskId(id)
    setTask(name)
    setVisibleToUpdate(true)
    if (state === "Todo") {
      setTodo(true)
      setInp(false)
      setComplete(false)
    } else if (state === "In Progress") {
      setTodo(false)
      setInp(true)
      setComplete(false)

    } else {
      setTodo(false)
      setInp(false)
      setComplete(true)
    }
    setCheckedValue(state)
  }

  // functions updateToList
  function updateToList () {
    const taskItem = {
      taskId: taskId,
      Status: checkedValue
    }
    const errorTask = validator("homeTask", task)
    setTaskError(errorTask)
    if (!errorTask) {
      dispatch((homeActions.updateTaskRequest(taskItem)))
      setVisible(false)
      setVisibleToUpdate(false)
    }
  }

  // functions deleteTask
  function deleteTask (id) {
      dispatch((homeActions.deleteTaskRequest(id)))
    }

  function cleanState () {
    setTodo(true)
    setInp(false)
    setComplete(false)
    setCheckedValue("Todo")
    setTask("")
  }

  useEffect(() => {
    // if(isGetTaskInitialLoading && !isGetTaskLoading){
      dispatch((homeActions.getTaskREQUEST()))
    // }
  }, [task])

  useEffect(() => {
    if (searchWord) {
      const searchTask = tasks.filter(task => {
        const nameSliceArray = task.TaskName.toLowerCase().match(searchWord.toLowerCase())
        return nameSliceArray
      })
      setSearchArray(searchTask)
    }
  }, [searchWord])

  const onChange = useCallback(e => {
    if (e.target.value === "todo") {
      setTodo(true)
      setInp(false)
      setComplete(false)
      setCheckedValue("Todo")
    } else if (e.target.value === "inp") {
      setTodo(false)
      setInp(true)
      setComplete(false)
      setCheckedValue("In Progress")
    } else {
      setTodo(false)
      setInp(false)
      setComplete(true)
      setCheckedValue("Complete")
    }
  }, [])

  useEffect(() => {
    if (task) {
      const errorTask = validator("homeTask", task)
      setTaskError(errorTask)
    }
  }, [task])

  return isLoading
    ? <Loading />
    : <Layout className="home-container">
        <Row className="home-container__title-wrapper">
          <div className="home-container__title-wrapper__title">
            Task List
          </div>
        </Row>
        <Row className="home-container__content-wrapper">
          <Row className="home-container__content-wrapper__header-wrapper">
            <TextInput inputClassname="home-container__content-wrapper__header-wrapper__search" placeholder="search task" onChange={setSearchWord} />
            <Button onClick={() => {
              setVisible(true)
              cleanState()
            }} className="home-container__content-wrapper__header-wrapper__button">
              AddTask
            </Button>
            {/*<div className="home-container__content-wrapper__header-wrapper__text">priority</div>*/}
          </Row>
            <Row className="home-container__content-wrapper__header-wrapper">
              <Col span={2} className="home-container__content-wrapper__header-wrapper__text">#</Col>
              <Col span={12} className="home-container__content-wrapper__header-wrapper__text">Task Name</Col>
              <Col span={6} className="home-container__content-wrapper__header-wrapper__text">Status</Col>
              <Col span={2} className="home-container__content-wrapper__header-wrapper__text">Edit</Col>
              <Col span={2} className="home-container__content-wrapper__header-wrapper__text">Remove</Col>
            </Row>
          {
            searchWord
              ? searchArray.map(task => <ListItem key={task.TaskID} id={task.TaskID} name={task.TaskName} state={task.Status} getToUpdate={getToUpdate} deleteTask={deleteTask} />)
              : tasks.map(task => <ListItem key={task.TaskID} id={task.TaskID} name={task.TaskName} state={task.Status} getToUpdate={getToUpdate} deleteTask={deleteTask} />)
          }
        </Row>
        <Modal
            title={visibleToUpdate? "Update Task" : "Add Task"}
            centered
            visible={visible||visibleToUpdate}
            onOk={() => {
              setVisible(false)
              setVisibleToUpdate(false)
            }}
            onCancel={() => {
              setVisible(false)
              setVisibleToUpdate(false)
            }}
            width={500}
            footer={[
              <Button key="back" onClick={() => {
                setVisible(false)
                setVisibleToUpdate(false)
              }}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={visibleToUpdate ? updateToList : addToList} >
                {visibleToUpdate ? "Update" : "Add to list"}
              </Button>
            ]}
        >
          <TextInput disabled={visibleToUpdate} containerClassName="pop-up" isInvalid={taskError} label={"Please enter the task name"} errorMsg={taskError} required onChange={setTask} value={task}/>
          <Checkbox value="todo" checked={checkedTodo} onChange={onChange}>Todo</Checkbox>
          <Checkbox value="inp" checked={checkedInp} onChange={onChange}>In Progress</Checkbox>
          <Checkbox value="complete" checked={checkedComplete} onChange={onChange}>Complete</Checkbox>
        </Modal>
      </Layout>
}
