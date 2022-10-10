import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todoListsId: string
}
type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodolistFilterAT ={
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListId: string
}
type ChangeTodolistTitleAT ={
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
            const newTodoListId: string = v1()
            return [...todoLists, {id: newTodoListId, title: action.title, filter: "all"}]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)


        default:
            return todoLists
    }


}