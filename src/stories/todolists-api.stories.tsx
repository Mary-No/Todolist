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
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => {
                setState(res.data)
            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="TodolistID" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder="Task title" value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")


    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="TodolistID" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder="TaskID" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("title")
    const [description, setDescription] = useState<string>("description")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        })
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder="TodolistID" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder="TaskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder="Status" type="number" value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder="Priority" type="number" value={priority} onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <input placeholder="StartDate" value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
            <input placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}