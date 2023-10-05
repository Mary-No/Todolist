import type { Meta, StoryObj } from '@storybook/react';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {id: '234dfg', title: "JS", isDone: true},
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
        task: {id: '2344dfg', title: "HTML", isDone: false}
    }
};
const TaskPresentation = () => {
    const [task, setTask] = useState({id: '264dfg', title: "CSS", isDone: false})
    return <Task
        task={task}
        onChangeTitleHandler = {(title) => {setTask({...task, title: title})}}
        onChangeStatusHandler = {() => {setTask({...task, isDone: !task.isDone})}}
        removeTask={action("removeTask")}
    />
}

export const TaskPresentationStory: Story = {
    render: () => <TaskPresentation/>
}