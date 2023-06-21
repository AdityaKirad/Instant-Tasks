import type { NextPage } from 'next'
import { Todo } from '@/types'
import { useState, useEffect } from 'react'
import { useTodos } from '@/utils/store/Task.store'
import { useRouter } from 'next/router'
import TaskGrid from '@/components/TaskGrid'

const SpecificTodo:NextPage = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const { todos } = useTodos()
    const { id } = useRouter().query
    useEffect(() => {
        const todo = todos.filter(todo => todo.id === parseInt(decodeURIComponent(id as string)))
        setTasks(todo)
    },[todos, id])
    return (
        <TaskGrid Todos={tasks}/>
    )
}

export default SpecificTodo