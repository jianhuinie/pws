import React from 'react';
import { Route } from 'react-router';
import singleContainer from './index';

const routes = (
    <Route
        key="single"
        path="single"
        component={singleContainer}
    >
    </Route>
);

export default routes;