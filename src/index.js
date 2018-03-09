import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

export const socket = io.connect('https://calcutta-socket.herokuapp.com/4000')

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
