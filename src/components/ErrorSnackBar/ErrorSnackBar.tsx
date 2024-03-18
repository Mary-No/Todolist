import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootState} from "../App/store";
import {useAppDispatch} from "../App/hooks/useAppDispatch";
import {setAppErrorAC} from "../App/app.reducer";


export function ErrorSnackBar() {
    const error = useSelector<AppRootState, string | null>(state => state.app.error);
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC(null))
    };


    const isOpen = error !== null;
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}
            >
                {error}
            </Alert>
        </Snackbar>

    );
}