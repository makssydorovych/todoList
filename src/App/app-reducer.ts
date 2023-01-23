export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, status: action.error}
        default:
            return state
    }
}

export const setStatusAc = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorStatusAc = (error: RequestStatusType) => ({type: 'APP/SET-ERROR', error} as const)

export type AppActionsType =
    ReturnType<typeof setStatusAc> |
    ReturnType<typeof setErrorStatusAc>