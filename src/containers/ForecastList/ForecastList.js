import React, { useState } from 'react';
import { Col, Row, Spin } from 'antd';
import { DailyForecastCard } from '../../components/DailyForecastCard/DailyForecastCard';
import { WeatherForm } from '../../components/WeatherForm/WeatherForm';
import { fetchWeather, mergeDailyForecast } from '../../utils';
import { useDispatch } from 'react-redux';
import { fetchDaWeather } from '../../slices/weatherSlice'

export const ForecastList = () => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState([]);
  const dispatch = useDispatch()

  const onSearchHandler = (location) => {
    try {
      setLoading(true);
      dispatch(fetchDaWeather(location));
      debugger;
      //const mappedForecast = mergeDailyForecast(response?.list);
      //setWeather(mappedForecast);
      setLoading(false);
    } catch(error) {
      console.log(`Error while retrieveing weather: ${error}`);
    }
    setLoading(false);
  };

  const onSearchHandler2 = async (location) => {
    try {
      setLoading(true);
      const response = await fetchWeather(location);
      debugger;
      dispatch(fetchDaWeather(location));
      debugger;
      const mappedForecast = mergeDailyForecast(response?.list);
      setWeather(mappedForecast);
      setLoading(false);
    } catch(error) {
      debugger;
      console.log(`Error while retrieveing weather: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      <WeatherForm onSearchHandler={onSearchHandler}/>
      {
        loading ?
          <Spin /> :
          <Row gutter={[0, 16]}>
            {
              Object.entries(weather).map(([day, hourly]) => (
                <Col span={4}>
                  <DailyForecastCard day={day} hourlyForecast={hourly}/>
                </Col>
              ))
            }
          </Row>
      }
    </>
  );
};
