import React from 'react';
import '../App.css';
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {TodolistList} from "../featured/TodolistList/TodolistList";






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

                            return <Grid>
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
