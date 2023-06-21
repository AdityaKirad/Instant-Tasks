import type { NextPage } from 'next'
import { Todo } from '@/types'
import { useState, useEffect } from 'react'
import { useTodos } from '@/utils/store/Task.store'
import { useRouter } from 'next/router'
import TaskGrid from '@/components/TaskGrid'

const Directory:NextPage = () => {
    const { name } = useRouter().query
    const [tasks, setTasks] = useState<Todo[]>([])
    const { todos } = useTodos()
    useEffect(() => {
        const todo = todos.filter(todo => todo.directory === decodeURIComponent(name as string))
        setTasks(todo)
    },[todos, name])
    return (
        <TaskGrid Todos={tasks}/>
    )
}

export default Directory