import React from 'react';
import { Card } from 'antd';

export const DailyForecastCard = ({ day, hourlyForecast }) => (
  <Card title={day}>
    <p>Date: {hourlyForecast[0]?.dt_txt}</p>
    <p>Current Temp: {hourlyForecast[0]?.main?.temp}</p>
    <p>Feels Like: {hourlyForecast[0]?.main?.feels_like}</p>
    <p>Temp Min: {hourlyForecast[0]?.main?.temp_min}</p>
    <p>Temp Max: {hourlyForecast[0]?.main?.temp_max}</p>
  </Card>
);
