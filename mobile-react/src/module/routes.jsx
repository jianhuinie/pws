import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import CommonController from 'common/controller/CommonController';
// 所有route在这里加
import demoRoutes from './demo/routes';
class App extends CommonController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="main">
                {this.props.children}
            </div>
        );
    }
}
// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="root"
            path="/"
            component={App}
        >    
            {routes}
        </Route>
    );
// router在这里加
}(demoRoutes));

export default routesPromise;