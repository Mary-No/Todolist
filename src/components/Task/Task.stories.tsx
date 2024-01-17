import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {
            id: '234dfg',
            todoListId: "todolistId2",
            title: "JS",
            status: TaskStatuses.New,
            addedDate: "",
            order: 0,
            description: "",
            priority: 0,
            startDate: "",
            deadline: "",
        },
        onChangeTitleHandler: action("onChangeTitleHandler"),
        onChangeStatusHandler: action("onChangeStatusHandler"),
        removeTask: action("removeTask")
    }

};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {
            id: '2344dfg',
            todoListId: "todolistId2",
            title: "HTML",
            status: TaskStatuses.Completed,
            addedDate: "",
            order: 0,
            description: "",
            priority: 0,
            startDate: "",
            deadline: "",
        }
    }
};
const TaskPresentation = () => {
    const [task, setTask] = useState({
        id: '264dfg', title: "CSS", status: TaskStatuses.Completed, addedDate: "", order: 0,
        todoListId: "todolistId2",
        description: "",
        priority: 0,
        startDate: "",
        deadline: "",
    })
    return <Task
        task={task}
        onChangeTitleHandler={(title) => {
            setTask({...task, title: title})
        }}
        onChangeStatusHandler={() => {
            setTask({
                ...task,
                status: task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed
            })
        }}
        removeTask={action("removeTask")}
    />
}

export const TaskPresentationStory: Story = {
    render: () => <TaskPresentation/>
}