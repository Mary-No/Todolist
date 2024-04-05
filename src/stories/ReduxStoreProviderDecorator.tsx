import React from 'react'
import {Provider} from "react-redux";
import {todolistsReducer} from "../components/Todolist/todolists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../components/Todolist/Task/tasks-reducer";
import {v1} from "uuid";
import {AppRootState} from "../components/App/store";
import {TaskStatuses} from "../api/todolists-api";
import {thunk} from "redux-thunk";
import {appReducer} from "../components/App/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",  entityStatus:'idle', addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus:'loading', addedDate: "",
            order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML", status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1"},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1"}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2"},
            {id: v1(), title: "React book", status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2"}
        ]
    },
    app:{
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}