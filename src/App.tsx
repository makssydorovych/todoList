import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

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

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn today", filter: "all"},
        {id: todoListId_2, title: "What to learn buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        const todolistTasks = tasks[todoListId]
        setTasks({...tasks, [todoListId]: [newTask, ...todolistTasks]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {

        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) =>{
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }
    const changeTodoListTitle = (title:string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }
    const changeTodoListFilter = (filter: FilterValuesType, toDoListId: string) => {
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
                changeFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodoList={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}

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
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}

        </div>
    );
}

export default App;
