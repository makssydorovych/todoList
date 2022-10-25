import {TaskStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType;


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListsId]: state[action.payload.todoListsId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':

            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoListsId]: state[action.payload.todoListsId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todoListsId]: state[action.payload.todoListsId].map(t => t.id === action.payload.taskId ?
                    {...t, title: action.payload.title} : t
                )
            }

        default:
            return state
    }


}
export const removeTaskAC = (taskId: string, todoListsId: string) =>
{return {type: 'REMOVE-TASK', payload: {taskId, todoListsId}} as const}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListsId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, isDone, todoListsId}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListsId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, title, todoListsId}} as const
}