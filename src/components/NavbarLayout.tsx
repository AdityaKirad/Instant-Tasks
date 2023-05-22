import StyledLink from '@/components/Link';
import DeleteTaskPopup from '@/components/DeleteTaskPopup';
import DirectoryPopup from '@/components/DirectoryPopup';
import { useRouter } from "next/router";
import { FC, useState} from "react";
import { Box, Button, IconButton, List, ListItem, ListItemButton,  Collapse, ListItemIcon } from "@mui/material";
import { KeyboardArrowRight, Add, Edit, Delete, } from '@mui/icons-material';
import { useTodos } from "@/utils/store/Task.store";

const NavigationLayout:FC = () => {
    const router = useRouter()
    const currentPath = router.asPath;
    const {directories} = useTodos();
    const [directoryOpen, setDirectoryOpen] = useState(true)
    const [directoryPopup, setDirectoryPopup] = useState({
        active: false,
        directory: ''
    });
    const [deleteTaskPopup, setDeleteTaskPopup] = useState({
        active: false,
        directory: ''
    })
    return (
        <>
            <Box display="flex" flexDirection="column" gap='0.625rem'>
                <Box display='flex' flexDirection='column'>
                    <StyledLink href='/today' sx={{bgcolor: currentPath === '/today' ? '#222831' : 'none', borderRight: currentPath === '/today' ? '0.5rem solid white' : 'none', padding: '0.625rem 1.25rem'}}>Today&apos;s Tasks</StyledLink>
                    <StyledLink href='/' sx={{bgcolor: currentPath === '/' ? '#222831' : 'none', borderRight: currentPath === '/' ? '0.5rem solid white' : 'none', padding: '0.625rem 1.25rem'}}>All Tasks</StyledLink>
                    <StyledLink href='/important' sx={{bgcolor: currentPath === '/important' ? '#222831' : 'none', borderRight: currentPath === '/important' ? '0.5rem solid white' : 'none', padding: '0.625rem 1.25rem'}}>Important Tasks</StyledLink>
                    <StyledLink href='/completed' sx={{bgcolor: currentPath === '/completed' ? '#222831' : 'none', borderRight: currentPath === '/completed' ? '0.5rem solid white' : 'none', padding: '0.625rem 1.25rem'}}>Completed Tasks</StyledLink>
                    <StyledLink href='/uncomplete' sx={{bgcolor: currentPath === '/uncomplete' ? '#222831' : 'none', borderRight: currentPath === '/uncomplete' ? '0.5rem solid white' : 'none', padding: '0.625rem 1.25rem'}}>Uncompleted Tasks</StyledLink>
                </Box>
                <Box >
                    <Button 
                        variant="text"
                        sx={{
                            textTransform: 'capitalize'
                        }}
                        onClick={() => setDirectoryOpen(prevState => !prevState)} 
                        startIcon={ 
                            <KeyboardArrowRight 
                                sx ={{ 
                                    rotate: directoryOpen ? '90deg' : '0deg', 
                                    transition: 'rotate .5s linear'
                                }} 
                            /> 
                        }
                    >Directories</Button>
                    <Collapse in={directoryOpen} timeout="auto" unmountOnExit>
                        <List>
                            {directories.map((item, index) => (
                                <ListItem 
                                    key={index} 
                                    secondaryAction={
                                        item !== 'Main' && (
                                            <>
                                                <IconButton onClick={() => setDirectoryPopup({active: true, directory: item})}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => setDeleteTaskPopup({active: true, directory: item})}>
                                                    <Delete />
                                                </IconButton>
                                            </>
                                        )
                                    }
                                    sx={currentPath === `/dir/${item.toLowerCase()}` ? {bgcolor: '#222831', borderRight: '0.5rem solid white'} : null}>
                                    <StyledLink href={`/dir/${encodeURIComponent(item.toLowerCase())}`}>{item}</StyledLink>
                                </ListItem>
                            ))}
                            <ListItem sx={{width: 'fit-content'}}>
                                <ListItemButton sx={{border: '.125rem dashed #222831', borderSpacing: '.25rem', borderRadius: '.25rem'}} onClick={() => setDirectoryPopup({active: true, directory: ''})}>
                                    <ListItemIcon><Add /></ListItemIcon>
                                    New
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Collapse>
                </Box>
            </Box>
            {deleteTaskPopup.active && <DeleteTaskPopup open={deleteTaskPopup.active} onClose={() => setDeleteTaskPopup({active: false, directory: ''})} directory={deleteTaskPopup.directory} />}
            {directoryPopup.active && <DirectoryPopup open={directoryPopup.active} onClose={() => setDirectoryPopup({active: false, directory: ''})} directory={directoryPopup.directory}/>}
        </>    
    )
}

export default NavigationLayout;