import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Single from './index';
import SingleEdit from './SingleEdit/index';
import SingleList from './SingleList/index';

const routes = (
    <Route
        key="single"
        path="single"
        component={Single}
    >   
        <IndexRoute
            component={SingleList}
        />
        <Route
            key="single-edit"
            path="edit"
            component={SingleEdit}
        />
    </Route>
);

export default routes;