import { takeLatest } from "redux-saga/effects"
import { actions as loginAction, loginSaga } from "../pages/login"
import { actions as homeAction, homeSaga } from "../pages/home"
import { actions as registerAction, registerSaga } from "../pages/register"

export function * watcherSaga () {
  yield takeLatest(loginAction.LOGIN_REQUEST, loginSaga)
  yield takeLatest(homeAction.ADD_TASK_REQUEST, homeSaga.addTaskSaga)
  yield takeLatest(registerAction.REGISTER_REQUEST, registerSaga)
  yield takeLatest(homeAction.GET_TASK_REQUEST, homeSaga.getTasksSaga)
  yield takeLatest(homeAction.UPDATE_TASK_REQUEST, homeSaga.updateTaskSaga)
  yield takeLatest(homeAction.DELETE_TASK_REQUEST, homeSaga.deleteTaskSaga)
}
