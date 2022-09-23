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
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (toDoListId: string) => void

}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    let taskItem: any = <span>Tasks list is empty</span>
    if (props.tasks.length) {
        taskItem = props.tasks.map(task => {
            return (
                <li key={task.taskId} className={task.isDone ? "is-done" : ""}>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.taskId, e.currentTarget.checked, props.toDoListId)}
                        type={"checkbox"}
                        checked={task.isDone}
                    />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.taskId, props.toDoListId)}>X</button>
                </li>
            )
        })
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) =>{
        if(error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter")addTask()
    }
    const addTask= ()=>{
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.toDoListId)
        }else{
            setError(true)
        }
        setTitle("")
    }
    const handlerCreator = (filter: FilterValuesType,toDoListId: string)=>{
        return()=>props.changeFilter(filter, toDoListId)
    }
    const userMessage =
        error
        ? <div style={{color: "hotpink"}}>Title is required</div>
            : <div>Please create list item</div>
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={changeTitle}
                    onKeyDown={onKeyDownAddTask}

                />
                <button onClick={addTask}>+</button>
                {userMessage}

            </div>
            <ul>
                {taskItem}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                onClick={handlerCreator("all", props.toDoListId)}>all</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={handlerCreator("active", props.toDoListId)}>active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={handlerCreator("completed", props.toDoListId)}>completed</button>

            </div>
        </div>
    )

}



