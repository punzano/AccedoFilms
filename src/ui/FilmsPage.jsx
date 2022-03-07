import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useHorizontalWheelScroll from './hooks/useHorizontalWheelScroll';

const FilmsPage = (props) => {
    const { dispatch, films, getFilms } = props;
    const { list: filmsList } = films;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch, getFilms]);

    // This doesn't work, it's objective would have been to perform the scroll with the mouse wheel,
    // but I don't have enough time to check what is wrong
    const [ref] = useHorizontalWheelScroll();

    const onFilmClicked = (ev) => {
        const videoId = ev.currentTarget.id;
        navigate(`/video/${videoId}`);
    };

    const getFilmsElements = (filmsList) => (
        filmsList.map(film => (
            <div ref={ref} key={film.id} id={film.id} className="film-container" onClick={onFilmClicked}>
                <img className="film-image" src={film.image} alt={film.name}/>
                <span className="film-title" data-testid="film-title">{film.name}</span>
                <div className="description-overlay">
                    <p className="description-text">
                        {film.summary}
                    </p>
                </div>
            </div>
        ))
    );

    return (
        <div className="films-page-container" data-testid="films-page-container">
            <header className="header">
                <h1 className="app-title">Welcome to Accedo Films</h1>
                <Link to="/user-history">User history</Link>
            </header>
            <section className="films-container">
                {filmsList.length > 0 && getFilmsElements(filmsList)}
            </section>
        </div>
    );
};

export default FilmsPage;