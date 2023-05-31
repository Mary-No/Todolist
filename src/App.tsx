import React, {useState} from 'react';
import './App.css';
import {TaskItemType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import ButtonAppBar from './components/AppBar';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = { id: string, title: string, filter: FilterValuesType }
type TasksStateType = {
    [key: string]: Array<TaskItemType>
}

function App() {
    //[изменяемая переменная; функция которая меняет]=useState(начальное значение переменной)
    let todolistId_1 = v1();
    let todolistId_2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ]);


    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId_1]:
            [
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Redux', isDone: false}
            ],
        [todolistId_2]:
            [
                {id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Bred', isDone: true},
                {id: v1(), title: 'Potato', isDone: false},
                {id: v1(), title: 'Meat', isDone: true}
            ],

    })

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})   // setTasks(измененные данные) - поменяй на эти данные
    }

    //Принимает строку из Input
    function addTask(newInputTask: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        //формирует объект с id, title = newInputTask, isDone
        let newTask = {id: v1(), title: newInputTask, isDone: false};
        //добавляет этот объект первым к остальным таскам
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj})   // обновить данные на вот эти
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) { //если таска существует, не равна undefined
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.title = newValue;
            setTasks({...tasksObj})
        }
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }

    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let filterTodolist = todolists.find(todolist => todolist.id === todolistId);
        if (filterTodolist) {
            filterTodolist.filter = value;
        }
        setTodolists([...todolists])
    }

    function removeTodolist(todolistId: string) {
        let filterTodolist = todolists.filter(tl => tl.id !== todolistId);
        delete tasksObj[todolistId];
        setTodolists(filterTodolist)
        setTasks({...tasksObj})
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        tasksObj[newTodolistId] = [];
        setTasks({...tasksObj})

    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: '20px 0px'}}> <AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={8}>
                    {
                        todolists.map((tl) => {
                            let taskForTodolist = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                taskForTodolist = taskForTodolist.filter(t => !t.isDone)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '5px 0px 15px 20px'}}>
                                        <TodoList
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            task={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </Container>
        </div>
    );
}

export default App;
