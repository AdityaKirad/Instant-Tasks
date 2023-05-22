import { FC } from 'react';
import { Box, Paper, Typography, useMediaQuery } from '@mui/material';
import NavbarLayout from '@/components/NavbarLayout';
import Main from '@/components/Main';
import TodayTasksLayout from '@/components/TodayTasksLayout';
import TaskGrid from '@/components/TaskGrid';

const RouteLayout: FC = () => {
    const isMatch = useMediaQuery('(min-width: 1280px)')
    return (
        <Box display='flex' minHeight={'calc(var(--vh, 1vh) * 100)'}>
            {isMatch && (
                <Paper sx={{position: 'fixed', width: '20%', height: '100%', paddingTop: '1%', gap: '0.625rem', zIndex: 10}}>
                    <Typography fontSize='1.875rem' fontWeight='700' textAlign='center' paddingY='0.625rem'>nTask</Typography>
                    <NavbarLayout />
                </Paper>
            )}
            <Main>
                <TaskGrid />
            </Main>
            {isMatch && (
                <Paper sx={{position: 'fixed', right: 0, width: '20%', height: '100%', paddingTop: '1%', zIndex: 10}}>
                    <TodayTasksLayout />
                </Paper>
            )}
        </Box>
    )
}

export default RouteLayout;