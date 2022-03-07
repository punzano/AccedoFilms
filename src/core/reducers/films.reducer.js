import { filmsConstants } from '../constants';

const initialState = {
  list: []
};

export const films = (state = initialState, action) => {
  switch (action.type) {
    case filmsConstants.GET_FILMS_SUCCESS:
      return {
        ...state,
        list: action.films
      };
    case filmsConstants.GET_FILMS_FAILURE:
      return {
        ...state,
        list: []
      };
    default:
      return state
  }
}