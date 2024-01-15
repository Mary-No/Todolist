import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk} from "redux-thunk";

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType <typeof rootReducer>


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store