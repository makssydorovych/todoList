import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

 export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

export type PropsType = {
     toDoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, toDoListId: string) => void
    changeFilter: (values: FilterValuesType, toDoListId: string) => void
    addTask: (title: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,toDoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (toDoListId: string) => void

}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    let taskItem: any = <span>Tasks list is empty</span>
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is ruquired");
        }

    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                const onRemoveHandler = () => {
                    props.removeTask(t.taskId)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeTaskStatus(t.taskId, newIsDoneValue);
                }
                return (
                    <li key={t.taskId} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                onChange={onChangeHandler}
                                                                                checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>X</button>
                    </li>)

            })
            }


        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
