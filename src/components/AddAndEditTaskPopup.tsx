import dynamic from 'next/dynamic';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect, useReducer } from 'react';
import { Dialog, Box, Typography, TextField, Select, MenuItem, FormControl, FormControlLabel, InputLabel, Radio, IconButton, Button, useMediaQuery } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Close } from '@mui/icons-material';
import { NavigationDrawerAndPopupProps } from '@/types';
import { useTodos } from '@/utils/store/Task.store';

interface AddAndEditTaskPopupProps extends NavigationDrawerAndPopupProps {
    taskId?: number;
}

interface TaskProps {
    title: string;
    date: Dayjs | null;
    description: string;
    directory: string;
    important: boolean;
    completed: boolean;
}

type Actions = | { type: 'SET_TODO'; payload: Partial<TaskProps>;}

const InitialState: TaskProps = {
    title: '',
    date: null,
    description: '',
    directory: 'Main',
    important: false,
    completed: false
}

const reducer = (state: TaskProps, action: Actions): TaskProps => {
    switch(action.type) {
        case 'SET_TODO':
            return {...state, ...action.payload};
        default:
            return {...state}
    } 
};

const AddAndEditTaskPopup = ({open, onClose, taskId=undefined}: AddAndEditTaskPopupProps) => {
    const [state, dispatch] = useReducer(reducer, InitialState)
    const [error, setError] = useState(false);
    const { directories, addTodo, editTodo, todos } = useTodos();
    const isMobile = useMediaQuery('(max-width: 640px)');
    const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({type: 'SET_TODO', payload: {title: e.target.value}})
        if(error) setError(false)
    };
    const handleTaskDateChange = (e: Dayjs | null) => {
        dispatch({type: 'SET_TODO', payload: {date: e}})
        if(error) setError(false)
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(state.title.length > 0 && state.date !== null) {
            if(taskId) editTodo(taskId, {id: taskId, ...state})
            else addTodo({id: Math.ceil(Math.random() * 100000), ...state})
            setError(false)
            onClose()
        } else setError(true)
    }
    function handlePopupClose() {
        setError(false)
        onClose()
    }
    useEffect(() => {
        if(taskId) {
            const task = todos.find(todo => todo.id === taskId)
            if(task) {
                dispatch({type: 'SET_TODO', payload: {...task, date: dayjs(task.date)}})
            }
        }
    },[todos, taskId])
    return (
        <Dialog open={open} onClose={handlePopupClose} PaperProps={{sx: {width: isMobile ? '90%' : '40%'}}}>
            <Box display='flex' flexDirection='column' gap='0.625rem' padding='0.625rem' borderRadius='0.625rem' component='form' onSubmit={handleSubmit}>
                <Typography display='inline-flex' justifyContent='space-between'variant='h5'>
                    {taskId ? 'Edit task' : 'Add a task'}
                    <IconButton onClick={handlePopupClose}><Close /></IconButton>
                </Typography>
                <TextField variant='filled' label='Title' placeholder='e.g, study for the test' value={state.title} onChange={handleTaskTitleChange} error={error} helperText={error ? 'Either title field or date field is empty' : ''} required />
                <DatePicker label='Date' value={state.date} defaultValue={dayjs()} onChange={handleTaskDateChange} slotProps={{textField: {variant: 'filled', error: error, helperText: error ? 'Either title field or date field is empty' : '', required: true }}} />
                <TextField variant='filled' maxRows={3} multiline label='Description (optional)' placeholder='e.g, study for the test' value={state.description} onChange={e => dispatch({type: 'SET_TODO', payload: {description: e.target.value}})} />
                <FormControl variant='filled'>
                    <InputLabel id='Directory'>Select a directory</InputLabel>
                    <Select label='Select a directory' labelId='Directory' value={state.directory} onChange={e => dispatch({type: 'SET_TODO', payload: {directory: e.target.value}})}>
                        {directories.map((directory, key) => (
                            <MenuItem key={key} value={directory}>{directory}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel value="Mark as important" control={<Radio  checked={state.important} onClick={() => dispatch({type: 'SET_TODO', payload: {important: !state.important}})} />} label="Mark as important" />
                <FormControlLabel value="Mark as completed" control={<Radio  checked={state.completed} onClick={() => dispatch({type: 'SET_TODO', payload: {completed: !state.completed}})} />} label="Mark as completed" />
                <Button variant='contained' type='submit'>{taskId ? 'Edit task' : 'Add task'}</Button>
            </Box>
        </Dialog>
    )
}

export default dynamic(() => Promise.resolve(AddAndEditTaskPopup))