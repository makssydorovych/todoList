import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4b3af02b-2c6c-49fd-b012-c48f3a9283dd'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then((res) => res.data)


    },
    createTodolists(title: string) {
        return instance.post<ResponceType<{ item: TodolistType }>>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponceType>(`todo-lists/${todoId}`)
            .then((res) => res.data)
    },
    updateTodolistTitle(title: string, todoId: string) {
        return instance.put<ResponceType>(`todo-lists/${todoId}`, {title})
            .then((res) => res.data)
    }
}
type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponceType <T={}>={
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}