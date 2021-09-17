import {call, put} from "redux-saga/effects"
import Cookies from "js-cookie"
import * as homePageActions from "./home.actions"
import managementService from "../../services/management.service"
import {notification} from "antd";

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
      notification.open({
        message: 'Task',
        description:
            'Successfully Added the Task '
      });
      yield put(homePageActions.addTask(tasks.payload[0]))
    }else{
      notification.open({
        message: 'Task',
        description:
            'Failure to add task'
      });
      yield put(homePageActions.addTaskFailure())
    }
  } catch (e) {
    notification.open({
      message: 'Task',
      description:
          'Failure to add task'
    });
    yield put(homePageActions.addTaskFailure())
  }
}

function * updateTaskSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.updateTasks, { taskId:action.taskObject.taskId, task:action.taskObject, token: token });
    if(tasks.code===200){
      notification.open({
        message: 'Task',
        description:
            'Successfully updated the Task '
      });
      yield put(homePageActions.updateTaskSuccess(tasks.payload[0]))
    }else{
      notification.open({
        message: 'Task',
        description:
            'Failure to update the task '
      });
      yield put(homePageActions.updateTaskFailure())
    }
  } catch (e) {
    notification.open({
      message: 'Task',
      description:
          'Failure to update the task '
    });
    yield put(homePageActions.updateTaskFailure())
  }
}

function * deleteTaskSaga (action) {
  try {
    let token = ""
    token = Cookies.get("auth")
    const tasks = yield call(managementService.deleteTasks, { taskId:action.id, token: token });
    if(tasks.code===200){
      notification.open({
        message: 'Task',
        description:
            'Task delete successfully'
      });
      yield put(homePageActions.deleteTaskSuccess(action.id))
    }else{
      notification.open({
        message: 'Task',
        description:
            'Failure to delete Task'
      });
      yield put(homePageActions.deleteTaskFailure())
    }
  } catch (e) {
    notification.open({
      message: 'Task',
      description:
          'Failure to delete Task'
    });
    yield put(homePageActions.deleteTaskFailure())
  }
}

export {
  addTaskSaga,
  getTasksSaga,
  updateTaskSaga,
  deleteTaskSaga
}
