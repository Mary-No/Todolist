import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
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
            <div className="input">
                <input value={title}
                       onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''} // /если error !== "", то это true
                />
                <button className="addBtn" onClick={addItem}>+</button>
            </div>

            {/*если error !== "", то есть равен true, то добавить div с текстом ошибки*/}
            {error && <div className="error-message">Title is required</div>}
        </div>
    )

}