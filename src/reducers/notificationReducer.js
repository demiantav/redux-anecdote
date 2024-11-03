import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return `${action.payload} was added`;
    },

    hideNotification(state, action) {
      return null;
    },
  },
});

export const setNotification = (anecdote, time) => {
  return async (dispatch) => {
    dispatch(showNotification(anecdote));

    setTimeout(() => {
      dispatch(hideNotification());
    }, time);
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
