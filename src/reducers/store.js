import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterReducer';
import reducer from './anecdoteReducer';
import notificationReducer from './notificationReducer';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: reducer,
    notification: notificationReducer,
  },
});

export default store;
