import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useVideoFinished from './hooks/useVideoFinished';

const VideoPage = (props) => {
    const { dispatch, films, getFilms, saveVideoInHistory } = props;
    const { list: filmsList } = films;

    const navigate = useNavigate();
    const { id } = useParams();

    const videoInfo = useMemo(() => {
        return filmsList.find(film => film.id === parseInt(id));
    }, []);

    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch, getFilms]);

    useEffect(() => {
        dispatch(saveVideoInHistory(videoInfo));
    }, [dispatch, videoInfo, saveVideoInHistory]);

    const navigateCb = useCallback(ev => {
        navigate('/');
    }, [navigate]);
    
    const [ref] = useVideoFinished(navigateCb);

    return (
        <>
            <div className="video-page-container" data-testid="video-page-container">
                <video controls autoPlay ref={ref}>
                    <source src={videoInfo.mediaUrl} type="video/mp4" data-testid="video-source"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
};

export default VideoPage;