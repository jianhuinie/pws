import React from 'react';
import { Route } from 'react-router';
import IndexComponetDemo from './index';
import ReactComponetDemo from './react/index';
import StylDemo from './styl/index';
import AjaxDemo from './ajax/index';
import AsyncDemo from './async/index';
import ReduxDemo from './redux/routes';
import ReactReduxDemo from './react-redux/index';

const routes = (
    <Route
        key="demo"
        path="demo"
        component={IndexComponetDemo}
    >
        <Route
            key="demo-react"
            path="react"
            component={ReactComponetDemo}
        />
        <Route
            key="demo-styl"
            path="styl"
            component={StylDemo}
        />
        <Route
            key="demo-ajax"
            path="ajax"
            component={AjaxDemo}
        />
        <Route
            key="demo-async"
            path="async"
            component={AsyncDemo}
        />
        <Route
            key="demo-react-redux"
            path="react-redux"
            component={ReactReduxDemo}
        />
        {ReduxDemo}
    </Route>
);

export default routes;