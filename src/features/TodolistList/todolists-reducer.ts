import {todolistsAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setStatusAC} from "../../App/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []
const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        changeEntityStatusAC(state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(tl=>tl.id === action.payload.todolistId)
            state[index].title = action.payload.entityStatus
        },
        removeTodolistAC(state, action: PayloadAction<{id: string}>) {
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            if(index > 1){
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            state[index].title = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
    }
})
export const todolistsReducer = slice.reducer;
export const {changeEntityStatusAC, removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, setTodolistsAC} = slice.actions;


// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setStatusAC({status: 'succeeded'}))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        dispatch(changeEntityStatusAC({todolistId: todolistId,entityStatus: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id: todolistId}))
                dispatch(setStatusAC({status: 'succeeded'}))
            }).catch((e: AxiosError) => {
            dispatch(setStatusAC({status: 'failed'}))
            dispatch(changeEntityStatusAC({todolistId: todolistId, entityStatus: 'failed'}))
            dispatch(setErrorAC({error: e.message}))
        })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setStatusAC({status: 'failed'}))

                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(setErrorAC({error: "error"}))
                }

            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id, title}))
            })
    }
}


export type ChangeEntityStatustype = ReturnType<typeof changeEntityStatusAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ChangeEntityStatustype


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}