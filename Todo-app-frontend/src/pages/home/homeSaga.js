import {call, put} from "redux-saga/effects"
import Cookies from "js-cookie"
import * as homePageActions from "./home.actions"
import managementService from "../../services/management.service"

function * getTasksSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.getTasks, { token: token });
    if(tasks.code===200){
      yield put(homePageActions.getTask(tasks.payload))
    }else{
      yield put(homePageActions.getTaskFailure())
    }
  } catch (e) {
    yield put(homePageActions.getTaskFailure())
  }
}

function * addTaskSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.addTasks, { task:action.taskObject, token: token });
    if(tasks.code===200){
      yield put(homePageActions.addTask(tasks.payload[0]))
    }else{
      yield put(homePageActions.addTaskFailure())
    }
  } catch (e) {
    yield put(homePageActions.addTaskFailure())
  }
}

function * updateTaskSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.updateTasks, { taskId:action.taskObject.taskId, task:action.taskObject, token: token });
    if(tasks.code===200){
      yield put(homePageActions.updateTaskSuccess(tasks.payload[0]))
    }else{
      yield put(homePageActions.updateTaskFailure())
    }
  } catch (e) {
    yield put(homePageActions.updateTaskFailure())
  }
}

function * deleteTaskSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.deleteTasks, { taskId:action.id, token: token });
    if(tasks.code===200){
      yield put(homePageActions.deleteTaskSuccess(action.id))
    }else{
      yield put(homePageActions.deleteTaskFailure())
    }
  } catch (e) {
    yield put(homePageActions.deleteTaskFailure())
  }
}

export {
  addTaskSaga,
  getTasksSaga,
  updateTaskSaga,
  deleteTaskSaga
}
