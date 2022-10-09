import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addTask: () => void
}
const AddItemForm = () => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
        const userMessage =
            error
                ? <div style={{color: "hotpink"}}>Title is required</div>
                : <div>Please create list item</div>
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
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter")addTask()
    }
    return (
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
    );
};

export default AddItemForm;