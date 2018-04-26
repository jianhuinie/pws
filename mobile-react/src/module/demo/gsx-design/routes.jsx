import React from 'react';
import { Route } from 'react-router';
import ReduxIndexDemo from './index';
import GSXDesignAlertDemo from './alert/index';
import GSXDesignToastDemo from './toast/index';
import GSXDesignConfirmDemo from './confirm/index';
import GSXDesignLoadingDemo from './Loading/index';
import GSXDesignImagePlayerDemo from './ImagePlayer/index';
import GSXDesignSlideInDialogDemo from './SlideInDialog/index';

const routes = (
    <Route
        key="demo-gsx-design"
        path="gsx-design"
        component={ReduxIndexDemo}
    >
        <Route
            key="demo-gsx-design-alert"
            path="alert"
            component={GSXDesignAlertDemo}
        />
        <Route
            key="demo-gsx-design-toast"
            path="toast"
            component={GSXDesignToastDemo}
        />
        <Route
            key="demo-gsx-design-confirm"
            path="confirm"
            component={GSXDesignConfirmDemo}
        />
        <Route
            key="demo-gsx-design-loading"
            path="Loading"
            component={GSXDesignLoadingDemo}
        />
        <Route
            key="demo-gsx-design-imageplayer"
            path="ImagePlayer"
            component={GSXDesignImagePlayerDemo}
        />
        <Route
            key="demo-gsx-design-slideindialog"
            path="SlideInDialog"
            component={GSXDesignSlideInDialogDemo}
        />
    </Route>
);

export default routes;