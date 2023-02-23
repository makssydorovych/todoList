import { setErrorAc, AppActionsType, setStatusAc} from '../App/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'

// generic function
export const handleServerAppError = <D>(dispatch: ErrorUtilsDispatchType, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(setErrorAc(data.messages[0]))
    } else {
        dispatch(setErrorAc('Some error occurred'))
    }
    dispatch(setStatusAc('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
    dispatch(setStatusAc('failed'))
    dispatch(setErrorAc(error.message))

}


type ErrorUtilsDispatchType = Dispatch<AppActionsType>

