import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: null as null | string
}
const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setErrorAC: (state, action: PayloadAction<{
            error: null | string
        }>) => {
            state.error = action.payload.error
        },
        setIsInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    }
})
export const appReducer = slice.reducer;
export const {setStatusAC, setErrorAC, setIsInitializedAC} = slice.actions



