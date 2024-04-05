import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useAppDispatch} from "../../components/App/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {AppRootState} from "../../components/App/store";
import {Navigate} from "react-router-dom";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required field'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            } else if (!values.password){
                errors.password = 'Required field'
            }else if (values.password.length < 4){
                errors.password = 'The password must contain at least 4 characters'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })
    const emptyError = !!Object.keys(formik.errors).length;
    if(isLoggedIn){
        return <Navigate to={'/'} />
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered <a href={'https://social-network.samuraijs.com/'} rel="noreferrer" target={'_blank'}>here</a></p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'} control={<Checkbox  onChange={formik.handleChange}
                                                                                        checked={formik.values.rememberMe}
                                                                                        name="rememberMe"/>} />
                            <Button disabled={emptyError} type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}