import type { NextPage } from 'next'
import { Todo } from '@/types'
import { useState, useEffect } from 'react'
import { useTodos } from '@/utils/store/Task.store'
import { useRouter } from 'next/router'
import TaskGrid from '@/components/TaskGrid'

const Results:NextPage = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const { todos } = useTodos()
    const { search } = useRouter().query
    useEffect(() => {
        const todo = todos.filter(todo => todo.title.toLowerCase().includes(decodeURIComponent(search as string).toLowerCase()))
        setTasks(todo)
    },[todos, search])
    return (
        <TaskGrid Todos={tasks}/>
    )
}

export default Results