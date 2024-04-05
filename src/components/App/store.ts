import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../Todolist/todolists-reducer";
import {tasksReducer} from "../Todolist/Task/tasks-reducer";
import {thunk} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../../features/Login/auth-reducer";

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType <typeof rootReducer>


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store