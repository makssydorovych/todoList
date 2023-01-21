import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '27174707-1f72-4acd-871c-461d7e7565ed'
    }
})
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T={}>={
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
            .then((res) => res.data)


    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
            .then((res) => res.data)
    },
    updateTodolistTitle(title: string, todoId: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
            .then((res) => res.data)
    }
}

