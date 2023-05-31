import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox} from '@mui/material';
import {ClearRounded} from '@mui/icons-material';
import {green, pink, purple} from '@mui/material/colors';

export type TaskItemType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    todolistId: string,
    title: string,
    task: Array<TaskItemType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void

}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)
    const removeTodolist = () => props.removeTodolist(props.todolistId)
    const addTask = (title: string) => props.addTask(title, props.todolistId)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistId)

    return (
        <div className="TodoList" style={{display: 'flex'}}>
            <div>
                <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>
                <AddItemForm addItem={addTask}/>

                <ul style={{listStyleType: 'none', paddingLeft: '20px'}}>
                    {
                        props.task.map((task) => {
                            const removeTask = () => props.removeTask(task.id, props.todolistId);
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(task.id, newValue, props.todolistId)
                            }
                            return <li key={task.id}
                                       className={task.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />

                                <EditableSpan title={task.title}
                                              onChange={onChangeTitleHandler}
                                />
                                <Button sx={{height: 30, width: 30}} onClick={removeTask}><ClearRounded
                                    sx={{fontSize: 18}}/></Button>
                            </li>
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
}

