import dayjs from "dayjs"
import BorderLinearProgress from "@/components/BorderLinearProgress"
import DeleteTaskPopup from "./DeleteTaskPopup"
import { FC, useState } from "react"
import { Box, Avatar, Divider, Typography, Button, List, ListItem, ListItemText } from "@mui/material"
import { useTodos } from "@/utils/store/Task.store"

const TodayTasksLayout: FC = () => {
    const today = dayjs().format('DD-MM-YYYY')
    const [deleteTaskPopup, setDeleteTaskPopup] = useState(false)
    const { todos } = useTodos();
    const totalTaskCount = todos.length
    const completedTaskCount = todos.filter(todo => todo.completed).length
    const todayTodos = todos.filter(todo => today === dayjs(todo.date).format('DD-MM-YYYY'))
    const todayTodosCount = todayTodos.length
    const todayCompletedTodosCount = todayTodos.filter(todo => todo.completed).length
    const allTaskProgressValue = (completedTaskCount / totalTaskCount) * 100
    const todayTaskProgressValue = (todayCompletedTodosCount / todayTodosCount) * 100
    return (
        <Box display='flex' flexDirection='column' gap='0.625rem' padding='5%' height='100%'>
            <Typography display='flex' alignItems='center' gap='0.625rem' margin='0 auto'>Hi, User! <Avatar src='/download.jpg' alt="avatar" /></Typography>
            <Box display='flex' flexDirection='column' gap='0.625rem'>
                {todayTodosCount > 0 && (
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='space-between'>
                            <Typography component='span'>Today tasks</Typography>
                            <Typography component='span'>{todayCompletedTodosCount}/{todayTodosCount}</Typography>
                        </Box>
                        <BorderLinearProgress variant="determinate" value={todayTaskProgressValue} />
                    </Box>
                )}
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography component='span'>All tasks</Typography>
                        <Typography component='span'>{completedTaskCount}/{totalTaskCount}</Typography>
                    </Box>
                    <BorderLinearProgress variant="determinate" value={allTaskProgressValue} />
                </Box>
            </Box>
            <Divider sx={{borderBottomWidth: '2px', borderColor: theme => theme.palette.background.default}}/>
            <Typography>Tasks today</Typography>
            <List>
                {todayTodos.map((todo, index) => (
                    <ListItem key={index}>
                        <ListItemText>{todo.title}</ListItemText>
                    </ListItem>
                ))}
            </List>
            <Button onClick={() => setDeleteTaskPopup(true)} sx={{marginBlock: 'auto 0', justifyContent: 'flex-start'}}>Delete all data</Button>
            <Box display='flex' justifyContent='center' alignItems='center' height='6.25rem' border='2px solid #222831' borderRadius='10px'>Made by Aditya Kirad</Box>
            <DeleteTaskPopup open={deleteTaskPopup} onClose={() => setDeleteTaskPopup(false)} />
        </Box>
    )
}

export default TodayTasksLayout