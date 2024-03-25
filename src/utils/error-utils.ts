import {
    setAppErrorAC,
    setAppStatusAC,
} from "../components/App/app.reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {ThunkDispatchType} from "../components/Todolist/Task/tasks-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ThunkDispatchType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = <D>(error: any, dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppErrorAC(error.message? error.message: 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}