import TaskSearchField from '@/components/TaskSearchField';
import NavigationDrawer from '@/components/NavigationDrawer';
import TodayTasksDrawer from '@/components/TodayTasksDrawer';
import AddAndEditTaskPopup from './AddAndEditTaskPopup';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { ReactNode, FC, useState, useEffect } from 'react';
import { Box, Avatar, IconButton, Typography, Button, useMediaQuery } from '@mui/material';
import { Menu, List, Apps } from '@mui/icons-material';
import { useTodos } from '@/utils/store/Task.store';
import { useFilterdTodos } from '@/hooks/useFilterdTodos';
import { GridViewContext } from '@/context/viewContext';
import { PathNames } from '@/types';

const Main:FC<{children: ReactNode}> = ({children}) => {
    const [navigationDrawer, setNavigationDrawer] = useState(false);
    const [todayTaskDrawer, setTodayTaskDrawer] = useState(false);
    const [task, setTask] = useState('');
    const [gridView, setGridView] = useState(true);
    const [addTaskPopup, setAddTaskPopup] = useState(false)

    const currentPath = useRouter().asPath;
    const isMobile = useMediaQuery('(max-width: 639px)');
    const isTablet = useMediaQuery('(max-width: 767px)')
    const isLaptop = useMediaQuery('(max-width: 1279px)')

    const {todos} = useTodos()
    const {filterdTodos} = useFilterdTodos();

    useEffect(() => {
        const defaultPathStrings: PathNames = {
            '/': 'All Tasks',
            '/today': "Today's Tasks",
            '/important': 'Important Tasks',
            '/completed': 'Completed Tasks',
            '/uncomplete': 'Incomplete Tasks'
        }
        const path = currentPath.split('/');
        let taskStrings = '';
        const taskCount = filterdTodos.length
        if(path.length === 3) {
            if(path[1] === 'task')
            taskStrings = todos.find(todo => todo.id === parseInt(path[2]))?.title as string
            else if(path[1] === 'dir')
            taskStrings = path[2].charAt(0).toUpperCase() + path[2].slice(1).toLowerCase()
        } else { 
            taskStrings = defaultPathStrings[currentPath] || defaultPathStrings['/']
        }
        setTask(`${taskStrings} (${taskCount} ${taskCount <= 1 ? 'task' : 'tasks'})`)
    },[currentPath, filterdTodos, todos])
    return (
        <GridViewContext.Provider value={gridView}>
                <Box display='flex' flexDirection='column'width={isLaptop ? '100%' : '60%'} padding='0 0.625rem 0.625rem' gap='0.625rem' marginX='auto'>
                <Box display='flex' justifyContent='space-between' alignItems='center' position='sticky' top='0' zIndex='1' bgcolor='#222831' paddingY='0.625rem'>
                    <Box display='flex' gap='0.625rem'>
                        <IconButton onClick={() => setNavigationDrawer(true)} sx={{display: isLaptop ? 'initial' : 'none'}}>
                            <Menu />
                        </IconButton>
                        {navigationDrawer && <NavigationDrawer open={navigationDrawer} onClose={() => setNavigationDrawer(false)}/>}
                        <Box sx={{display: !isLaptop || !isTablet ? 'initial' : 'none'}}>
                            <TaskSearchField />
                        </Box>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <Typography fontWeight={700} fontSize='1.25rem' sx={{display: isLaptop ? 'initial' : 'none'}}>nTask</Typography>
                        <Typography>{dayjs().format('YYYY, MMM DD')}</Typography>
                    </Box>
                    <Box display='flex' gap='.625rem'>
                        <Button variant='contained'sx={isMobile ? { position: 'fixed', bottom: '5%', right: '5%', zIndex: 1 } : null} onClick={() => setAddTaskPopup(true)}>Add new task</Button>
                    <Avatar src='download.jpg'alt='avatar'sx={{display: isLaptop ? 'initial' : 'none'}} onClick={() => setTodayTaskDrawer(true)}/>
                    {todayTaskDrawer && <TodayTasksDrawer open={todayTaskDrawer} onClose={() => setTodayTaskDrawer(false)} />}
                    </Box>
                </Box>
                <Box sx={{display: isTablet ? 'initial' : 'none', paddingBlock: '0.625rem', position: 'sticky', top: 0, zIndex: 1, background: '#222831'}}>
                    <TaskSearchField />
                </Box>
                <Typography textAlign='center'>{task}</Typography>
                <Box display='flex' alignItems='center' padding='0 0.625rem'>
                    <Button variant='text' sx={{outline: !gridView ? '0.125rem solid white' : 'initial'}} onClick={() => setGridView(false)}>
                        <List />
                    </Button>
                    <Button variant='text' sx={{outline: gridView ? '0.125rem solid white' : 'initial'}} onClick={() => setGridView(true)}>
                        <Apps />
                    </Button>
                </Box>
                {children}
                {addTaskPopup && <AddAndEditTaskPopup open={addTaskPopup} onClose={() => setAddTaskPopup(false)} />}
            </Box>
        </GridViewContext.Provider>
    )
}

export default Main