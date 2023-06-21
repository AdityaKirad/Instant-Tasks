import type { NextPage } from 'next'
import { useTodos } from '@/utils/store/Task.store'
import TaskGrid from '@/components/TaskGrid'

const Home:NextPage = () => {
  const {todos} = useTodos()
  return (
    <TaskGrid Todos={todos}/>
  )
}

export default Home