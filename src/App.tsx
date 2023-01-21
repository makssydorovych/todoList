import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {TaskType} from './ReduxTodolist'
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoListId: string]: Array<TaskType>
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
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: true},
            {taskId: v1(), title: "ReactJS", isDone: false},
            {taskId: v1(), title: "RestAPI", isDone: false},
            {taskId: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId_2]: [
            {taskId: v1(), title: "Beer", isDone: true},
            {taskId: v1(), title: "Fish", isDone: true},
            {taskId: v1(), title: "Meat", isDone: false},
            {taskId: v1(), title: "RestAPI", isDone: false},
            {taskId: v1(), title: "GraphQL", isDone: false}
        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.taskId !== taskId)})
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {taskId: v1(), title: title, isDone: false};
        const todolistTasks = tasks[todoListId]
        setTasks({...tasks, [todoListId]: [newTask, ...todolistTasks]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {

        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.taskId === taskId ? {...t, isDone: isDone} : t)
        })
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.taskId === taskId ? {...t, title} : t)
        })
    }///////


    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todoListsId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsId))
    }

    const addTodoList = (title: string) => {
        const newTodoListId: string = v1()
        setTodoLists([...todoLists, {id: newTodoListId, title, filter: "all"}])
        setTasks({...tasks, [newTodoListId]: []})
    }

    // useEffect((e) => {}, [todoLists])

    //UI:
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
            <Grid item  key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <Todolist

                        todolistId={tl.id}
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

                    /></Paper></Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>

                    </IconButton>
                    <Typography variant="h6">
                        Todolosts
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed >
                <Grid container  style={{padding: "20px 0px"}}><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container justifyContent={"center"} spacing={3}>{todoListComponents}</Grid>
            </Container>

        </div>
    );
}

export default App;
