
export const ADD_TASK_REQUEST = "ADD_TASK_REQUEST"
export const ADD_TASK = "ADD_TASK"
export const ADD_TASK_FAILURE = "ADD_TASK_FAILURE"
export const GET_TASK_REQUEST = "GET_TASK_REQUEST"
export const GET_TASK = "GET_TASK"
export const GET_TASK_FAILURE = "GET_TASK_FAILURE"
export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST"
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS"
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE"
export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST"
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS"
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE"

export const addTaskREQUEST = (taskObject) => ({
  type: ADD_TASK_REQUEST,
  taskObject
})
export const addTask = (taskObject) => ({
  type: ADD_TASK,
  taskObject
})
export const addTaskFailure = () => ({
  type: ADD_TASK_FAILURE
})
export const getTaskREQUEST = () => ({
  type: GET_TASK_REQUEST
})
export const getTask = (taskObject) => ({
  type: GET_TASK,
  taskObject
})
export const getTaskFailure = () => ({
  type: GET_TASK_FAILURE
})
export const deleteTaskRequest = (id) => ({
  type: DELETE_TASK_REQUEST,
  id
})
export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  taskId
})
export const deleteTaskFailure = () => ({
  type: DELETE_TASK_FAILURE
})
export const updateTaskRequest = (taskObject) => ({
  type: UPDATE_TASK_REQUEST,
  taskObject
})
export const updateTaskSuccess = (taskObject) => ({
  type: UPDATE_TASK_SUCCESS,
  taskObject
})
export const updateTaskFailure = () => ({
  type: UPDATE_TASK_FAILURE
})
