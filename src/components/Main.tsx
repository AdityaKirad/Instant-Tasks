import type { ReactNode } from 'react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Avatar, IconButton, Typography, Button, Select, MenuItem, useMediaQuery } from '@mui/material';
import { Menu, List, Apps } from '@mui/icons-material';
import { useTodos } from '@/utils/store/Task.store';
import { GridViewContext } from '@/context/viewContext';
import { TodosSortContext } from '@/context/TodosSortContext';
import { PathNames } from '@/types';
import TaskSearchField from '@/components/TaskSearchField';
import NavigationDrawer from '@/components/NavigationDrawer';
import TodayTasksDrawer from '@/components/TodayTasksDrawer';
import AddAndEditTaskPopup from '@/components/AddAndEditTaskPopup';
import dayjs from 'dayjs';

const Main = ({children}: {children: ReactNode}) => {
    const [navigationDrawer, setNavigationDrawer] = useState(false);
    const [todayTaskDrawer, setTodayTaskDrawer] = useState(false);
    const [gridView, setGridView] = useState(true);
    const [addTaskPopup, setAddTaskPopup] = useState(false)
    const [task, setTask] = useState('');
    const [sortBy, setSortBy] = useState('Sort by')

    const router = useRouter()
    const currentPath = decodeURIComponent(router.asPath);
    const {id, name, search} = router.query
    const isMobile = useMediaQuery('(max-width: 639px)');
    const isTablet = useMediaQuery('(max-width: 767px)')
    const isLaptop = useMediaQuery('(max-width: 1279px)')
    const {todos} = useTodos()
    useEffect(() => {
        if(currentPath === '/') setTask(`All Tasks (${todos.length})`)
        else if (currentPath === '/today') setTask(`Today's Tasks (${todos.filter(todo => dayjs().isSame(dayjs(todo.date), 'dates')).length})`)
        else if (currentPath === '/important') setTask(`Important Tasks (${todos.filter(todo => todo.important).length})`)
        else if (currentPath === '/completed') setTask(`Completed Tasks (${todos.filter(todo => todo.completed).length})`)
        else if (currentPath === '/uncomplete') setTask(`Incomplete Tasks (${todos.filter(todo => !todo.completed).length})`)
        else if (currentPath === `/dir/${name}`) setTask(`${name} tasks (${todos.filter(todo => todo.directory === name).length})`)
        else if (currentPath === `/task/${id}`) setTask(`${todos.find(todo => todo.id === parseInt(id as string))?.title} (${todos.filter(todo => todo.id === parseInt(id as string)).length})`)
        else if (currentPath === `/results?search=${search}`) setTask(`Results for "${search}" (${todos.filter(todo => todo.title.includes(search as string)).length})`)
        else setTask(`All Tasks (${todos.length})`)
    },[currentPath, todos, name, id, search])
    return (
        <GridViewContext.Provider value={gridView}>
            <TodosSortContext.Provider value={sortBy}>
                <Box display='flex' flexDirection='column' width={isLaptop ? '100%' : '60%'} padding='0 0.625rem 0.625rem' gap='0.625rem' marginX='auto'>
                    <Box display='flex' justifyContent='space-between' alignItems='center' position='sticky' top='0' zIndex='1' bgcolor='#222831' paddingY='0.625rem'>
                        <Box display='flex' gap='0.625rem'>
                            <IconButton onClick={() => setNavigationDrawer(true)} sx={{display: isLaptop ? 'initial' : 'none'}}>
                                <Menu />
                            </IconButton>
                            {isLaptop && <NavigationDrawer open={navigationDrawer} onClose={() => setNavigationDrawer(false)}/>}
                            <Box sx={{display: !isLaptop || !isTablet ? 'initial' : 'none'}}>
                                <TaskSearchField />
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' alignItems='center'>
                            <Typography fontWeight={700} fontSize='1.25rem' sx={{display: isLaptop ? 'initial' : 'none'}}>Instant Tasks</Typography>
                            <Typography>{dayjs().format('YYYY, MMM DD')}</Typography>
                        </Box>
                        <Box display='flex' gap='.625rem'>
                            <Button variant='contained'sx={isMobile ? { position: 'fixed', bottom: '5%', right: '5%', zIndex: 1 } : null} onClick={() => setAddTaskPopup(true)}>Add new task</Button>
                        <Avatar src='download.jpg'alt='avatar'sx={{display: isLaptop ? 'initial' : 'none'}} onClick={() => setTodayTaskDrawer(true)}/>
                        {isLaptop && <TodayTasksDrawer open={todayTaskDrawer} onClose={() => setTodayTaskDrawer(false)} />}
                        </Box>
                    </Box>
                    <Box sx={{display: isTablet ? 'initial' : 'none', paddingBlock: '0.625rem', position: 'sticky', top: 0, zIndex: 1, background: '#222831'}}>
                        <TaskSearchField />
                    </Box>
                    <Typography>{task}</Typography>
                    <Box display='flex' alignItems='center' padding='0 0.625rem'>
                        <Button variant='text' sx={{outline: !gridView ? '0.125rem solid white' : 'initial'}} onClick={() => setGridView(false)}>
                            <List />
                        </Button>
                        <Button variant='text' sx={{outline: gridView ? '0.125rem solid white' : 'initial'}} onClick={() => setGridView(true)}>
                            <Apps />
                        </Button>
                        <Select value={sortBy} sx={{marginInline: 'auto 0'}} onChange={e => setSortBy(e.target.value)}>
                            <MenuItem value="Sort by">Sort by</MenuItem>
                            <MenuItem value="Earlier First">Earlier First</MenuItem>
                            <MenuItem value="Later First">Later First</MenuItem>
                            <MenuItem value="Completed First">Completed First</MenuItem>
                            <MenuItem value="Uncompleted First">Uncompleted First</MenuItem>
                        </Select>
                    </Box>
                    {children}
                    {addTaskPopup && <AddAndEditTaskPopup open={addTaskPopup} onClose={() => setAddTaskPopup(false)} />}
                </Box>
            </TodosSortContext.Provider>
        </GridViewContext.Provider>
    )
}

export default Main