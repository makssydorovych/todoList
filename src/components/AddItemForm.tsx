import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}



const AddItemForm = React.memo((props: AddItemFormType) => {
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
            ? <span style={{color: "hotpink"}}>Title is required</span>
            : <span>Please create list item's title</span>
    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                error={error}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}
                label={"Title"}
                helperText={userMessage}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} color="secondary" disabled={props.disabled}>
                <AddCircleOutlineIcon />
            </IconButton>


        </div>
    );
});

export default AddItemForm;