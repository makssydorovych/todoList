import React from 'react';
import './App.css';
import {TaskType} from './ReduxTodolist';
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
import {ReduxTodolist} from "./ReduxTodolist";

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
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {

        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
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


        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "20px"}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todoLists.map(tl => {
                                let allTodolistTasks = tasks[tl.id];
                                let tasksForTodolist = allTodolistTasks;

                                if (tl.filter === "active") {
                                    tasksForTodolist = allTodolistTasks.filter(tl => !tl.isDone);
                                }
                                if (tl.filter === "completed") {
                                    tasksForTodolist = allTodolistTasks.filter(tl => tl.isDone);
                                }

                                return <Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <ReduxTodolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeTodoListFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Container>
            </div>
    );
}

export default AppWithRedux;
