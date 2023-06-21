import type { NextPage } from 'next'
import { Todo } from '@/types'
import { useState, useEffect } from 'react'
import { useTodos } from '@/utils/store/Task.store'
import dayjs from 'dayjs'
import TaskGrid from '@/components/TaskGrid'

const Today:NextPage = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const { todos } = useTodos()
    useEffect(() => {
        const todo = todos.filter(todo => dayjs().isSame(dayjs(todo.date), 'dates'))
        setTasks(todo)
    },[todos])
    return (
        <TaskGrid Todos={tasks}/>
    )
}

export default Today