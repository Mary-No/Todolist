import React, {useEffect} from 'react';
import {TodoList} from '../Todolist/TodoList';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import ButtonAppBar from '../AppBar';
import {Container, Grid, LinearProgress, Paper} from '@mui/material';
import {useApp} from "./hooks/useApp";
import {TaskType} from "../../api/todolists-api";
import {fetchTodolistsTC} from "../Todolist/todolists-reducer";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {ErrorSnackBar} from "../ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app.reducer";
import {AppRootState} from "./store";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const {
        todolists,
        addTodolist,
        removeTodolist,
        changeFilter,
        changeTodolistTitle
    } = useApp()

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <ErrorSnackBar/>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Grid container style={{margin: '20px 0px'}}> <AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={8}>
                    {
                        todolists.map((tl) => {
                            return (
                                <Grid item  key={tl.id}>
                                    <Paper style={{padding: '5px 0px 15px 20px'}}>
                                        <TodoList
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

export default App;
