import {setErrorAC,setStatusAC} from '../App/app-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolist-api'

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:'Some error occurred'}))
    }
    dispatch(setStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setErrorAC(error.message ? {error: error.message} : {error:'Some error occurred'}))
    dispatch(setStatusAC({status:'failed'}))
}

