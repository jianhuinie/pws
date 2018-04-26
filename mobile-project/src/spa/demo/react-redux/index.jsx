import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './app';

const store = createStore(todoApp);

export default React.createClass({
    render: function () {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
});