import React from 'react';
import { Route } from 'react-router';
import BestRounter from './best/routes';

class One2OneIndex extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="one2one">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="one2one"
            path="one2one"
            component={One2OneIndex}
        >
            {routes};
        </Route>
    );
}(BestRounter));

export default routesPromise;