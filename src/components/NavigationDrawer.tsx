import NavigationLayout from '@/components/NavbarLayout';
import AddAndEditTaskPopup from '@/components/AddAndEditTaskPopup';
import { FC, useState} from "react";
import { Drawer, Button } from "@mui/material";
import { NavigationDrawerAndPopupProps } from "@/types";

const NavigationDrawer:FC<NavigationDrawerAndPopupProps> = ({open, onClose}) => {
    const [addTaskPopup, setAddTaskPopup] = useState(false)
    return (
        <Drawer anchor="left" open={open} onClose={onClose} PaperProps={{sx: {width: '75%', gap: '0.625rem', paddingTop: '5%'}}}>
            <Button variant="contained" onClick={() => setAddTaskPopup(true)} sx={{marginInline: 'auto'}}>Add New Task</Button>
            <NavigationLayout />
            {addTaskPopup && <AddAndEditTaskPopup open={addTaskPopup} onClose={() => setAddTaskPopup(false)} />}
        </Drawer>
    )
}

export default NavigationDrawer;