import React from 'react';
import { Route } from 'react-router';
import liveHelpContainer from './index';

const routes = (
    <Route
        key="activity-zhibohelp"
        path="liveHelp"
        component={liveHelpContainer}
    >
    </Route>
);

export default routes;