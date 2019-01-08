import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import AppProvider from './AppProvider';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<AppProvider store={store} />, MOUNT_NODE);
