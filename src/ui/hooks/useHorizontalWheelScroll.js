import React, { useEffect, useCallback, useRef } from 'react';

const useHorizontalWheelScroll = () => {
    const refFilmsContainer = useRef(null);
    const setRef = useCallback(node => {
        if (refFilmsContainer.current) {
            refFilmsContainer.current.removeEventListener('wheel', handleWheel);
        }
        
        if (node) {
            node.addEventListener("wheel", handleWheel);
        }
        
        refFilmsContainer.current = node
    }, [refFilmsContainer.current]);

    const handleWheel = useCallback((evt) => {
        evt.preventDefault();
        refFilmsContainer.current.scrollLeft += evt.deltaY;
    }, [refFilmsContainer.current]);

    return [setRef];
};

export default useHorizontalWheelScroll;