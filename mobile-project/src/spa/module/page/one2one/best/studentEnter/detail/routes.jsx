import React from 'react';
import { Route } from 'react-router';
import DetailContainer from './index';

const routes = (
    <Route
        key="one2one-best-detail"
        path="detail"
        component={DetailContainer}
    >
    </Route>
);

export default routes;