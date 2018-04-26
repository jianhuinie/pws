import React from 'react';
import { Route } from 'react-router';
import SearchContainer from './index';

const routes = (
    <Route
        key="one2one-best-search"
        path="search"
        component={SearchContainer}
    >
    </Route>
);

export default routes;