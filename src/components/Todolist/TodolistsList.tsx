import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {Grid, Paper} from '@mui/material';
import {useSelector} from "react-redux";
import {AppRootState} from "../App/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC, FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useAppDispatch} from "../App/hooks/useAppDispatch";
import {Todolist} from "./Todolist";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())

    }, [])


    //Add Todolist
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    //Remove Todolist
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [])

    //Change Todolist Title
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(title, id))
    }, [])

    //Change Filter
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [])


    return (
        <div>
            <Grid container style={{margin: '20px 0px'}}><AddItemForm addItem={addTodolist}/></Grid>
            <Grid container spacing={8}>
                {
                    todolists.map((tl) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '5px 0px 15px 20px'}}>
                                    <Todolist
                                        todolist = {tl}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>

    );
}
