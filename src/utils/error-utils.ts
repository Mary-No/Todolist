import {
    setAppErrorAC, SetAppErrorActionType,
    setAppStatusAC, SetAppStatusActionType,
} from "../components/App/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (error: any, dispatch: ThunkDispatch) => {
    dispatch(setAppErrorAC(error.message? error.message: 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>