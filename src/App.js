import React from 'react';
import { Provider } from 'react-redux';
import { ForecastList } from './containers/ForecastList/ForecastList';
import Demo from './slotmachine/slotmachine';
//import SlotMachine from './slotmachine/slotMachineBase'
import 'antd/dist/antd.css';
import './App.css';
import store from './store';

const App = () => (
  <Provider store={store}>
    <h1>Helloworld React & Redux-Toolkit!</h1>
    <ForecastList />
    <Demo />
  </Provider>
);

export default App;
