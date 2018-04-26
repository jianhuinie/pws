import React from 'react';
import { Route } from 'react-router';
import IndexComponetDemo from './index';
import ReactComponetDemo from './react/index';
import StylDemo from './styl/index';
import AjaxDemo from './ajax/index';
import ReduxDemo from './redux/routes';
import GSXDesignDemo from './gsx-design/routes';
import ReactReduxDemo from './react-redux/index';
import IconDemo from './icon/index';
import SlideInDialogDemo from './SlideInDialog/index';

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
            key="demo-react-redux"
            path="react-redux"
            component={ReactReduxDemo}
        />
        <Route
            key="demo-icon"
            path="icon"
            component={IconDemo}
        />
        <Route
            key="demo-slideindialog"
            path="slideindialog"
            component={SlideInDialogDemo}
        />
        {ReduxDemo}
        {GSXDesignDemo}
    </Route>
);

export default routes;