import React, {useReducer} from 'react';
import './App.css';
import {TaskItemType, TodoList} from './TodoList';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TaskItemType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

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
