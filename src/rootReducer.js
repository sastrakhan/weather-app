import { combineReducers } from '@reduxjs/toolkit';
import weatherSlice from './slices/weatherSlice';

const rootReducer = combineReducers({
  weatherR: weatherSlice
});

export default rootReducer;