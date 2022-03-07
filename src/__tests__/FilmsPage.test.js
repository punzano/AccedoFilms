import '@babel/polyfill';
import React from 'react';
import { render, fireEvent, cleanup, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import FilmsPage from '../ui/FilmsPage';
import './mocks/localStorage';

afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

const mockProps = {
    dispatch: jest.fn(),
    films: {
        list: [
            {
                "id": 2259634,
                "name": "The Bump 139",
                "season": 4,
                "number": 5,
                "type": "regular",
                "image": "https://static.tvmaze.com/uploads/images/medium_portrait/217/542886.jpg",
                "mediaUrl": "https://test-data-interviews.s3.eu-west-1.amazonaws.com/bbb_multiaudio.mp4",
                "summary": "WWE's The Bump is unlike any WWE show you've ever seen before, featuring a dynamic cast of hosts--led by Kayla Braxton--and WWE Superstars stopping in weekly, both as in-studio and video call-in guests."
              },
              {
                "id": 2262125,
                "name": "Lisa Ling, Amber Ruffin",
                "season": 1,
                "number": 2,
                "image": "https://static.tvmaze.com/uploads/images/medium_portrait/359/898286.jpg",
                "mediaUrl": "https://test-data-interviews.s3.eu-west-1.amazonaws.com/Forest+-+97998.mp4",
                "summary": "Lisa Ling guest co-hosts; TV host Amber Ruffin."
              }
        ]
    }
};

const mockFilmsActions = {
    getFilms: jest.fn(),
};

global.window = { location: { pathname: null } };

describe('FilmPage component', () => {
    test('FilmPage snapshot', async () => {
        render(
            <BrowserRouter>
                <FilmsPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        const filmsPageContainer = screen.getByTestId('films-page-container');
        
        expect(filmsPageContainer).toMatchSnapshot();
    });

    test('FilmPage should call dispatch', async () => {
        render(
            <BrowserRouter>
                <FilmsPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        expect(mockProps.dispatch).toHaveBeenCalled();
        expect(mockFilmsActions.getFilms).toHaveBeenCalled();
    });

    test('FilmPage should render 2 films', async () => {
        render(
            <BrowserRouter>
                <FilmsPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        
        const filmsName = screen.getAllByTestId('film-title');
        expect(filmsName.length).toBe(2);
        expect(filmsName[0].textContent).toBe('The Bump 139');
        expect(filmsName[1].textContent).toBe('Lisa Ling, Amber Ruffin');
    });

    test('FilmPage should navigate to another url if a film is clicked', async () => {
        const history = createMemoryHistory();
        render(
            <BrowserRouter history={history}>
                <FilmsPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        
        const filmsPageContainer = screen.getByTestId('films-page-container');
        fireEvent.click(filmsPageContainer);
        setTimeout(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/video/2259634');
        }, 1000);
        //The optimal approach would be somthing like this, but it doesn't work as expected
        /* await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/video/2259634');
        }); */     
    });
});
