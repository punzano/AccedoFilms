import '@babel/polyfill';
import React from 'react';
import { render, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import VideoPage from '../ui/VideoPage';
import './mocks/localStorage';

afterEach(cleanup);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      id: '2259634',
    }),
    useNavigate: jest.fn()
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
    saveVideoInHistory: jest.fn(),
};

describe('VideoPage component', () => {
    test('VideoPage snapshot', async () => {
        render(
            <BrowserRouter>
                <VideoPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        const videoPageContainer = screen.getByTestId('video-page-container');
        
        expect(videoPageContainer).toMatchSnapshot();
    });

    test('VideoPage should call dispatch with getFilms and saveVideoInHistory', async () => {
        render(
            <BrowserRouter>
                <VideoPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        expect(mockProps.dispatch).toHaveBeenCalled();
        expect(mockFilmsActions.getFilms).toHaveBeenCalled();
        expect(mockFilmsActions.saveVideoInHistory).toHaveBeenCalled();
    });

    test('VideoPage should render 1 video with the correct mediaUrl', async () => {
        render(
            <BrowserRouter>
                <VideoPage {...mockProps} {...mockFilmsActions}/>
            </BrowserRouter>
        );
        
        const videoSource = screen.getByTestId('video-source');
        expect(videoSource.getAttribute("src")).toBe(mockProps.films.list[0].mediaUrl);
    });
});