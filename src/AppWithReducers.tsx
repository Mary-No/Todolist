import React, {useReducer} from 'react';
// import './App.css';
// import {TaskItemType, TodoList} from './TodoList';
// import {v1} from 'uuid';
// import {AddItemForm} from './components/AddItemForm';
// import ButtonAppBar from './components/AppBar';
// import {Container, Grid, Paper} from '@mui/material';
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type FilterValuesType = 'all' | 'completed' | 'active';
// export type TodolistType = { id: string, title: string, filter: FilterValuesType }
// export type TasksStateType = {
//     [key: string]: Array<TaskItemType>
// }
//
// function AppWithReducers() {
//     //[изменяемая переменная; функция которая меняет]=useState(начальное значение переменной)
//     let todolistId_1 = v1();
//     let todolistId_2 = v1();
//     let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
//         {id: todolistId_1, title: 'What to learn', filter: 'all'},
//         {id: todolistId_2, title: 'What to buy', filter: 'all'},
//     ]);
//
//
//     let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
//         [todolistId_1]:
//             [
//                 {id: v1(), title: 'CSS', isDone: true},
//                 {id: v1(), title: 'JS', isDone: true},
//                 {id: v1(), title: 'React', isDone: false},
//                 {id: v1(), title: 'Redux', isDone: false}
//             ],
//         [todolistId_2]:
//             [
//                 {id: v1(), title: 'Milk', isDone: false},
//                 {id: v1(), title: 'Bred', isDone: true},
//                 {id: v1(), title: 'Potato', isDone: false},
//                 {id: v1(), title: 'Meat', isDone: true}
//             ],
//
//     })
//
//     function removeTask(id: string, todolistId: string) {
//         const action = removeTaskAC(id, todolistId)
//         dispatchToTasksReducer(action)
//     }
//
//     //Принимает строку из Input
//     function addTask(newInputTask: string, todolistId: string) {
//         const action = addTaskAC(newInputTask, todolistId)
//         dispatchToTasksReducer(action)
//     }
//
//     function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
//         const action = changeTaskStatusAC(taskId, isDone, todolistId)
//         dispatchToTasksReducer(action)
//     }
//
//     function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
//         const action = changeTaskTitleAC(taskId, newValue, todolistId)
//         dispatchToTasksReducer(action)
//     }
//
//     function changeTodolistTitle(newTitle: string, todolistId: string) {
//         const action = changeTodolistTitleAC(newTitle, todolistId)
//         dispatchToTodolistsReducer(action)
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         const action = changeTodolistFilterAC(value, todolistId)
//         dispatchToTodolistsReducer(action)
//     }
//
//     function removeTodolist(todolistId: string) {
//         const action = removeTodolistAC(todolistId)
//         dispatchToTasksReducer(action)
//         dispatchToTodolistsReducer(action)
//     }
//
//     function addTodolist(title: string) {
//         const action = addTodolistAC(title)
//         dispatchToTasksReducer(action)
//         dispatchToTodolistsReducer(action)
//     }
//
//     return (
//         <div className="App">
//             <ButtonAppBar/>
//             <Container fixed>
//                 <Grid container style={{margin: '20px 0px'}}> <AddItemForm addItem={addTodolist}/></Grid>
//                 <Grid container spacing={8}>
//                     {
//                         todolists.map((tl) => {
//                             let taskForTodolist = tasksObj[tl.id];
//                             if (tl.filter === 'completed') {
//                                 taskForTodolist = taskForTodolist.filter(t => t.isDone)
//                             }
//                             if (tl.filter === 'active') {
//                                 taskForTodolist = taskForTodolist.filter(t => !t.isDone)
//                             }
//                             return (
//                                 <Grid item>
//                                     <Paper style={{padding: '5px 0px 15px 20px'}}>
//                                         <TodoList
//                                             key={tl.id}
//                                             todolistId={tl.id}
//                                             title={tl.title}
//                                             task={taskForTodolist}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeStatus={changeStatus}
//                                             filter={tl.filter}
//                                             removeTodolist={removeTodolist}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodolistTitle={changeTodolistTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
