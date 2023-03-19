import React, {useCallback, useEffect} from 'react'
import '../App.css'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {authActions, authSelectors, Login} from '../features/Auth'
import {useActions} from '../utils/redux-utils'
import {selectIsInitialized, selectStatus} from "../features/Aplication/selectors";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@mui/material";
import {appActions} from "../features/Aplication";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

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
                <Route path="/" element={<TodolistsList demo={demo}/>} />
                <Route path="users/*" element={<Login />} />
            </Container>
        </div>
    )
}

export default App
