import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { Grid, Box, Button, IconButton, Typography, Divider, Paper, useMediaQuery, useTheme } from '@mui/material';
import { CalendarMonth, StarOutline, Star, Delete, Edit, Check, Close } from '@mui/icons-material';
import { useFilterdTodos } from '@/hooks/useFilterdTodos'
import { useTodos } from '@/utils/store/Task.store';
import { GridViewContext } from '@/context/viewContext';
import dayjs from 'dayjs';
import AddAndEditTaskPopup from '@/components/AddAndEditTaskPopup';

const TaskGrid:FC = () => {
    const [addAndEditTaskPopup, setAddAndEditTaskPopup] = useState<{
        active: boolean;
        taskId?: number | undefined;
    }>({
        active: false,
        taskId: undefined
    })
    const router = useRouter()
    const { filterdTodos } = useFilterdTodos();
    const {toggleImportant, toggleCompleted, deleteTodo} = useTodos()
    const GridView = useContext(GridViewContext);
    const isMobile = useMediaQuery('(max-width: 640px)');
    const theme = useTheme()
    function handleDirectoryRoute(dirName: string) {
        router.push(`/dir/${encodeURIComponent(dirName.toLowerCase())}`)
    }
    return (
        <Grid container spacing={2}>
            {filterdTodos.map((todo, key) => {
                return (
                    <Grid item key={key} display='flex' flexDirection='column' xs={GridView ? 6 : 12} md={GridView ? 4 : 12} lg={GridView ? 3 : 12} xl={GridView ? 4 : 12}>
                        <Button variant='contained' fullWidth={false} sx={{alignSelf: 'flex-end', marginRight: '1rem', borderRadius: '1rem 1rem 0 0'}} onClick={() => handleDirectoryRoute(todo.directory)} disableElevation>{todo.directory}</Button>
                        <Paper>
                            <Box display='flex' flexDirection='column' justifyContent='space-between' height='12.5rem' padding='0.625rem' borderRadius='0.625rem'>
                                <Box>
                                    <Typography fontSize={isMobile ? '0.75rem' : 'initial'}>{todo.title}</Typography>
                                    <Typography fontSize={isMobile ? '0.75rem' : 'initial'}>{todo.description}</Typography>
                                </Box>
                                <Box>
                                    <Typography display={'inline-flex'} alignItems={'center'} fontSize={isMobile ? '0.75rem' : 'initial'}><CalendarMonth fontSize='inherit' sx={{height: '1.5em', width: '1.5em'}} /> {dayjs(todo.date).format('DD-MM-YYYY')}</Typography>
                                    <Divider />
                                    <Box display={'flex'} justifyContent={isMobile ? 'space-between' : 'flex-end'} paddingTop={'0.625rem'}>
                                        { isMobile ? (
                                            <IconButton disableRipple={isMobile} sx={{background: theme.palette.primary.main}} onClick={() => toggleCompleted(todo.id)}>{todo.completed ? <Check /> : <Close />}</IconButton>
                                        ) : (
                                            <Button variant='contained' sx={{marginInline: '0 auto'}} onClick={() => toggleCompleted(todo.id)}>{todo.completed ? 'Completed' : 'Uncompleted'}</Button>
                                        )}
                                        <IconButton disableRipple={isMobile} sx={{paddingInline: isMobile ? 0 : undefined}} onClick={() => toggleImportant(todo.id)}>{todo.important ? <Star /> : <StarOutline />}</IconButton>
                                        <IconButton disableRipple={isMobile} sx={{paddingInline: isMobile ? 0 : undefined}} onClick={() => deleteTodo(todo.id)}><Delete /></IconButton>
                                        <IconButton disableRipple={isMobile} sx={{paddingInline: isMobile ? 0 : undefined}} onClick={() => setAddAndEditTaskPopup({active: true, taskId: todo.id})}><Edit /></IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                )
            })}
            <Grid item xs={GridView ? 6 : 12} md={GridView ? 4 : 12} lg={GridView ? 3 : 12} xl={GridView ? 4 : 12}>
                <Box display='flex' justifyContent='center' alignItems='center' border='0.125rem dashed grey' borderRadius='0.625rem' height='100%' minHeight='12.5rem' sx={{cursor: 'pointer'}} onClick={() => setAddAndEditTaskPopup({active: true})}>
                    Add New Task
                </Box>
            </Grid>
            {addAndEditTaskPopup.active && <AddAndEditTaskPopup open={addAndEditTaskPopup.active} onClose={() => setAddAndEditTaskPopup({active: false, taskId: undefined})} taskId={addAndEditTaskPopup.taskId} />}
        </Grid>
    )
};

export default TaskGrid;