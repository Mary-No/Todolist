import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {useCallback} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "../../../state/todolists-reducer";


export const useAppWithRedux = () => {
    const dispatch = useDispatch()
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
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return {
        todolists,
        addTodolist,
        removeTodolist,
        changeFilter,
        changeTodolistTitle
    }
}