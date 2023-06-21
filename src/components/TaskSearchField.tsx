import StyledLink from '@/components/Link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC, useState } from "react";
import { Box, Paper, TextField, IconButton, Button, Typography, List, ListItem, useMediaQuery, ClickAwayListener } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTodos } from "@/utils/store/Task.store";

const TaskSearchField: FC = () => {
    const [searchValue, setSearchvalue] = useState('')
    const [searchBox, setSearchBox] = useState(false)
    const router = useRouter()
    const { todos } = useTodos();
    const filterdTodos = todos.filter(todo => todo.title.toLocaleLowerCase().includes(searchValue.toLowerCase() as string)).slice(0, 4)
    function handleSubmit (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        router.push({pathname: '/results', query: {search: encodeURIComponent(searchValue)}})
    }
    return (
        <Box display='flex' flexDirection='column' gap='0.625rem'>
            <TextField
                value={searchValue}
                InputProps={{
                    endAdornment: <IconButton onClick={() => setSearchBox(true)}><Search /></IconButton>,
                }}
                onKeyDown={e => {if(e.key === 'Enter') setSearchBox(true)}}
                fullWidth
                label='Search task'
                onChange={e => setSearchvalue(e.target.value)}
            />
            {searchValue.length > 0 && searchBox && (
                <ClickAwayListener onClickAway={() => setSearchBox(false)}>
                    <Paper sx={{position: 'absolute', top: '100%', zIndex: 1, width: '100%', padding: '0.625rem'}} >
                        <Box>
                            <List>
                                {filterdTodos.map((todo, key) => (
                                    <ListItem key={key}>
                                        <StyledLink sx={{display: 'inline-flex', justifyContent: 'space-between', width: '100%'}} href={`/task/${encodeURIComponent(todo.id)}`}>
                                            <Typography component={'span'}>{todo.title}</Typography>
                                            <Typography component={'span'}>{dayjs(todo.date).format('DD/MM/YYYY')}</Typography>
                                        </StyledLink>
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant='contained' onClick={handleSubmit} fullWidth>All results for {`"${searchValue}"`}</Button>
                        </Box>
                    </Paper>
                </ClickAwayListener>
            )}
        </Box>
    )
}

export default TaskSearchField;