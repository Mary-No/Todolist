import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Add} from '@mui/icons-material';
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddItemPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemPropsType) => {

    const {
        title,
        error,
        onKeyPressHandler,
        onChangeHandler,
        addItemHandler
    } = useAddItemForm(addItem) //кастомный хук, в котором вся логика


    return (
        <div className="inputForm">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <TextField value={title}
                           disabled={disabled}
                           variant={'outlined'}
                           label={'Type value'}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                />
                <Button variant="text" disabled={disabled} onClick={addItemHandler}><Add/></Button>
            </div>

        </div>
    )

})