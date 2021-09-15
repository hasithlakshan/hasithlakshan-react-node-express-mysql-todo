import { actions } from "./index"
const initialState = {
    registeredUser: [],
    isLoading: false
}
const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.REGISTER_REQUEST:
            return {
                ...state,
                registeredUser: [],
                isLoading: true
            }
        case actions.REGISTER_SUCCESS: {
            return {
                ...state,
                registeredUser: action.result,
                isLoading: false
            }
        }
        case actions.REGISTER_FAILURE:
            return {
                ...state,
                registeredUser: [],
                isLoading: false,
            }
        case actions.IS_LOADING_REGISTER: {
            return {
                ...state,
                isLoading: true
            }
        }
        default:
            return state
    }
}
export default registerReducer
