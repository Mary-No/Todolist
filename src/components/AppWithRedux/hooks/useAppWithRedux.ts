import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {useCallback} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "../../../state/todolists-reducer";
import {useAppDispatch} from "../../../hooks/useAppDispatch";


export const useAppWithRedux = () => {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)

    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return {
        todolists,
        addTodolist,
        removeTodolist,
        changeFilter,
        changeTodolistTitle
    }
}