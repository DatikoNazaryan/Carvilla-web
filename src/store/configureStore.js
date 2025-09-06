import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import carReducer from './slices/carSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    cars: carReducer,
  }
});

export default store;
