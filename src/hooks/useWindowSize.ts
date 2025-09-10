import { useState } from 'react';
import useEventListener from './useEventListener';

const useWindowSize = () => {
    const getWindowSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            width: width,
            height: height,
        };
    };

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEventListener('resize', () => {
        setWindowSize(getWindowSize());
    });

    return windowSize;
};

export default useWindowSize;
