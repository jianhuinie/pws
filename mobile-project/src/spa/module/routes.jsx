import React, { PropTypes } from 'react';
import { Route } from 'react-router';
// 所有route在这里加
// import demoRoutes from '../demo/routes';
import pageRoutes from './page/routes';
import activityRoutes from './activity/routes';

class App extends React.Component {
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
// }(demoRoutes, pageRoutes));
}(pageRoutes, activityRoutes));


export default routesPromise;