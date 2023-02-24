import React from 'react';
import '../App.css';
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {TodolistList} from "../features/TodolistList/TodolistList";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import { Routes, Route, Navigate } from 'react-router-dom';
import {Login}  from '../features/Login/Login';


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container style={{padding: "30px"}}>
                <Grid container spacing={3}>
                    <Grid>
                        <Paper style={{padding: "10px"}}>
                            <Routes>
                                <Route path='/' element={<TodolistList/>}/>
                                <Route path='/login' element={<Login/>}/>
                                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                                <Route  path = '*' element = {<Navigate to='/404'/>}/>
                            </Routes>
                            
                            <ErrorSnackbar />
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
}

export default App;
