import dayjs, { Dayjs } from 'dayjs';
import { FC, useState, useEffect, } from 'react';
import { Dialog, Box, Typography, TextField, Select, MenuItem, FormControl, FormControlLabel, InputLabel, Radio, IconButton, Button, useMediaQuery } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Close } from '@mui/icons-material';
import { NavigationDrawerAndPopupProps } from '@/types';
import { useTodos } from '@/utils/store/Task.store';

interface AddAndEditTaskPopupProps extends NavigationDrawerAndPopupProps {
    taskId?: number;
}

interface taskProps {
    title: string;
    date: Dayjs | null;
    description: string;
    directory: string;
    important: boolean;
    completed: boolean;
}

const AddAndEditTaskPopup: FC<AddAndEditTaskPopupProps> = ({open, onClose, taskId=undefined}) => {
    const [todo, setTodo] = useState<taskProps>({
        title: '',
        date: null,
        description: '',
        directory: 'Main',
        important: false,
        completed: false
    });
    const [error, setError] = useState(false);
    const { directories, addTodo, editTodo, todos } = useTodos();
    const isMobile = useMediaQuery('(max-width: 640px)');
    useEffect(() => {
        if(taskId !== undefined) {
            const task = todos.find(todo => todo.id === taskId)
            if(task) {
                setTodo({
                    title: task.title,
                    date: dayjs(task.date),
                    description: task.description,
                    directory: task.directory,
                    important: task.important,
                    completed: task.completed
                })
            }
        }
    },[todos, taskId])

    function handleTaskTitleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTodo(prevState => ({...prevState, title: e.target.value}))
        if(error)
        setError(false)
    };

    function handleTaskDateChange(e: Dayjs | null) {
        setTodo(prevState => ({...prevState, date: e}))
        if(error)
        setError(false)
    };

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(todo.title.length > 0 && todo.date !== null){
            if(taskId !== undefined) {
                e.preventDefault()
                editTodo(taskId, {
                    id: taskId,
                    ...todo
                })
                onClose()
                setError(false)
            } else {
                e.preventDefault()
                addTodo({
                    id: Math.ceil(Math.random() * 100000),
                    ...todo
                })
                setError(false)
                onClose()
            }
        } else setError(true)
    }

    function handlePopupClose() {
        setError(false)
        onClose()
    }

    return (
        <Dialog open={open} onClose={handlePopupClose} PaperProps={{sx: {width: isMobile ? '90%' : '40%'}}}>
            <Box display='flex' flexDirection='column' gap='0.625rem' padding='0.625rem'borderRadius='0.625rem'>
                <Typography display='inline-flex' justifyContent='space-between'variant='h5'>
                    {taskId !== undefined ? 'Edit task' : 'Add a task'}
                    <IconButton onClick={handlePopupClose}><Close /></IconButton>
                </Typography>
                <TextField variant='filled' label='Title' placeholder='e.g, study for the test' value={todo.title} onChange={handleTaskTitleChange} error={error} helperText={error ? 'Either title field or date field is empty' : ''} required />
                <DatePicker label='Date' value={todo.date} defaultValue={dayjs()} onChange={handleTaskDateChange} slotProps={{textField: {variant: 'filled', error: error, helperText: error ? 'Either title field or date field is empty' : '' }}} />
                <TextField variant='filled' maxRows={3} multiline label='Description (optional)' placeholder='e.g, study for the test' value={todo.description} onChange={e => setTodo(prevState => ({...prevState, description: e.target.value}))} />
                <FormControl variant='filled'>
                    <InputLabel id='Directory'>Select a directory</InputLabel>
                    <Select label='Select a directory' labelId='Directory' value={todo.directory} onChange={e => setTodo(prevState => ({...prevState, directory: e.target.value}))}>
                        {directories.map((directory, key) => (
                            <MenuItem key={key} value={directory}>{directory}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel value="Mark as important" control={<Radio  checked={todo.important} onClick={() => setTodo(prevState => ({...prevState, important: !prevState.important}))} />} label="Mark as important" />
                <FormControlLabel value="Mark as completed" control={<Radio  checked={todo.completed} onClick={() => setTodo(prevState => ({...prevState, completed: !prevState.completed}))} />} label="Mark as completed" />
                <Button variant='contained' onClick={handleSubmit}>{taskId !== undefined ? 'Edit task' : 'Add task'}</Button>
            </Box>
        </Dialog>
    )
}

export default AddAndEditTaskPopup