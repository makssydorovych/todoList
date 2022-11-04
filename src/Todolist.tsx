import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";


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
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export function Todolist(props: PropsType) {

    let taskItem: any = <span>Tasks list is empty</span>
    if (props.tasks) {
        taskItem = props.tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <ListItem
                    style={{padding:"0"}}
                    key={task.id} className={task.isDone ? "is-done" : ""}>
                    <Checkbox
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        style={{color: "hotpink"}}
                        checked={task.isDone}
                    />

                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        color="primary"
                        onClick={() => props.removeTask(task.id, props.todoListId)}>
                        <HighlightOffIcon/>
                    </IconButton>

                </ListItem>
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
                <EditableSpan title={props.title} changeTitle={ChangeTodoListTitle}/>

                <IconButton
                    color="primary"
                    onClick={() => props.removeTodoList(props.todoListId)}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <List>
                {taskItem}
            </List>
            <div><ButtonGroup variant="contained">
                <Button disableElevation
                        color={props.filter === "all" ? "secondary" : "primary"}
                        size={"small"} variant="contained"

                    // className={props.filter === "all" ? "active-filter" : ""}
                        onClick={handlerCreator("all", props.todoListId)}>all
                </Button>
                <Button disableElevation size={"small"} variant="contained"
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={handlerCreator("active", props.todoListId)}>active
                </Button>
                <Button disableElevation size="small" variant="contained"
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={handlerCreator("completed", props.todoListId)}>completed
                </Button>
            </ButtonGroup>
            </div>
        </div>
    );

}



