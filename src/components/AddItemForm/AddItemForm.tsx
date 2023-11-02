import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Add} from '@mui/icons-material';
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddItemPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemPropsType) => {

    const {
        title,
        error,
        onKeyPressHandler,
        onChangeHandler,
        addItem
    } = useAddItemForm(props.addItem) //кастомный хук, в котором вся логика


    return (
        <div className="inputForm">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <TextField value={title}
                           variant={'outlined'}
                           label={'Type value'}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                />
                <Button variant="text" onClick={addItem}><Add/></Button>
            </div>

        </div>
    )

})