import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4b3af02b-2c6c-49fd-b012-c48f3a9283dd'

    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })
            .catch()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "REACT&REDUX"
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
            .then((res) => {
                setState(res.data)
            })
            .catch()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "19be1579-0a3a-4bd9-a644-b3bc4d337ba1"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
            .then((res) => {
                setState(res.data)
            })
            .catch()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'New Title'
        let todoId = "b1bbd76f-3bfc-45e3-a05e-05c2d0284b9f"
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {title}, settings)
            .then((res) => {
                setState(res.data)
            })
            .catch()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

