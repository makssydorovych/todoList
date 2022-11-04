import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

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

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: "What to learn today", filter: "all"},
        {id: todoListId_2, title: "What to learn buy", filter: "all"}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {

        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }


    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodoLists(ChangeTodolistTitleAC(title, todoListId))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToTodoLists(ChangeTodolistFilterAC(filter, todoListId))
    }
    const removeTodolist = (todoListsId: string) => {
        let action = RemoveTodolistAC(todoListsId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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
