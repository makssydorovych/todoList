import React, {ChangeEvent} from 'react';
import {TaskType} from "./ReduxTodolist"
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
// type TaskPropsType ={
//     changeTaskStatus: (id:string, isDone: boolean, todolistId: string) => void
//     changeTaskTitle: (taskId: string, newTitle: string, todolistId: string)=>void
//     removeTask: (taskId: string, todolistId: string)=>void
//     task: TaskType
//     todolistId: string
// }
//
// export  const Task = React.memo((props: TaskPropsType) => {
//     const onClickHandler = () => props.removeTask(props.task.taskId, props.todolistId)
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         let newIsDoneValue = e.currentTarget.checked;
//        props.changeTaskStatus(props.task.taskId, newIsDoneValue, props.todolistId)
//     }
//     const onTitleChangeHandler = useCallback((newValue: string) => {
//         props.changeTaskTitle(props.task.taskId, newValue, props.todolistId)
//     }, [props.task.taskId,props.changeTaskTitle, props.todolistId])
//     return <div key={props.task.taskId}>
//         <Checkbox
//             checked={props.task.isDone}
//             color="primary"
//             onChange={onChangeHandler}
//         />
//
//         <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler} />
//         <IconButton onClick={onClickHandler}>
//             <HighlightOffIcon/>
//         </IconButton>
//     </div>
// });
// type TaskPropsType ={
//     task: TaskType
//     todolistId: string
// }
//
type TaskPropsType ={
    task: TaskType
    todolistId: string
}
export  const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    const {taskId, title, isDone} = task
    const dispatch = useDispatch()
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
    return <div className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan title={task.title} changeTitle={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <HighlightOffIcon/>
        </IconButton>
    </div>
});

