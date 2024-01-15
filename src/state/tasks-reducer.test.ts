import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../components/AppWithRedux/AppWithRedux';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskStatuses} from "../api/todolists-api";

const startState: TasksStateType = {

    'todolistId1': [
        {
            description: 'jjj',
            title: 'CSS',
            completed: true,
            priority: 0,
            status: TaskStatuses.New,
            startDate: 'hhh',
            deadline: 'mmm',
            id: '1',
            order: 1,
            addedDate: 'dd'
        },
        {
            description: 'jjj',
            title: 'JS',
            completed: true,
            priority: 0,
            status: TaskStatuses.Completed,
            startDate: 'hhh',
            deadline: 'mmm',
            id: '2',
            order: 1,
            addedDate: 'dd'
        },
        {
            description: 'jjj',
            title: 'React',
            completed: true,
            priority: 0,
            status: TaskStatuses.New,
            startDate: 'hhh',
            deadline: 'mmm',
            id: '3',
            order: 1,
            addedDate: 'dd'
        },
    ],
    'todolistId2': [
        {
            description: 'jjj',
            title: 'bread',
            completed: true,
            priority: 0,
            status: TaskStatuses.New,
            startDate: 'hhh',
            deadline: 'mmm',
            id: '1',
            order: 1,
            addedDate: 'dd'
        },
        {
            description: 'jjj',
            title: 'milk',
            completed: true,
            priority: 0,
            status: TaskStatuses.Completed,
            startDate: 'hhh',
            deadline: 'mmm',
            id: '2',
            order: 1,
            addedDate: 'dd'
        }, {
            description: 'jjj',
            title: 'tea',
            completed: true,
            priority: 0,
            status: TaskStatuses.New,
            startDate: 'hhh',
            deadline: 'mmm',
            id: '3',
            order: 1,
            addedDate: 'dd'
        }
    ]
}
test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                description: 'jjj',
                title: 'CSS',
                completed: true,
                priority: 0,
                status: TaskStatuses.New,
                startDate: 'hhh',
                deadline: 'mmm',
                id: '1',
                order: 1,
                addedDate: 'dd'
            },
            {
                description: 'jjj',
                title: 'JS',
                completed: true,
                priority: 0,
                status: TaskStatuses.Completed,
                startDate: 'hhh',
                deadline: 'mmm',
                id: '2',
                order: 1,
                addedDate: 'dd'
            },
            {
                description: 'jjj',
                title: 'React',
                completed: true,
                priority: 0,
                status: TaskStatuses.New,
                startDate: 'hhh',
                deadline: 'mmm',
                id: '3',
                order: 1,
                addedDate: 'dd'
            }
        ],
        'todolistId2': [
            {
                description: 'jjj',
                title: 'bread',
                completed: true,
                priority: 0,
                status: TaskStatuses.New,
                startDate: 'hhh',
                deadline: 'mmm',
                id: '1',
                order: 1,
                addedDate: 'dd'
            },
            {
                description: 'jjj',
                title: 'tea',
                completed: true,
                priority: 0,
                status: TaskStatuses.New,
                startDate: 'hhh',
                deadline: 'mmm',
                id: '3',
                order: 1,
                addedDate: 'dd'
            }
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)

})


test('title of specified task should be changed', () => {


    const action = changeTaskTitleAC('2', 'blabla', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('blabla')
    expect(endState['todolistId1'][1].title).toBe('JS')

})

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            }
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: "", order: 0,
                description: "",
                priority: 0,
                startDate: "",
                deadline: "",
            }
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
test('tasks should be added for todolist', () => {
    const action = setTasksAC(
        'todolistId1',
        startState['todolistId1']
        )
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)

})
