import { Open_Sans, Arvo } from 'next/font/google';
import {createTheme} from '@mui/material/styles';

export const open_sans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: 'variable'
});

const theme = createTheme({ 
    typography: {
        fontFamily: open_sans.style.fontFamily, 
    },
    palette: {
        mode: 'dark',
        text: {
            primary: '#fff'
        },
        background: {
            default: '#222831',
            paper: '#393E46'
        },
        primary: {
            main: '#00ADB5'
        },
        secondary: {
            main: '#444e55'
        }
    },
    breakpoints: {
        values: {
            xl: 1280,
            lg: 1024,
            md: 768,
            sm: 640,
            xs: 0
        }
    },
    components: {
        MuiTextField: {
            variants: [
                {
                    props: {variant: 'filled'},
                    style: {
                        '& .MuiFilledInput-root': {
                            backgroundColor: '#222831'
                        },
                        '& .MuiFilledInput-root:after': {
                            borderBottom: '2px solid white'
                        },
                        '& .MuiFilledInput-root.Mui-focused': {
                            backgroundColor: '#222831'
                        },
                        '& .MuiFilledInput-root:hover': {
                            backgroundColor: 'none'
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white'
                        },
                    }
                }
            ]
        },
        MuiButton: {
            variants: [
                {
                    props: {variant: 'text'},
                    style: {
                        color: 'white'
                    }
                }
            ]
        },
        MuiSelect: {
            variants: [
                {
                    props: {variant: 'filled'},
                    style: {
                        backgroundColor: '#222831'
                    }
                }
            ]
        },
    },
});

export default theme;