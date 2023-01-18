import React, {ChangeEvent} from 'react';
import {TaskType} from "./ReduxTodolist"
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
type TaskPropsType ={
    task: TaskType
    todolistId: string
}

export  const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    const {taskId, title, isDone} = task
    const dispatch = useDispatch()
    dispatch(removeTaskAC(taskId, todolistId))
    const onClickHandler = () => dispatch(removeTaskAC(taskId, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const action = changeTaskStatusAC(taskId, newIsDoneValue, todolistId)
        dispatch(action)
    }
    const onTitleChangeHandler = (newValue: string) => {
        const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }
    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={task.title} changeTitle={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <HighlightOffIcon/>
        </IconButton>
    </div>
});

