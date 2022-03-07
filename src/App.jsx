import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { history } from './core/helpers';
import FilmsPage from './ui/FilmsPage';
import VideoPage from './ui/VideoPage';
import UserHistory from './ui/UserHistory';

import { filmsActions, userHistoryActions } from './core/actions';

import withReduxConnect from './ui/hocs/withReduxConnect';

import './assets/index.less';

const App = () => {
    const filmsMapStateToProps = (state) => ({ films: state.films });
    const userHistoryMapStateToProps = (state) => ({ userHistoryList: state.userHistory.list });

    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route exact path="/" element={
                    withReduxConnect(
                        FilmsPage,
                        { ...filmsActions }
                    )(filmsMapStateToProps)
                }/>
                <Route path="/video/:id" element={
                    withReduxConnect(
                        VideoPage,
                        { ...filmsActions, ...userHistoryActions }
                    )(filmsMapStateToProps)}/>
                <Route exact path="/user-history" element={withReduxConnect(UserHistory)(userHistoryMapStateToProps)}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;