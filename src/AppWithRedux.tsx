import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodolistAC, SetTodolistAC, setTodos, TodolistDomainType} from "./reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {ReduxTodolist} from "./ReduxTodolist";
import {todolistAPI} from "./api/todolist-api";

//  type FilterValuesType = "all" | "active" | "completed";
//  type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }



function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])
        useEffect(()=>{

        })
    useEffect(()=>{
    dispatch(setTodos)
    },[])

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
                                return <Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <ReduxTodolist
                                            todolistId={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}

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
