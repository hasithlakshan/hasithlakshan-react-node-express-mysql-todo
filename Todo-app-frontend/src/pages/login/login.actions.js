
export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const IS_LOADING = "IS_LOADING"
export const LOG_OUT = "LOG_OUT"

export const loginRequest = (loginCredentials) => ({
  type: LOGIN_REQUEST,
  loginCredentials
})

export const loginSuccess = (result) => ({
  type: LOGIN_SUCCESS,
  result
})

export const loginFailure = () => ({
  type: LOGIN_FAILURE
})

export const isLoading = () => ({
  type: IS_LOADING
})

export const logOut = () => ({
  type: LOG_OUT
})
