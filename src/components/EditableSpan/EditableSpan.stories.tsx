import type { Meta, StoryObj } from '@storybook/react';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {action} from '@storybook/addon-actions'
import {EditableSpan} from "./EditableSpan";


const meta: Meta<typeof EditableSpan> = {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onChange:{
            action: 'clicked',
            discription: 'Value EditableSpan onChanged'
        },
        title: {
            description: 'Start value EditableSpan',
        }
    },
    args:{
        title: 'HTML'
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};



