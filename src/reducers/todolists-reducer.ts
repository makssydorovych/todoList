import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todoListsId: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListId: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListId: string
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT


export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListsId)
        case "ADD-TODOLIST":

            return [...todoLists, {id: action.todolistId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)


        default:
            return todoLists
    }


}
export const RemoveTodolistAC = (todoListsId: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todoListsId})
export const AddTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title: title, todolistId: v1()})
export const ChangeTodolistFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER", filter, todoListId
})
export const ChangeTodolistTitleAC = (title: string, todoListId: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE", title, todoListId
})