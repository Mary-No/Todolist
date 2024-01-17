import React from 'react'
import {Provider} from "react-redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";
import {AppRootState} from "../state/store";
import {TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "",
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
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}