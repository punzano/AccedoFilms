import { userHistoryConstants } from '../constants';

let userHistoryStorage = JSON.parse(localStorage.getItem('userHistory'));
const initialState = userHistoryStorage ? { list: userHistoryStorage } : { list: [] };

export const userHistory = (state = initialState, action) => {
  switch (action.type) {
    case userHistoryConstants.SAVE_VIDEO_IN_HISTORY:
      const newList = [...state.list, {
        date: new Date(),
        video: action.video
      }];
      localStorage.setItem('userHistory', JSON.stringify(newList));
      return { 
        ...state,
        list: newList
      };
    default:
      return state
  }
}