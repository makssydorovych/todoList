import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

type ActionType =
    ReturnType<typeof RemoveTodolistAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof ChangeTodolistFilterAC> |
    ReturnType<typeof ChangeTodolistTitleAC> |
    ReturnType<typeof SetTodolistAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        // case "ADD-TODOLIST":
        //
        //     return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)

        case "SET-TODOLIST":
            return action.todos.map((el)=>({...el, filter: 'all'}))
        default:
            return state
    }


}
export const SetTodolistAC = (todos: TodolistType[]) => ({type: "SET-TODOLIST", todos} as const)
export const RemoveTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", todolistId} as const)
export const AddTodolistAC = (title: string) => ({type: "ADD-TODOLIST", title, todolistId: v1()} as const)
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => ({
    type: "CHANGE-TODOLIST-FILTER", filter, todolistId
} as const)
export const ChangeTodolistTitleAC = (title: string, todolistId: string) => ({
    type: "CHANGE-TODOLIST-TITLE", title, todolistId
} as const)

export const setTodos = (dispatch: Dispatch)=> {
        todolistAPI.getTodolist()
            .then((res)=>{
                dispatch(SetTodolistAC(res))
            })

}