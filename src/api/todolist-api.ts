import axios from 'axios'


const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '4b3af02b-2c6c-49fd-b012-c48f3a9283dd'
    }
}

export const todolistAPI = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => res.data)


    },
    createTodolists(title:string)  {
      return  axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
            .then((res) => res.data)
    },
    deleteTodolist(todoId:string)  {
        return  axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
            .then((res) => res.data)
    },
    updateTodolistTitle(title:string, todoId:string)  {
        return  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {title}, settings)
            .then((res) => res.data)
    }
}