import React, {useEffect} from 'react';
import {CircularProgress, Container, LinearProgress} from '@mui/material';
import {TaskType} from "../../api/todolists-api";
import {ErrorSnackBar} from "../ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {AppRootState} from "./store";
import {TodolistsList} from "../Todolist/TodolistsList";
import {Route, Routes} from "react-router-dom";
import AppBarComponent from "./AppBar";
import {Login} from "../../features/Login/Login";
import {useAppDispatch} from "./hooks/useAppDispatch";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    useEffect(() => { dispatch(initializeAppTC())},[])


    if (!isInitialized){
        debugger
        return <div style={{position: 'fixed', top:'30%', textAlign:'center', width:'100%'}}>
            <CircularProgress />
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBarComponent/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
                </Routes>
            </Container>
        </div>
    )
}

export default App;
