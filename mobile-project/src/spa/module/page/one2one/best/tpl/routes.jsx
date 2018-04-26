import React from 'react';
import { Route } from 'react-router';
import abroadRouter from './abroad/routes';

class TplIndex extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="tpl">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="one2one-best-tpl"
            path="tpl"
            component={TplIndex}
        >
            {routes};
        </Route>
    );
}(abroadRouter));

export default routesPromise;