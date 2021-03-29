import { notification } from 'antd';
import { setup } from 'axios-cache-adapter';

const api = setup({
  // `axios` options
  baseURL: 'http://api.openweathermap.org',

  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000
  }
});

export const fetchWeather = ({search, units}) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = 'http://api.openweathermap.org';

  return fetch(`${BASE_URL}/data/2.5/forecast?q=${search}&appid=${API_KEY}&units=${units}`)
    .then(async (response) => {
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message);
      }
      return result;
    })
    .catch((error) => {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    });
};

export const getWeather = async (city = '') => {
  debugger;
  const params = {
    appid: process.env.REACT_APP_API_KEY,
    q: city
  };

  const queryParams = new URLSearchParams(params);
  const queryString = Object.keys(params).length ? `?${queryParams}` : '';

  try {
    const response = await api.get(`/data/2.5/forecast${queryString}`);
    return response.data;
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error.response.data.detail
    });
    return error;
  }
};

export const mergeDailyForecast = (weather) => {
    return weather.reduce((dailyForecast, threeHourForecast, index) => {
      const currentDate = threeHourForecast?.dt_txt.split(' ')[0];
      const dateKey = getDateKey(currentDate);

      dailyForecast[dateKey] = [threeHourForecast];

      return dailyForecast;
    }, {});
};

const getDateKey = (date) => {
  return new Date(date).toLocaleDateString('en-us', { weekday: 'long' });
};
