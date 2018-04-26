import React from 'react';
import { Route, Redirect } from 'react-router';
import rsRouter from './rs/routes';
import seRouter from './studentEnter/routes';
import tplRouter from './tpl/routes';

class BestIndex extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="best">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="one2one-best"
            path="best"
            component={BestIndex}
        >
            <Redirect from="sign/" to="rs/sign/" />
            <Redirect from="sign/home" to="rs/sign/home" />
            {routes}
        </Route>
    );
}(rsRouter, seRouter, tplRouter));

export default routesPromise;