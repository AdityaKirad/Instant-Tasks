import type {ReactNode} from 'react'
import { Paper, Typography, useMediaQuery } from '@mui/material'
import NavbarLayout from './NavbarLayout'
import Main from './Main'
import TodayTasksLayout from './TodayTasksLayout'

const RootLayout = ({children}: {children: ReactNode}) => {
    const isMatch = useMediaQuery('(min-width: 1280px)')
    return (
        <>
            <Paper sx={{display: isMatch ? '' : 'none', position: 'fixed', top: 0, left: 0, width: '20%', height: '100%', paddingTop: '1%', zIndex: 10}}>
                <Typography fontSize='1.875rem' fontWeight='700' textAlign='center' paddingY='0.625rem'>Instant Tasks</Typography>
                <NavbarLayout />
            </Paper>
            <Main>
                {children}
            </Main>
            <Paper sx={{display: isMatch ? '' : 'none', position: 'fixed', top: 0, right: 0, width: '20%', height: '100%', paddingTop: '1%', zIndex: 10}}>
                <TodayTasksLayout />
            </Paper>
        </>
    )
}

export default RootLayout