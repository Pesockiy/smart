import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

const useMedia = () => {
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const isTablet = useMediaQuery({ query: '(max-width: 1100px)' }) && isPageLoaded;
    const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' }) && isPageLoaded;

    useEffect(() => {
        setIsPageLoaded(true);
    }, []);

    return { isTablet, isDesktop }
}

export default useMedia