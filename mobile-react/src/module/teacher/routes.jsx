import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import CommonController from 'common/controller/CommonController';
// 所有route在这里加
import initRoutes from './initialization/routes';
import managerRoutes from './manager/routes';
import authenRoutes from './authentication/routes';

class Teacher extends CommonController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="teacher">
                {this.props.children}
            </div>
        );
    }
}
// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="teacher"
            path="teacher"
            component={Teacher}
        >
            {routes}
        </Route>
    );
// router在这里加
}(initRoutes, managerRoutes, authenRoutes));


export default routesPromise;