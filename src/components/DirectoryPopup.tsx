import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Dialog, Box, Typography, IconButton, Button, TextField, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTodos } from '@/utils/store/Task.store';
import { NavigationDrawerAndPopupProps } from '@/types';

interface DirectoryPopupProps extends NavigationDrawerAndPopupProps {
    directory?: string;
}

const DirectoryPopup = ({open, onClose, directory= ''}: DirectoryPopupProps) => {
    const [directoryName, setDirectoryName] = useState('')
    const [error, setError] = useState(false)

    const isMobile = useMediaQuery('(max-width: 640px)');
    const { addDirectory, editDirectory } = useTodos()
    const directoryLength = directory.trim().length

    useEffect(() => {
        if(directoryLength !== 0) setDirectoryName(directory)
        else setDirectoryName('')
    },[directory, directoryLength])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(directoryName.length > 0)
        switch (directoryLength) {
            case 0:
                addDirectory(directoryName)
                setError(false)
                onClose()
                break;
            default:
                editDirectory(directory, directoryName)
                setError(false)
                onClose()
                break;
        } else setError(true)
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDirectoryName(e.target.value)
        if(error) setError(false)
    }

    const handlePopupClose = () => {
        setError(false)
        onClose()
    }
    return (
        <Dialog open={open} onClose={handlePopupClose} PaperProps={{ sx: {width: isMobile ? '90%' : '40%'}} }>
            <Box display='flex'flexDirection='column' gap='0.625rem' padding='0.625rem' borderRadius='0.625rem' component='form' onSubmit={handleSubmit}>
                <Typography variant='h5' display='inline-flex' justifyContent='space-between'>
                    {directoryLength === 0 ? 'Create new directory' : 'Edit directory name'}
                    <IconButton onClick={handlePopupClose}><Close /></IconButton>
                </Typography>
                <TextField variant='filled' value={directoryName} onChange={handleTextChange}  error={error} label="Title" placeholder='Enter a directory name' required
                />
                <Box display='flex' gap='0.625rem'>
                    <Button variant='contained' type='submit'>{directoryLength === 0 ? 'Create' : 'Edit'}</Button>
                    <Button variant='text' onClick={handlePopupClose}>Cancel</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default dynamic(() => Promise.resolve(DirectoryPopup))