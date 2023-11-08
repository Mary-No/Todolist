import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('newTodolist')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b499c5a8-5ce6-4049-834f-da68b3668191"
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "73c75e40-56f1-45aa-82ab-12a32bd70c55"
        todolistsAPI.updateTodolist('UpdateTODO', todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "825bc49f-d6fc-4fa9-894c-3f6a8fe9f2ad"
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "825bc49f-d6fc-4fa9-894c-3f6a8fe9f2ad"
        const title = "NewTASK3"
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "825bc49f-d6fc-4fa9-894c-3f6a8fe9f2ad"
        const taskId = "8b3729b2-e51d-4488-9bd4-2b2b8b64f84d"
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "825bc49f-d6fc-4fa9-894c-3f6a8fe9f2ad"
        const taskId = "113ebc26-0779-4288-88c0-84eedb463d74"
        todolistsAPI.updateTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}