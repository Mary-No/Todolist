import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '@mui/material';
import {ClearRounded} from '@mui/icons-material';
import {green, pink, purple} from '@mui/material/colors';
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "./Task/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "../App/store";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {useAppDispatch} from "../App/hooks/useAppDispatch";


type PropsType = {
    todolist: TodolistDomainType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    demo?: boolean

}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (demo) {
    //         return
    //     }
    //     dispatch(fetchTasksTC(props.todolist.id))
    //
    // }, [])

    //все таски тудулиста по props.todolist.id
    const tasksObj = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolist.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])

    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])

    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])

    //Add Task
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }, [])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    let allTodolistTasks = tasksObj;
    let tasksForTodolists = allTodolistTasks;
    if (props.todolist.filter === 'completed') {
        tasksForTodolists = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolists = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div className="TodoList" style={{display: 'flex'}}>
            <div>
                <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/></h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus==='loading'}/>

                <ul style={{listStyleType: 'none', paddingLeft: '20px'}}>
                    {
                        tasksForTodolists.map((task) => {

                            //RemoveTask
                            const removeTask = () => {
                                dispatch(removeTaskTC(props.todolist.id, task.id))
                            }

                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(updateTaskTC(props.todolist.id, task.id, {status: e.currentTarget.checked ? 2 : 0}))
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                dispatch(updateTaskTC(props.todolist.id, task.id, {title: newValue}))
                            }

                            return <Task key={task.id}
                                         task={task}
                                         onChangeStatusHandler={onChangeStatusHandler}
                                         onChangeTitleHandler={onChangeTitleHandler}
                                         removeTask={removeTask}/>
                        })
                    }

                </ul>
                <div>
                    <Button sx={{color: purple[600]}} variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button sx={{color: pink[500]}} variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button sx={{color: green[700]}} variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
            <Button sx={{height: 40, width: 40}} onClick={removeTodolist} disabled={props.todolist.entityStatus==='loading'}><ClearRounded sx={{fontSize: 24}}/></Button>

        </div>
    );
})
