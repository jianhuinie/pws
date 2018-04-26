import React from 'react';
import { Route } from 'react-router';
import ReduxIndexDemo from './index';
import ReduxCounterDemo from './counter/index';

const routes = (
    <Route
        key="demo-redux"
        path="redux"
        component={ReduxIndexDemo}
    >
        <Route
            key="demo-redux-counter"
            path="counter"
            component={ReduxCounterDemo}
        />
    </Route>
);

export default routes;