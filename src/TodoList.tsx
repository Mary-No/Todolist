import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';

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

}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)
    const removeTodolist = () => {

        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    return (
        <div className="TodoList">
            <div>
                <h3>{props.title}</h3>
                <AddItemForm addItem={addTask}/>

                <ul>
                    {
                        props.task.map((task) => {
                            const removeTask = () => props.removeTask(task.id, props.todolistId);
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)
                                props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)


                            }
                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input className="checkbox"
                                       type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeStatusHandler}
                                />
                                <span>{task.title}</span>
                                <button className="deleteTaskBtn" onClick={removeTask}>✖</button>
                            </li>
                        })
                    }

                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
            <button className="deleteTodolistBtn" onClick={removeTodolist}>✖</button>
        </div>
    );
}

