import React, {ChangeEvent, useCallback} from "react";
import {Button, Checkbox} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {ClearRounded} from "@mui/icons-material";
import {TaskItemType} from "./TodoList";

type TaskPropsType = {
    task: TaskItemType
    onChangeTitleHandler: (newValue: string) => void
    onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    removeTask: () => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveTaskClick =  useCallback(()=>{
        props.removeTask()
    }, [])
    const onTitleChange =  useCallback((newValue: string)=>{
        props.onChangeTitleHandler(newValue)
    }, [])
    const onStatusChange =  (e: ChangeEvent<HTMLInputElement>)=>{
        props.onChangeStatusHandler(e)
    }
    return <li
        className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onStatusChange}
        />

        <EditableSpan title={props.task.title}
                      onChange={onTitleChange}
        />
        <Button sx={{height: 30, width: 30}} onClick={onRemoveTaskClick}><ClearRounded
            sx={{fontSize: 18}}/></Button>
    </li>

})