import {Dispatch} from 'redux'
import {SetErrorAT, setIsInitializedAC, SetIsInitializedAT, setStatusAC, SetStatusAT} from '../../../App/app-reducer'
import {authAPI, LoginType} from "../../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
    // as boolean | null
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;
// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

