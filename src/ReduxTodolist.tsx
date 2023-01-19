import React, {memo, useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolists-reducer";
import {addTaskAC} from "./reducers/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

export type  ReduxTodolistPropsType = {
    todolistId: string,
    title: string
    filter: FilterValuesType
}

export const ReduxTodolist = memo(({todolistId, title, filter}: ReduxTodolistPropsType) => {
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(todolistId))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(title, todolistId))
    }
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch, todolistId])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC("all", todolistId))
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC("active", todolistId))
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC("completed", todolistId))
    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>

                <IconButton color="primary" onClick={removeTodolist}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <List>
                    {
                    tasks.map(t => (
                        <Task
                            key={t.taskId}
                            task={t}
                            todolistId={todolistId}
                        />
                    ))
                }

            </List>
            <div style={{paddingTop: '10px'}}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'default'}
                >All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    );
});

// type ButtonMemoPropsType = {
//
//     color: 'primary' | 'secondary',
//     onClick: () => void
//     children: string;
// }
// const ButtonMemo = memo((props: ButtonMemoPropsType) => {
//     return (
//
//         <Button disableElevation
//                 color={props.color}
//                 onClick={onclick}
//                 >
//
//             </Button>
// )
// })
