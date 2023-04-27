import { useMediaQuery } from 'react-responsive'

const useMedia = () => {
    const isMobile =            useMediaQuery({ query: '(max-width: 599px)' })
    const isTabletOrMobile =    useMediaQuery({ query: '(max-width: 767px)' })
    const isTablet =            useMediaQuery({ query: '(max-width: 1024px)' })
    const isDesktop =           useMediaQuery({ query: '(min-width: 1025px)' })

    return {isMobile, isTabletOrMobile, isTablet, isDesktop}
}


export default useMedia