import { createBrowserHistory } from "history"
const history = createBrowserHistory()
const redirect = (path, state = {}) => history.push(path, state)
const back = () => history.back()
const getCurrentPath = () => window.location.pathname

export {
  redirect,
  back,
  getCurrentPath
}
export default history
