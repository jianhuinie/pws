import React from 'react';
import { Route } from 'react-router';
import shareRounter from './share/routes';
import popularRouter from './popular/routes';
class honorRank extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="honorRank">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="honorRank"
            path="honorRank"
            component={honorRank}
        >
            {routes};
        </Route>
    );
}(popularRouter, shareRounter));

export default routesPromise;