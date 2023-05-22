import { FC, useState, useEffect } from 'react';
import { Dialog, Box, Typography, IconButton, Button, TextField, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTodos } from '@/utils/store/Task.store';
import { NavigationDrawerAndPopupProps } from '@/types';

interface DirectoryPopupProps extends NavigationDrawerAndPopupProps {
    directory?: string;
}

const DirectoryPopup: FC<DirectoryPopupProps> = ({open, onClose, directory= ''}) => {
    const [directoryName, setDirectoryName] = useState('')
    const [error, setError] = useState(false)

    const isMobile = useMediaQuery('(max-width: 640px)');
    const { addDirectory, editDirectory } = useTodos()

    useEffect(() => {
        if(directory?.trim().length !== 0) {
            setDirectoryName(directory!)
        } else setDirectoryName('')
    },[directory])

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(directoryName.length > 0) {
            if(directory?.trim().length === 0) {
                e.preventDefault()
                addDirectory(directoryName)
                setError(false)
                onClose()
            } else {
                e.preventDefault()
                editDirectory(directory!, directoryName)
                setError(false)
                onClose()
            }
        } else {
            setError(true)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if(e.key === 'Enter') {
            if(directoryName.length > 0) {
                if(directory?.trim().length) {
                    e.preventDefault()
                    addDirectory(directoryName)
                    setError(false)
                    onClose()
                } else {
                    e.preventDefault()
                    editDirectory(directory!, directoryName)
                    setError(false)
                    onClose()
                }
            } else {
                setError(true)
            }
        }
    }

    function handleTextChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setDirectoryName(e.target.value)
        if(error)
        setError(false)
    }

    function handlePopupClose() {
        setError(false)
        onClose()
    }
    return (
        <Dialog open={open} onClose={handlePopupClose} PaperProps={{ sx: {width: isMobile ? '90%' : '40%'}} }>
            <Box display='flex'flexDirection='column' gap='0.625rem' padding='0.625rem' borderRadius='0.625rem'>
                <Typography variant='h5' display='inline-flex' justifyContent='space-between'>
                    {directory?.trim().length === 0 ? 'Create new directory' : 'Edit directory name'}
                    <IconButton onClick={handlePopupClose}><Close /></IconButton>
                </Typography>
                <TextField variant='filled' value={directoryName} onChange={handleTextChange} onKeyDown={handleKeyDown} error={error} label="Title" placeholder='Enter a directory name' required
                />
                <Box display='flex' gap='0.625rem'>
                    <Button variant='contained' onClick={handleSubmit}>{directory?.trim().length === 0 ? 'Create' : 'Edit'}</Button>
                    <Button variant='text' onClick={handlePopupClose}>Cancel</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default DirectoryPopup