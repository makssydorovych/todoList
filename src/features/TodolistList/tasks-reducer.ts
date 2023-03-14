import {Dispatch} from 'redux'
import {addTodolistAC, removeTodolistAC, setTodolistsAC,} from "./todolists-reducer"
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolist-api'
import {AppRootStateType} from "../../App/store";
import {setErrorAC, setStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
export type FieldErrorType = { field: string; error: string }
const initialState: TasksStateType = {}
export const fetchTasksTC = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI)=> {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
        try {
        const res = await  todolistsAPI.getTasks(todolistId)
            const tasks = res.data.items
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            return  {tasks, todolistId}
        } catch(error)  {
           return  handleServerNetworkError(error, thunkAPI)
        }})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param:{taskId: string, todolistId: string}, thunkAPI)=> {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
                return {taskId: param.taskId, todolistId: param.todolistId}
            } else {
                if (res.data.messages.length) {
                    thunkAPI.dispatch(setErrorAC({error: res.data.messages[0]}))
                    thunkAPI.dispatch(setStatusAC({status: 'failed'}))
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                }
            }

        }).catch((e) => {
            handleServerNetworkError(e, thunkAPI.dispatch)
        })
})

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                    dispatch(setStatusAC({status: 'failed'}))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            }
        }).catch((e) => {
        handleServerNetworkError(e, dispatch)
    })
}
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusAC({status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC({taskId, model, todolistId})
                dispatch(action)
                dispatch(setStatusAC({status: 'succeeded'}))
            }).catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
    }


    const slice = createSlice({
        name: 'tasks',
        initialState,
        reducers: {

            addTaskAC(state, action: PayloadAction<TaskType>) {
                state[action.payload.todoListId].unshift(action.payload)
            },
            updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            },

        },
        extraReducers: (builder) => {
            builder.addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = [];
            });
            builder.addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.id];
            });
            builder.addCase(setTodolistsAC, (state, action) => {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            });
            builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
               state[action.payload.todolistId] = action.payload.tasks

            });
            builder.addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            });
        }
    })

    export const tasksReducer = slice.reducer
    export const {addTaskAC, updateTaskAC} = slice.actions

// thunks

// types
    export type UpdateDomainTaskModelType = {
        title?: string
        description?: string
        status?: TaskStatuses
        priority?: TaskPriorities
        startDate?: string
        deadline?: string
    }
    export type TasksStateType = { [key: string]: Array<TaskType> }
