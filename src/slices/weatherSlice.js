import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeather } from '../utils';

const initialState = {
    currentWeather: {},
    citiesSearched: [],
    citiesSearchedMinusRecent: [],
    error: null,
    status: 'idle',
  };

export const fetchDaWeather = createAsyncThunk(
    'weather/FetchByCity',
    async (city) => {
        return await getWeather(city);
    }
);
  
const weather = createSlice({
    name: 'weather',
    initialState: initialState,
    reducers: {
        setCitySearchHisory(state, action){
            let cityPayload = action.payload.city;
            let cityAlreadySearched = state.citiesSearched.find(city => city == cityPayload)
            if (!cityAlreadySearched){
                state.citiesSearched.push(cityPayload);
            }
            state.citiesSearchedMinusRecent = [...state.citiesSearched];
            state.citiesSearchedMinusRecent.pop()
        }
    },
    extraReducers: {
        [fetchDaWeather.pending]: (state) => {
            debugger;
            state.status = 'loading';
        },
        [fetchDaWeather.fulfilled]: (state, action) => {
          debugger;
          state.status = 'succeeded';
          state.currentWeather = [...state.currentWeather, action.payload];
        },
        [fetchDaWeather.rejected]: (state, action) => {
          debugger;
          state.status = 'failed';
          state.error = action.payload;
        }
    }
});

export const { setCitySearchHisory } = weather.actions

export default weather.reducer;