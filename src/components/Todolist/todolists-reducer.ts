import {Dispatch} from 'redux';
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../App/app.reducer";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus:'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus:'idle'}))

        default:
            return state
    }
}

//ActionCreators
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

//ThunkCreators
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                const action = removeTodolistAC(todolistId)
                dispatch(action)
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                const action = addTodolistAC(res.data.data.item)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistsAPI.updateTodolist(title, todolistId)
            .then(res => {
                const action = changeTodolistTitleAC(title, todolistId)
                dispatch(action)
            })
    }
}

//Types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
