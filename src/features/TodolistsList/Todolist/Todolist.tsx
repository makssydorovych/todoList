import React, {useCallback, useEffect} from 'react'
import {Task} from './Task/Task'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'
import {tasksActions, todolistsActions} from '../index'
import {TaskStatuses, TaskType} from '../../../api/types'
import {useActions, useAppDispatch} from '../../../utils/redux-utils'
import {Delete} from "@mui/icons-material";
import {Button, Paper, PropTypes} from "@mui/material";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../../components/AddItemForm/AddItemForm";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean

}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    const {fetchTasks} = useActions(tasksActions)
    const {changeTodolistFilter, removeTodolistTC, changeTodolistTitleTC} = useActions(todolistsActions)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(props.todolist.id)
    }, [])

    const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        const resultAction = await dispatch(tasksActions.addTask({title: title, todolistId: props.todolist.id}))

        if (tasksActions.addTask.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }

    }, [props.todolist.id, dispatch])


    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: title})
    }, [props.todolist.id])

    const onFilterButtonClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilter({
        filter: filter,
        id: props.todolist.id
    }), [props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (
        buttonFilter: FilterValuesType,
        color: PropTypes.Color | undefined,
        text: string
    ) => {
        return (
            <Button
                variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                onClick={() => onFilterButtonClickHandler(buttonFilter)}
                color={'inherit'}
            >
                {text}
            </Button>
        );
    };

    return <Paper style={{padding: '10px', position: 'relative'}} >
        <IconButton
            size={'small'}
            onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}
            style={{position: 'absolute', right: '5px', top: '5px'}}
        >
            <Delete fontSize={'small'}/>
        </IconButton>
        <h3>
            <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
            {!tasksForTodolist.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton('all', 'inherit', 'All')}
            {renderFilterButton('active', 'primary', 'Active')}
            {renderFilterButton('completed', 'secondary', 'Completed')}
        </div>
    </Paper>
})



