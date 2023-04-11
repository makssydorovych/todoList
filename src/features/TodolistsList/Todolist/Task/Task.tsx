import React, {ChangeEvent, useCallback} from 'react'
import {tasksActions} from '../../index'
import {TaskStatuses, TaskType} from '../../../../api/types'
import {useActions} from '../../../../utils/redux-utils'
import {Delete} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const {updateTask, removeTask} = useActions(tasksActions)

    const onClickHandler = useCallback(() => removeTask({taskId: props.task.id, todolistId: props.todolistId}),
        [props.task.id, props.todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTask({
            taskId: props.task.id,
            model: {title: newValue},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
                style={{position: 'relative'}}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton size={'small'} onClick={onClickHandler} style={{ position: 'absolute', top: '2px', right: '2px'} }>
            <Delete fontSize={'small'}/>
        </IconButton>
    </div>
})
