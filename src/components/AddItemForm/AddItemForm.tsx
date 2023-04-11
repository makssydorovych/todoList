import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {AddBox} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";


export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void }
type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItemHandler()
        }
    }

    return <>
        <TextField color ="primary"
                   variant="outlined"
                   disabled={disabled}
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}


        />
        <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{marginLeft: '5px'}}>
            <AddBox/>
        </IconButton>
    </>
})
