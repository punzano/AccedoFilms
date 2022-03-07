import '@babel/polyfill';
import React from 'react';
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import UserHistory from '../ui/UserHistory';
import './mocks/localStorage';

afterEach(cleanup);

const mockPropsWithData = {
    userHistoryList: [
        {
            date: new Date("2022", "3", "7", "21", "00", "00"),
            video: {
                "id": 2259634,
                "name": "The Bump 139",
                "season": 4,
                "number": 5,
                "type": "regular",
                "image": "https://static.tvmaze.com/uploads/images/medium_portrait/217/542886.jpg",
                "mediaUrl": "https://test-data-interviews.s3.eu-west-1.amazonaws.com/bbb_multiaudio.mp4",
                "summary": "WWE's The Bump is unlike any WWE show you've ever seen before, featuring a dynamic cast of hosts--led by Kayla Braxton--and WWE Superstars stopping in weekly, both as in-studio and video call-in guests."
            
            }
        },
        {
            date: new Date("2022", "3", "7", "21", "30", "00"),
            video: {
                "id": 2262125,
                "name": "Lisa Ling, Amber Ruffin",
                "season": 1,
                "number": 2,
                "image": "https://static.tvmaze.com/uploads/images/medium_portrait/359/898286.jpg",
                "mediaUrl": "https://test-data-interviews.s3.eu-west-1.amazonaws.com/Forest+-+97998.mp4",
                "summary": "Lisa Ling guest co-hosts; TV host Amber Ruffin."
            }
        }
    ]
};

const mockPropsWithoutData = {
    userHistoryList: []
};

describe('UserHistory component', () => {
    test('UserHistory snapshot', async () => {
        render(
            <BrowserRouter>
                <UserHistory {...mockPropsWithData}/>
            </BrowserRouter>
        );
        const userHistoryContainer = screen.getByTestId('user-history-container');
        
        expect(userHistoryContainer).toMatchSnapshot();
    });

    test('UserHistory should render warning text if no history', async () => {
        render(
            <BrowserRouter>
                <UserHistory {...mockPropsWithoutData}/>
            </BrowserRouter>
        );
        
        const warningHistory = screen.getByTestId('warning-history');
        expect(warningHistory.textContent).toBe('¡Todavía no has visto ningún vídeo!');
    });

    test('UserHistory should render two entries in the history', async () => {
        render(
            <BrowserRouter>
                <UserHistory {...mockPropsWithData}/>
            </BrowserRouter>
        );
        
        const historyEntries = screen.getAllByTestId('history-entry');
        const title1 = historyEntries[0].querySelector('.history-entry-film-title').textContent;
        const title2 = historyEntries[1].querySelector('.history-entry-film-title').textContent;
        expect(historyEntries.length).toBe(2);
        expect(title1).toBe('The Bump 139');
        expect(title2).toBe('Lisa Ling, Amber Ruffin');
    });
});