import React, {useEffect} from 'react';
import {TodoList} from '../Todolist/TodoList';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import ButtonAppBar from '../AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {useAppWithRedux} from "./hooks/useAppWithRedux";
import {TaskType} from "../../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTodolistsTC} from "../../state/todolists-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const {
        todolists,
        addTodolist,
        removeTodolist,
        changeFilter,
        changeTodolistTitle
    } = useAppWithRedux()

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

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
