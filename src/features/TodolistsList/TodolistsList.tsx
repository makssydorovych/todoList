import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {TodolistDomainType} from './todolists-reducer'
import {AddItemForm, AddItemFormSubmitHelperType} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {selectIsLoggedIn} from '../Auth/selectors'
import {todolistsActions} from './index'
import {AppRootStateType} from '../../utils/types'
import {useActions, useAppDispatch} from '../../utils/redux-utils'
import {TasksStateType} from './tasks-reducer'
import {Navigate} from "react-router-dom";
import Grid from "@mui/material/Grid";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const {fetchTodolists} = useActions(todolistsActions)

    const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {

        const resultAction = await dispatch(todolistsActions.addTodolist(title))

        if (todolistsActions.addTodolist.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [])


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px', justifyContent: 'center'}}>
            <AddItemForm addItem={addTodolistCallback}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: 'wrap', justifyContent: 'center', alignItems: 'space-between'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>

                            <Todolist

                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />

                    </Grid>
                })
            }
        </Grid>
    </>
}
