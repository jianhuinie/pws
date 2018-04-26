import React from 'react';
import { Route } from 'react-router';
import richEditorIndex from './index';

const routes = (
    <Route
        key="richEditor"
        path="richEditor"
        component={richEditorIndex}
    >
    </Route>
);

export default routes;