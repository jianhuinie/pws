import React from 'react';
import { Route } from 'react-router';
// 所有route在这里加
import one2oneRoutes from './one2one/routes';
import anniversaryRoutes from './anniversary/routes';

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="page">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="page"
            path="/"
            component={App}
        >
            {routes};
        </Route>
    );
    // return { routes };
}(one2oneRoutes, anniversaryRoutes));

export default routesPromise;