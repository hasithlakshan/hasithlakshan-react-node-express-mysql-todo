
export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILURE = "REGISTER_FAILURE"
export const IS_LOADING_REGISTER = "IS_LOADING_REGISTER"

export const registerRequest = (userData) => ({
    type: REGISTER_REQUEST,
    userData
})

export const registerSuccess = (result) => ({
    type: REGISTER_SUCCESS,
    result
})

export const registerFailure = () => ({
    type: REGISTER_FAILURE
})

export const isLoading = () => ({
    type: IS_LOADING_REGISTER
})
