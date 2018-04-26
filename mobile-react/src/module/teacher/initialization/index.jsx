import React from 'react';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import Util from 'common/util/util';

// Util.sharePage();
function RouterIndex() {
    return (
        <Router
            history={hashHistory}
            routes={routes}
        />
    );
}

export default RouterIndex;