import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm, AddItemPropsType} from "./AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {action} from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: { action: 'clicked' ,
        description: 'Button clicked inside form'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
};
const AddItemFormWithError = (props: AddItemPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>('Title is required')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter') {
            addItem();
        }
    }
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }
    }
    return (
        <div className="inputForm">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <TextField value={title}
                           variant={'outlined'}
                           label={'Type value'}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                />
                <Button variant="text" onClick={addItem}><Add/></Button>
            </div>

        </div>
    )

}
export const AddItemFormWithErrorStory: Story = {
    render: (args) => <AddItemFormWithError addItem={action('Button clicked inside form')}/>
}


