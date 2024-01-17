import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, updateTaskParam} from '../api/todolists-api';
import {TasksStateType} from '../components/AppWithRedux/AppWithRedux'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistId_1,
    todolistId_2
} from './todolists-reducer';
import {Dispatch} from "redux";
import {AppRootState} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType


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
                todoListId: todolistId_1
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_1
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_1
            },
            {
                id: v1(), title: 'Redux', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_1
            }
        ],
    [todolistId_2]:
        [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_2
            },
            {
                id: v1(), title: 'Bred', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_2
            },
            {
                id: v1(), title: 'Potato', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_2
            },
            {
                id: v1(), title: 'Meat', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
                todoListId: todolistId_2
            }
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
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case 'UPDATE-TASK': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model:UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, taskId, todolistId}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}

//ThunkCreators
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(!task){
            throw new Error('task not found in the state')
        }
        const apiModel: updateTaskParam = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        };
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}