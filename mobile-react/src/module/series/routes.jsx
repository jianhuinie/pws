import React from 'react';
import { Route } from 'react-router';
import seriesContainer from './index';

const routes = (
    <Route
        key="series"
        path="series"
        component={seriesContainer}
    >
    </Route>
);

export default routes;