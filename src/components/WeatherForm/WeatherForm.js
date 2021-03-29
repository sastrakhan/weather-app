import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Radio, Typography } from 'antd';
import { setCitySearchHisory } from '../../slices/weatherSlice'

export const WeatherForm = ({onSearchHandler}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const radioOptions = [
    { label: '°C', value: 'metric' },
    { label: '°F', value: 'imperial' },
  ];

  const previousCityRequest = useSelector(state => state?.weatherR
                                                         .citiesSearchedMinusRecent.join(', '))

  const onFinish = (values) => {
    onSearchHandler(values);
    dispatch(setCitySearchHisory({city: values.search}))
    // Resume with Thunk async call in ForcastList
  };


  console.log(previousCityRequest);
  return (
    <>
    {
      previousCityRequest ? (
        <Typography level={2}>Previously city searched: "{previousCityRequest}"</Typography>
      ) : null
    }
    <Form
      form={form}
      layout="inline"
      name="weather_search"
      onFinish={onFinish}
      role="search"
      initialValues={{ units: 'imperial' }}
    >
      <Form.Item
        label="Search"
        name="city"
        rules={[{ required: true, message: 'Please enter a search term!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Units"
        name="units"
        rules={[{ required: true, message: 'Please enter units!' }]}
      >
        <Radio.Group
          options={radioOptions}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};
