import React from 'react';
import { Link } from 'react-router-dom';

const UserHistory = (props) => {
    const { userHistoryList } = props;

    const getFormattedDate = (date) => new Date(date).toLocaleString();

    const getUserHistoryElements = (userHistoryList) => (
        userHistoryList.map(userHistoryEntry => (
            <li key={userHistoryEntry.video.id} className="history-entry-container" data-testid="history-entry">
                <span className="history-entry-date">{getFormattedDate(userHistoryEntry.date)}</span>
                <span className="history-entry-film-title">{userHistoryEntry.video.name}</span>
            </li>
        ))
    );

    return (
        <div className="user-history-container" data-testid="user-history-container">
            <header className="header">
                <h1 className="app-title">Accedo Films History</h1>
                <Link to="/">Back to home</Link>
            </header>
            <section className="history-container">
                {(userHistoryList && userHistoryList.length > 0) &&
                    <ul>
                        {userHistoryList.length > 0 && getUserHistoryElements(userHistoryList)}
                    </ul>
                }
                {(!userHistoryList || userHistoryList.length === 0) &&
                    <h1 data-testid="warning-history">¡Todavía no has visto ningún vídeo!</h1>
                }
            </section>
        </div>
    );
};

export default UserHistory;