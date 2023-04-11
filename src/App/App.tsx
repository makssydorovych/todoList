import React, {useCallback, useEffect} from 'react'
import '../App.css'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {authActions, authSelectors, Login} from '../features/Auth'
import {useActions} from '../utils/redux-utils'
import {selectIsInitialized, selectStatus} from "../features/Aplication/selectors";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@mui/material";
import {appActions} from "../features/Aplication";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {todolistsActions} from "../features/TodolistsList";
import background from "../assets/back.jpg"

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    const {fetchTodolists} = useActions(todolistsActions)

    useEffect(() => {
        fetchTodolists()
    }, [])
    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [])


    const logoutHandler = useCallback(() => {
        logout()
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <div style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh',
                }}>
                    <Routes>
                        <Route path="/todoList" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path="*" element={<Navigate to="/404"/>}/>
                    </Routes>
                </div>
            </Container>
        </div>
    )
}

export default App
