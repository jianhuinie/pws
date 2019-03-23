/**
 * @file 通用 container
 * @author chris<wfsr@foxmail.com>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import store from './store';

const render = Component => {

    ReactDOM.render(
        <Provider store={store}>
            <Router basename="newpcweb/#/">
                <Component />
            </Router>
        </Provider>,
        document.getElementById('app')
    );

    return render;
};

render(App);
