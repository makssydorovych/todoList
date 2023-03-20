import {FieldErrorType} from '../api/types'
import {rootReducer} from "../App/store";
import {ThunkDispatch} from "redux-thunk"
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";


// redux common types
export type RootReducerType = typeof rootReducer
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>;
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } };
