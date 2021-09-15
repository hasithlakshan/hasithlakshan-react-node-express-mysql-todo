import { put, call } from "redux-saga/effects"
import * as registerPageActions from "./register.actions"
import profileService from "../../services/profile.service"
import {redirect} from "../../services/history";

export default function *registerSaga(action) {
    try {
        const registeredUser = yield yield call(profileService.register, action.userData);
        if (registeredUser.code === 200) {
            yield put(registerPageActions.registerSuccess(registeredUser.payload))
            redirect("/")
        } else {
            yield put(registerPageActions.registerFailure())
        }
    } catch (e) {
        console.log("somethings happen in register saga!")
        yield put(registerPageActions.registerFailure())
    }
}
