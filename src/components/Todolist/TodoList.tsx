import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '@mui/material';
import {ClearRounded} from '@mui/icons-material';
import {green, pink, purple} from '@mui/material/colors';
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {Task} from "./Task/Task";
import {changeTodolistTitleTC, FilterValuesType, removeTodolistTC} from "../../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {useAppDispatch} from "../../hooks/useAppDispatch";


type PropsType = {
    todolistId: string,
    title: string,
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void

}

export const TodoList = React.memo(function (props: PropsType) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    //все таски тудулиста по props.todolistId
    const tasksObj = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolistId), [props.changeFilter, props.todolistId])

    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolistId), [props.changeFilter, props.todolistId])

    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolistId), [props.changeFilter, props.todolistId])

    //Remove Todolist
    const removeTodolist = () => {
        dispatch(removeTodolistTC(props.todolistId))
    }

    //Add Task
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolistId, title))
    }, [])

    //Change Todolist Title
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(title, props.todolistId))
    }, [props.todolistId])

    let allTodolistTasks = tasksObj;
    let tasksForTodolists = allTodolistTasks;
    if (props.filter === 'completed') {
        tasksForTodolists = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        tasksForTodolists = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div className="TodoList" style={{display: 'flex'}}>
            <div>
                <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>
                <AddItemForm addItem={addTask}/>

                <ul style={{listStyleType: 'none', paddingLeft: '20px'}}>
                    {
                        tasksForTodolists.map((task) => {

                            //RemoveTask
                            const removeTask = () => {
                                dispatch(removeTaskTC(props.todolistId, task.id))
                            }

                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(updateTaskTC(props.todolistId, task.id, {status: e.currentTarget.checked ? 2 : 0}))
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                dispatch(updateTaskTC(props.todolistId, task.id, {title:newValue}))
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
                    <Button sx={{color: purple[600]}} variant={props.filter === 'all' ? 'outlined' : 'text'}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button sx={{color: pink[500]}} variant={props.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button sx={{color: green[700]}} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
            <Button sx={{height: 40, width: 40}} onClick={removeTodolist}><ClearRounded sx={{fontSize: 24}}/></Button>

        </div>
    );
})
