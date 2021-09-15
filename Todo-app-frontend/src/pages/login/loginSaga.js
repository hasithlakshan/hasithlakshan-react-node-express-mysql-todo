import { put, call } from "redux-saga/effects"
import Cookies from "js-cookie"
import * as loginPageActions from "./login.actions"
import authService from "../../services/auth.service"
export default function *loginSaga(action) {
  try {
    const loginUser = yield yield call(authService.login, action.loginCredentials);
    if (loginUser.code === 200) {
      Cookies.set("auth", loginUser.token)
      yield put(loginPageActions.loginSuccess(loginUser.payload))
    } else {
      yield put(loginPageActions.loginFailure())
    }
  } catch (e) {
    console.log("somethings happen in login saga!")
    yield put(loginPageActions.loginFailure())
  }
}
