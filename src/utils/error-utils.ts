import {setErrorAC, AppActionsType, setStatusAC, SetErrorAT, SetStatusAT} from '../App/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorAT | SetStatusAT>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetErrorAT | SetStatusAT>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setStatusAC('failed'))
}

