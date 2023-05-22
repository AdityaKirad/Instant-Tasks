import TodayTasksLayout from "@/components/TodayTasksLayout"
import { FC } from "react"
import { Drawer } from "@mui/material"
import { NavigationDrawerAndPopupProps } from "@/types"

const TodayTasksDrawer: FC<NavigationDrawerAndPopupProps> = ({open, onClose}) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{sx: {width: '75%'}}}>
            <TodayTasksLayout />
        </Drawer>
    )
}

export default TodayTasksDrawer