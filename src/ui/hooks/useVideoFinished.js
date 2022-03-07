import React, { useCallback, useRef } from 'react';

const useVideoFinished = (navigateCb) => {
    const refVideo = useRef();
    const setRef = useCallback(node => {
        if (refVideo.current) {
            refVideo.current.removeEventListener('ended', navigateCb);
        }
        
        if (node) {
            node.addEventListener("ended", navigateCb);
        }
        
        refVideo.current = node
    }, [navigateCb]);

    return [setRef];
};

export default useVideoFinished;