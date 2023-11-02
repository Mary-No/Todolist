import React, {useCallback} from 'react';
import '../App.css';
import {TaskItemType, TodoList} from '../TodoList';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import ButtonAppBar from '../components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {useAppWithRedux} from "./hooks/useAppWithRedux";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TaskItemType>
}

function AppWithRedux() {

    const {
        todolists,
        addTodolist,
        removeTodolist,
        changeFilter,
        changeTodolistTitle
    } = useAppWithRedux()

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: '20px 0px'}}> <AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={8}>
                    {
                        todolists.map((tl) => {
                            return (
                                <Grid item>
                                    <Paper style={{padding: '5px 0px 15px 20px'}}>
                                        <TodoList
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
