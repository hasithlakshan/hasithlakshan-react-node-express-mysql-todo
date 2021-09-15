import { combineReducers, createStore, applyMiddleware } from "redux"
import { loginReducer as login } from "../pages/login"
import { homeReducer as home } from "../pages/home"
import { registerReducer as register } from "../pages/register"
import createSagaMiddleware from "redux-saga"
import { watcherSaga } from "./rootSaga"

const rootReducer = combineReducers({
  login,
  home,
  register
})

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(rootReducer, {}, applyMiddleware(...middleware))

sagaMiddleware.run(watcherSaga)

export default store
