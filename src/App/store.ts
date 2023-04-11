import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from '../features/Auth'
import {configureStore} from '@reduxjs/toolkit'
import {tasksReducer, todolistsReducer} from "../features/TodolistsList";
import {appReducer} from "../features/Aplication";


export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


// @ts-ignore
window.store = store

