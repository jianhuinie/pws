import React from 'react';
import { Route } from 'react-router';
import PopularContainer from './index';

const routes = (
    <Route
        key="activity-rank-popular"
        path="share"
        component={PopularContainer}
    >
    </Route>
);

export default routes;