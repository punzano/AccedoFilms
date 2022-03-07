import { combineReducers } from 'redux';

import { films } from './films.reducer';
import { userHistory } from './userHistory.reducer';

const rootReducer = combineReducers({
  films,
  userHistory
});

export default rootReducer;