import {useState, useEffect} from 'react';

export function useScroll(scrollValue = 40) {
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        function changeScroll() {
            if(window.scrollY >= scrollValue)
            setScroll(true)
            else
            setScroll(false)
        }

        changeScroll()

        window.addEventListener('scroll', changeScroll)
        return () => window.removeEventListener('scroll', changeScroll)
    },[scrollValue])

    return scroll
}