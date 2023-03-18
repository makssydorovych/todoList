import {Dispatch} from 'redux'
import {setIsInitializedAC, setStatusAC} from '../../../App/app-reducer'
import {authAPI, FieldErrorType, LoginType} from "../../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const loginTC = createAsyncThunk<undefined, LoginType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
   const res =  thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            return(res.data, thunkAPI.dispatch)

        }
    } catch (err) {
        const error: AxiosError = err;
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
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
                state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})
export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;
// thunks


