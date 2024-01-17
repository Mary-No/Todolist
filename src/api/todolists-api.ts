import axios from 'axios';

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '234c9bba-18f8-4dd2-860f-665d9f96e11c'
    }
})
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}

export type TaskType = {
    description: string,
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
export type getTasksResponse = {
    error: string | null,
    totalCount: number,
    items: Array<TaskType>
}
export type updateTaskParam = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(title: string, todolistId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },

    getTasks(todolistId: string) {
        return instance.get<getTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, param: updateTaskParam){
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, param)
    }
}