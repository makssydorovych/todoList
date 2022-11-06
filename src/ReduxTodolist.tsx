import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {Delete} from "@material-ui/icons";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
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

export const ReduxTodolist = ({todolistId, title, filter} :ReduxTodolistPropsType) => {
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(todolistId))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(title, todolistId))
    }
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone );
    }
    const onAllClickHandler = () =>dispatch(ChangeTodolistFilterAC("all", todolistId))
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
                <div>
                    {
                        tasks.map(t => {
                            const onClickHandler = () => dispatch(removeTaskAC(t.taskId, todolistId))
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked;
                                dispatch(changeTaskStatusAC(t.taskId, t.isDone, todolistId));
                            }
                            const onTitleChangeHandler = (title: string) => {
                                dispatch(changeTaskTitleAC(t.taskId, t.title, todolistId))
                            }
                            return <div key={t.taskId} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    checked={t.isDone}
                                    color="primary"
                                    onChange={onChangeHandler}
                                />

                                <EditableSpan title={t.title} changeTitle={onTitleChangeHandler} />
                                <IconButton onClick={onClickHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        })
                    }
                </div>
            </List>
            <div><ButtonGroup variant="contained">
                <Button disableElevation
                        color={filter === "all" ? "secondary" : "primary"}
                        size={"small"} variant="contained"

                    // className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>all
                </Button>
                <Button disableElevation size={"small"} variant="contained"
                        color={filter === "active" ? "secondary" : "primary"}
                        onClick={onActiveClickHandler}>active
                </Button>
                <Button disableElevation size="small" variant="contained"
                        color={filter === "completed" ? "secondary" : "primary"}
                        onClick={onCompletedClickHandler}>completed
                </Button>
            </ButtonGroup>
            </div>
        </div>
    );
};

