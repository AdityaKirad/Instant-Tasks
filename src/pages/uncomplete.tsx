import type { NextPage } from 'next'
import { Todo } from '@/types'
import { useState, useEffect } from 'react'
import { useTodos } from '@/utils/store/Task.store'
import TaskGrid from '@/components/TaskGrid'

const UnComplete:NextPage = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const { todos } = useTodos()
    useEffect(() => {
        const todo = todos.filter(todo => !todo.completed)
        setTasks(todo)
    },[todos])
    return (
        <TaskGrid Todos={tasks}/>
    )
}

export default UnComplete