import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterTypeValueType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterTypeValueType
}
type TaskStateType ={
    [toDoListId : string]: Array<TaskType>
}

function App() {

/*    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterTypeValueType>("all")*/
    const toDoListId_1 = v1()
    const toDoListId_2 = v1()
    const [todoList, setTodoList]=useState<Array<TodoListType>>([
        {id: toDoListId_1, title:"What to learn today", filter: "all"},
        {id: toDoListId_2, title:"What to learn buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListId_1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [toDoListId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })
    function removeTask(taskId: string, toDoListId: string) {
        setTasks({...tasks, [toDoListId] : tasks[toDoListId].filter(t => t.id !== taskId)})
    }
    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: FilterTypeValueType) {
        setFilter(value)
    }



    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;

            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}

            />

        </div>
    );
}

export default App;
