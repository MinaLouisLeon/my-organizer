import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {createStore} from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';

window.serverIp = 'http://localhost:3001';

const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);