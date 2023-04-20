import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskItemType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string,
    task: Array<TaskItemType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newInputTask: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType

}

export function TodoList(props: PropsType) {

    let [newInputTask, setInput] = useState('') // ставим useState, чтобы следить за изменением Input
    let [error, setError] = useState('')

    //Обработчик изменения значения value, setInput отображает изменение
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    // при нажатии Enter вызвать функцию AddTask
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTask();
        }
    }
    //из пропсов вызывает ф-цию addTask из App и передает измененное значение в Input
    const addTask = () => {
        if (newInputTask.trim() !== '') { // функция trim() удаляет пробелы с двух сторон
            props.addTask(newInputTask.trim());
            setInput('');  //делает Input пустым
        } else { // если пытаться добавить пустую строку
            setError('Title is required')

        }

    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')


    return (
        <div className="TodoList">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newInputTask}
                           onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''} // /если error !== "", то это true
                    />
                    <button onClick={addTask}>+</button>
                    {/*если error !== "", то есть равен true, то добавить div с текстом ошибки*/}
                    {error && <div className="error-message">Title is required</div>}
                </div>

                <ul>
                    {
                        props.task.map((task) => {
                            const removeTask = () => props.removeTask(task.id);
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked)


                            }
                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeStatusHandler}
                                />
                                <span>{task.title}</span>
                                <button onClick={removeTask}>✖</button>
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
        </div>
    );
}

