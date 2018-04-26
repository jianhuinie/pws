import React from 'react';
import ReactDom from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
require('css-loader!./index.styl');

ReactDom.render((
    <Router
        history={hashHistory}
        routes={routes}
    />
), document.getElementById('app'));