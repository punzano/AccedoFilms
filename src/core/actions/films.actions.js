import { filmsService } from '../services/films.service';
import { filmsConstants } from '../constants';

const success = (films, type) => ({ type: filmsConstants[`${type}_SUCCESS`], films });
const failure = (error, type) => ({ type: filmsConstants[`${type}_FAILURE`], error });

const getFilms = () => {
    return dispatch => {
        filmsService.getFilms()
            .then(
                films => {
                    dispatch(success(films, 'GET_FILMS'));
                    console.log('Success in getFilms: ', films);
                },
                error => {
                    dispatch(success(failure, 'GET_FILMS'));
                    console.log('Error in getFilms: ', error);
                }
            );
    };
};

export const filmsActions = {
    getFilms,
};