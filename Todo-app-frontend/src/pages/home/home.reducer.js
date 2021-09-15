import { actions } from "./index"
import { actions as loginActions } from "../login"
const initialState = {
  tasks: [],
  isGetTaskLoading: false,
  isGetTaskInitialLoading: true,
  isAddTaskLoading: false,
  isAddTaskInitialLoading: true,
  isDeleteTaskLoading: false,
  isDeleteTaskInitialLoading: true,
  isUpdateTaskLoading: false,
  isUpdateTaskInitialLoading: true,
  deleted: false
}
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TASK_REQUEST:
      return {
        ...state,
        isAddTaskLoading: true,
        isAddTaskInitialLoading: true
      }
    case actions.ADD_TASK: {
      return {
        ...state,
        isAddTaskLoading: false,
        isAddTaskInitialLoading: false,
        tasks: [
          ...state.tasks,
          action.taskObject
        ]
      }
    }
    case actions.ADD_TASK_FAILURE:
      return {
        ...state,
        isAddTaskLoading: false,
        isAddTaskInitialLoading: false

      }
    case actions.GET_TASK_REQUEST:
      return {
        ...state,
        isGetTaskLoading: true,
        isGetTaskInitialLoading: true
      }
    case actions.GET_TASK: {
      return {
        ...state,
        tasks: action.taskObject,
        isGetTaskLoading: false,
        isGetTaskInitialLoading: false
      }
    }
    case actions.GET_TASK_FAILURE:
      return {
        ...state,
        isGetTaskLoading: false,
        isGetTaskInitialLoading: false

      }
    case actions.DELETE_TASK_REQUEST:
      return {
        ...state,
        isDeleteTaskLoading: true,
        isDeleteTaskInitialLoading: true,
        deleted: false
      }
    case actions.DELETE_TASK_SUCCESS: {
      const existingTask = state.tasks.filter(task=>(task.TaskID!==action.taskId))
      return {
        ...state,
        deleted:true,
        tasks: existingTask,
        isDeleteTaskLoading: false,
        isDeleteTaskInitialLoading: false
      }
    }
    case actions.DELETE_TASK_FAILURE:
      return {
        ...state,
        isDeleteTaskLoading: false,
        isDeleteTaskInitialLoading: false,
        deleted: false
      }
    case actions.UPDATE_TASK_REQUEST:
      return {
        ...state,
        isUpdateTaskLoading: true,
        isUpdateTaskInitialLoading: true
      }
    case actions.UPDATE_TASK_SUCCESS: {
      const existingTask = state.tasks.filter(task=>(task.TaskID!==action.taskObject.TaskID))
      return {
        ...state,
        isUpdateTaskLoading: false,
        isUpdateTaskInitialLoading: false,
        tasks: [
          ...existingTask,
          action.taskObject
        ],
      }
    }
    case actions.UPDATE_TASK_FAILURE:
      return {
        ...state,
        isUpdateTaskLoading: false,
        isUpdateTaskInitialLoading: false

      }
    case loginActions.LOG_OUT: {
      return {
        ...state,
        tasks: []
      }
    }
    default:
      return state
  }
}
export default homeReducer
