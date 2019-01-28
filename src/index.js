//pollyfill
import 'react-app-polyfill/ie9';
import 'babel-polyfill';
import 'fast-text-encoding';

//react app
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';


ReactDOM.render(<App />, document.getElementById('root'));


