import { userHistoryConstants } from '../constants';

const saveVideoInHistory = (video) => {
    return dispatch => dispatch({ type: userHistoryConstants.SAVE_VIDEO_IN_HISTORY, video });
};

export const userHistoryActions = {
    saveVideoInHistory,
};