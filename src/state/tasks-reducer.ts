import {v1} from 'uuid';
import {TaskStatuses} from '../api/todolists-api';
import {TasksStateType} from '../components/AppWithRedux/AppWithRedux'
import {AddTodolistActionType, RemoveTodolistActionType, todolistId_1, todolistId_2} from './todolists-reducer';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    status: TaskStatuses,
    todolistId: string,
    taskId: string
}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TasksStateType = {
    [todolistId_1]:
        [
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                addedDate: "",
                order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_1
            },
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_1},
            {id: v1(), title: 'React', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_1},
            {id: v1(), title: 'Redux', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_1}
        ],
    [todolistId_2]:
        [
            {id: v1(), title: 'Milk', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_2},
            {id: v1(), title: 'Bred', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_2},
            {id: v1(), title: 'Potato', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_2},
            {id: v1(), title: 'Meat', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todolistId: todolistId_2}
        ],

}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter((t) => t.id !== action.taskId);
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                addedDate: "",
                order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: ""
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t);
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, taskId, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, taskId, todolistId}
}