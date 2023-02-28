import {Dispatch} from 'redux'
import {SetErrorAT, setIsInitializedAC, SetIsInitializedAT, setStatusAC, SetStatusAT} from '../../../App/app-reducer'
import {authAPI, LoginType} from "../../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";

const initialState = {
    isLoggedIn: false as boolean | null
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
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
export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try{
        const res = await authAPI.logOut()
       if(res.data.resultCode ===0){
           dispatch(setIsLoggedInAC(false))
           dispatch(setStatusAC('succeeded'))
       }else{
           handleServerAppError(res.data, dispatch)
       }
    } catch(e: any)  {
            handleServerNetworkError(e, dispatch)
        }
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusAT | SetErrorAT | SetIsInitializedAT
