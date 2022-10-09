import React, { ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
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
    changeTaskTitle:(taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle :(title:string, todoListId: string) =>void
}
export function Todolist(props: PropsType) {

    let taskItem: any = <span>Tasks list is empty</span>
    if (props.tasks.length) {
        taskItem = props.tasks.map(task => {
            const changeTaskTitle = (title: string) =>{
                props.changeTaskTitle(task.id, title, props.toDoListId)
            }
            return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.toDoListId)}
                        type={"checkbox"}
                        checked={task.isDone}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                    <button onClick={() => props.removeTask(task.id, props.toDoListId)}>X</button>
                </li>
            )
        })
    }

    const addTask = (title: string) => {
        props.addTask(title, props.toDoListId)
    }
    const handlerCreator = (filter: FilterValuesType, toDoListId: string) => {
        return () => props.changeFilter(filter, toDoListId)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodoList(props.toDoListId)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {taskItem}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={handlerCreator("all", props.toDoListId)}>all
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={handlerCreator("active", props.toDoListId)}>active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={handlerCreator("completed", props.toDoListId)}>completed
                </button>

            </div>
        </div>
    );

}



