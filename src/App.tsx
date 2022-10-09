import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [toDoListId: string]: Array<TaskType>
}

function App() {

    const toDoListId_1 = v1()
    const toDoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: toDoListId_1, title: "What to learn today", filter: "all"},
        {id: toDoListId_2, title: "What to learn buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListId_1]: [
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: true},
            {taskId: v1(), title: "ReactJS", isDone: false},
            {taskId: v1(), title: "RestAPI", isDone: false},
            {taskId: v1(), title: "GraphQL", isDone: false}
        ],
        [toDoListId_2]: [
            {taskId: v1(), title: "Beer", isDone: true},
            {taskId: v1(), title: "Fish", isDone: true},
            {taskId: v1(), title: "Meat", isDone: false},
            {taskId: v1(), title: "RestAPI", isDone: false},
            {taskId: v1(), title: "GraphQL", isDone: false}
        ]
    })

    const removeTask = (taskId: string, toDoListId: string) => {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].filter(t => t.taskId !== taskId)})
    }

    const addTask = (title: string, toDolistId: string) => {
        let newTask: TaskType = {taskId: v1(), title: title, isDone: false};
        const todolistTasks = tasks[toDolistId]
        setTasks({...tasks, [toDolistId]: [newTask, ...todolistTasks]})
    }
    const changeStatus = (taskId: string, isDone: boolean, toDoListId: string) => {

        setTasks({
            ...tasks, [toDoListId]: tasks[toDoListId].map(t => t.taskId === taskId ? {...t, isDone: isDone} : t)
        })
    }
    const changeFilter = (filter: FilterValuesType, toDoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === toDoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todoListsId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId))
    }
    const getTasksForTodoList = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        const tasks = getTasksForTodoList(tl)
        return (
            <Todolist
                key={tl.id}
                toDoListId={tl.id}
                title={tl.title}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodoList={removeTodolist}

            />
        )
    })
const addTodoList = (title: string) =>{
        const newTodoListId: string = v1()
    setTodoLists([...todoLists, {id: newTodoListId, title, filter: "all"}])
    setTasks({...tasks, [newTodoListId] : []})
}
    return (
        <div className="App">
            {todoListComponents}

        </div>
    );
}

export default App;
