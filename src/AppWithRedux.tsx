import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}


function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, Array<TaskStateType>>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {

        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }


    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(title, todoListId))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(filter, todoListId))
    }
    const removeTodolist = (todoListsId: string) => {
        dispatch(RemoveTodolistAC(todoListsId))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodolistAC(title))
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
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <Todolist

                        todoListId={tl.id}
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
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container justifyContent={"center"} spacing={3}>{todoListComponents}</Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
