import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Video from './index';
import VideoList from './VideoList/index';

const routes = (
    <Route
        key="video"
        path="video"
        component={Video}
    >   
        <IndexRoute
            component={VideoList}
        />
    </Route>
);

export default routes;