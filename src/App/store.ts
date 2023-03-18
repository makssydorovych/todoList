import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistList/todolists-reducer';
import {AnyAction, combineReducers} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunk)
})
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppDispatchType = typeof store.dispatch
// @ts-ignore
window.store = store;