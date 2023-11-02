import {ChangeEvent, useCallback} from "react";

export const useTask = (removeTask: () => void, onChangeTitleHandler: (newValue: string) => void, onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void) => {

    const onRemoveTaskClick = useCallback(() => {
        removeTask()
    }, [])
    const onTitleChange = useCallback((newValue: string) => {
        onChangeTitleHandler(newValue)
    }, [])
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeStatusHandler(e)
    }
    return {
        onRemoveTaskClick,
        onTitleChange,
        onStatusChange
    }
}