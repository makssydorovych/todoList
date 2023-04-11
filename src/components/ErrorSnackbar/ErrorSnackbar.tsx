import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {setErrorAC} from "../../App/app-reducer";
import {useAppDispatch} from "../../utils/redux-utils";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../utils/types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const dispatch = useAppDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC({error: null}))
    }
    const isOpen = error !== null;
    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    )
}