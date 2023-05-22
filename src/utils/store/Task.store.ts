import {create} from 'zustand'
import {createJSONStorage, persist, devtools, PersistOptions} from 'zustand/middleware'
import dayjs from 'dayjs'
import {Todo, TodosProps} from '@/types/index'

const initialTodos: Todo[] = [
    {
        id: Math.ceil(Math.random() * 100000000),
        directory: 'Main',
        title: 'Task 1',
        date: dayjs('2023-02-26'),
        description: 'This is description for the task',
        important: false,
        completed: true
    },
    {
        id: Math.ceil(Math.random() * 100000000),
        directory: 'Main',
        title: 'Task 2',
        date: dayjs('2023-04-03'),
        description: 'This is description for the task',
        important: true,
        completed: true
    },
    {
        id: Math.ceil(Math.random() * 100000000),
        directory: 'Main',
        title: 'Task 3',
        date: dayjs('2023-08-03'),
        description: 'This is description for the task',
        important: true,
        completed: false
    }
]

const useTodos = create(
    devtools (
        persist (
            (set, get) => ({
                todos: [],

                directories: ['Main', 'Primary'],

                addDirectory: (directoryName) => set({directories: [...get().directories, directoryName]}),

                editDirectory: (oldName, newName) => set({
                    directories: get().directories.map((item) =>
                        item === oldName ? newName : item
                    ),
                }),

                deleteDirectory: (directoryName) => set({
                    directories: get().directories.filter(item => item !== directoryName),
                    todos: get().todos.filter(item => item.directory !== directoryName)
                }),

                addTodo: (todo) => set({todos: [...get().todos, todo]}),

                editTodo: (id, todo) => set({
                    todos: get().todos.map((task) => 
                        task.id === id ? {...task, ...todo, id} : task
                    ),
                }),

                deleteTodo: (id) => set({
                    todos: get().todos.filter((task) => task.id !== id)
                }),

                deleteAllData: () => set({todos: [], directories: ['Main']}),

                toggleImportant: (id) => set({
                    todos: get().todos.map((task) =>
                        task.id === id ? {...task, important: !task.important} : task
                    ),
                }),

                toggleCompleted: (id) => set({
                    todos: get().todos.map((task) =>
                        task.id === id ? {...task, completed: !task.completed} : task
                    ),
                })
            }),
            {
                name: 'todos',
                version: 1,
                storage: createJSONStorage(() => localStorage),
                whitelist: ['todos', 'directories'] as const,
                onRehydrateStorage: () => {
                    return (state, error) => {
                        if(state) {
                            if(state?.todos && state?.todos.length > 0) {
                                const value = JSON.parse(localStorage.getItem('todos')!)
                                state.todos = value.state.todos
                            } else {
                                state.todos = [...initialTodos]
                            }
                        }
                        if(error) {
                            console.log('Error encountered during the hydration', error)
                        }
                    }
                }
            } as PersistOptions<TodosProps, TodosProps>
        )
    )
)

export {useTodos}