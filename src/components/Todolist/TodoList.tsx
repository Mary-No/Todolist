import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button} from '@mui/material';
import {ClearRounded} from '@mui/icons-material';
import {green, pink, purple} from '@mui/material/colors';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {Task} from "../Task/Task";
import {FilterValuesType} from "../../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";


// export type TaskType = {
//     id: string,
//     title: string,
//     status: TaskStatuses
// }
type PropsType = {
    todolistId: string,
    title: string,
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void

}

export const TodoList = React.memo(function(props: PropsType) {

    const dispatch = useDispatch()
    const tasksObj = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolistId), [props.changeFilter,props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolistId), [props.changeFilter,props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolistId), [props.changeFilter,props.todolistId])
    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, props.todolistId)), [dispatch, props.todolistId])
    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todolistId), [props.changeTodolistTitle,props.todolistId])

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
                            const removeTask = () =>  dispatch(removeTaskAC(task.id, props.todolistId))
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked? TaskStatuses.Completed: TaskStatuses.New, props.todolistId))
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                dispatch(changeTaskTitleAC(task.id, newValue, props.todolistId))
                            }

                            return <Task key={task.id} task={task} onChangeStatusHandler={onChangeStatusHandler} onChangeTitleHandler={onChangeTitleHandler} removeTask={removeTask}/>
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
