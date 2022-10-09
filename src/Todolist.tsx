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
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (values: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle:(taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle :(title:string, todoListId: string) =>void
}
export function Todolist(props: PropsType) {

    let taskItem: any = <span>Tasks list is empty</span>
    if (props.tasks.length) {
        taskItem = props.tasks.map(task => {
            const changeTaskTitle = (title: string) =>{
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        type={"checkbox"}
                        checked={task.isDone}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                    <button onClick={() => props.removeTask(task.id, props.todoListId)}>X</button>
                </li>
            )
        })
    }
const ChangeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)



    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={ChangeTodoListTitle} />
                <button onClick={() => props.removeTodoList(props.todoListId)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {taskItem}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={handlerCreator("all", props.todoListId)}>all
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={handlerCreator("active", props.todoListId)}>active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={handlerCreator("completed", props.todoListId)}>completed
                </button>

            </div>
        </div>
    );

}



