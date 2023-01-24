import { setErrorAc, AppActionsType, setStatusAc} from '../App/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'

// generic function
export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAc(data.messages[0]))
    } else {
        dispatch(setErrorAc('Some error occurred'))
    }
    dispatch(setErrorAc('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAc(error.message))
    dispatch(setStatusAc('failed'))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
