import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}
const AddItemForm = (props: AddItemFormType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)

    }

    const addItem= ()=>{
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        }else{
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter")addItem()
    }
    const userMessage =
        error
            ? <div style={{color: "hotpink"}}>Title is required</div>
            : <div>Please create list item's title</div>
    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}

            />
            <button onClick={addItem}>+</button>
            {userMessage}
        </div>
    );
};

export default AddItemForm;