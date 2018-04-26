import React from 'react';
import { Route } from 'react-router';
import signRouter from './sign/routes';
import recruitRouter from './recruit/routes';

class RSIndex extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="rs">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="one2one-best-rs"
            path="rs"
            component={RSIndex}
        >
            {routes};
        </Route>
    );
}(signRouter, recruitRouter));

export default routesPromise;