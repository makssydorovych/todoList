import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
export type FilterTypeValueType = "all" | "active" | "completed";
function App() {

    let [tasks, setTasks] = useState( [
        {id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "RestAPI", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);
    function removeTask(id:string) {
        let filteredTasks = tasks.filter(t=>t.id != id);
        setTasks(filteredTasks)
    }
    let [filter, setFilter] = useState<FilterTypeValueType>("all")
    let tasksForTodoList = tasks
    if (filter === "active"){
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed"){
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
function changeFilter(value:FilterTypeValueType) {
        setFilter(value)
}
    function addTask(title: string){
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task,...tasks]
        setTasks(newTasks)
    }
    function changeStatus (id:string, isDone:boolean){
        let task = tasks.find(t => t.id === id);
        if (task){
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
            />

        </div>
    );
}

export default App;
