import { FC } from 'react';
import { Dialog, Box, Typography, Button, IconButton, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTodos } from '@/utils/store/Task.store';
import { NavigationDrawerAndPopupProps } from '@/types';

interface DeleteTaskPopupProps extends NavigationDrawerAndPopupProps {
    directory?: string;
}

const DeleteTaskPopup: FC<DeleteTaskPopupProps> = ({open, onClose, directory = ''}) => {
    const { deleteAllData, deleteDirectory } = useTodos()
    const isMobile = useMediaQuery('(max-width: 640px)');

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(directory?.trim().length === 0) {
            e.preventDefault()
            deleteAllData()
            onClose()
        } else {
            e.preventDefault()
            deleteDirectory(directory!)
            onClose()
        }
    }
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: isMobile ? '90%' : '40%' } }}>
            <Box display='flex' flexDirection='column' gap='0.625rem' padding='0.625rem'borderRadius='0.625rem'>
                <Typography variant='h5' display='inline-flex'justifyContent='space-between'>
                    Are you sure
                    <IconButton onClick={onClose}><Close /></IconButton>
                </Typography>
                <Typography>
                    {directory?.trim().length === 0 ? 'All data will be deleted permanently' : 'This directory and all of its data will be deleted permanently'}
                </Typography>
                <Box display='flex'justifyContent='flex-end' gap='0.625rem'>
                    <Button variant='contained' onClick={handleSubmit}>Confirm</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default DeleteTaskPopup