import React from 'react';
import '../App.css';
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {TodolistList} from "../featured/TodolistList/TodolistList";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";


function App() {
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
                <Grid container spacing={3}>

                    <Grid>
                        <Paper style={{padding: "10px"}}>
                            <TodolistList/>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
}

export default App;
