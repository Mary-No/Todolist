import React, {useState} from 'react';
import './App.css';
import {TaskItemType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
    //[изменяемая переменная; функция которая меняет]=useState(начальное значение переменной)

    let [tasks, setTasks] = useState<Array<TaskItemType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redax', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filterTasks = tasks.filter((t) => t.id !== id);
        setTasks(filterTasks)   // setTasks(измененные данные) - поменяй на эти данные
    }

    //Принимает строку из Input
    function addTask(newInputTask: string) {
        //формирует объект с id, title = newInputTask, isDone
        let newTask = {id: v1(), title: newInputTask, isDone: false};
        //добавляет этот объект первым к остальным таскам
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)   // обновить данные на вот эти
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) { //если таска существует, не равна undefined
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let taskForTodolist = tasks;
    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                task={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />


        </div>
    );
}

export default App;
