import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res)=> {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "REACT&REDUX"
        todolistAPI.createTodolist(title)
            .then((res)=>{
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "60a1b502-c700-41da-a9d9-476383924419"
        todolistAPI.deleteTodolist(todoId)
            .then((res)=>{
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "128bfb85-9ac9-40cd-bac4-26982f9f6e77"
        let title = "NEW TITLE"
        todolistAPI.updateTodolistTitle(title, todoId)
            .then((res)=>{
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

