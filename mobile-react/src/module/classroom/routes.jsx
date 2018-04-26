import React from 'react';
import { Route } from 'react-router';
import classroomContainer from './index';

const routes = (
    <Route
        key="classroom"
        path="classroom"
        component={classroomContainer}
    >
    </Route>
);

export default routes;