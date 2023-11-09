import React, {ChangeEvent, useCallback} from "react";
import {Button, Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {ClearRounded} from "@mui/icons-material";
import {TaskType} from "../Todolist/TodoList";
import {useTask} from "./hooks/useTask";
import {string} from "prop-types";

type TaskPropsType = {
    task: TaskType
    onChangeTitleHandler: (newValue: string) => void
    onChangeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    removeTask: () => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const {
        onRemoveTaskClick,
        onTitleChange,
        onStatusChange
    } = useTask(props.removeTask, props.onChangeTitleHandler, props.onChangeStatusHandler)
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