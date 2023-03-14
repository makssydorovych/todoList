import {Dispatch} from 'redux'
import {setIsInitializedAC, setStatusAC} from '../../../App/app-reducer'
import {authAPI, LoginType} from "../../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk('auth/login', async (param: LoginType, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    }

})
export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setIsInitializedAC({isInitialized: true}))
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
        // as boolean | null
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn
            }
        })
    }
})
export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;
// thunks


