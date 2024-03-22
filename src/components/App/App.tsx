import React, {useEffect} from 'react';
import {Todolist} from '../Todolist/Todolist';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import ButtonAppBar from '../AppBar';
import {Container, Grid, LinearProgress, Paper} from '@mui/material';
import {useApp} from "./hooks/useApp";
import {TaskType} from "../../api/todolists-api";
import {fetchTodolistsTC, TodolistDomainType} from "../Todolist/todolists-reducer";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {ErrorSnackBar} from "../ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app.reducer";
import {AppRootState} from "./store";
import {TodolistsList} from "../Todolist/TodolistsList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <ErrorSnackBar/>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>

        </div>
    );
}

export default App;
