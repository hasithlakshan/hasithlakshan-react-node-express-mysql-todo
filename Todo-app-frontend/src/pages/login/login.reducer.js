import { actions } from "./index"
const initialState = {
  user: [],
  isAuthenticated: false,
  isLoading: false
}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state
      }
    case actions.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.result,
        isAuthenticated: true,
        isLoading: false
      }
    }
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        user: [],
        isAuthenticated: false,
        isLoading: false
      }
    case actions.IS_LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }
    case actions.LOG_OUT: {
      return {
        ...state,
        user: [],
        isAuthenticated: false
      }
    }
    default:
      return state
  }
}
export default loginReducer
