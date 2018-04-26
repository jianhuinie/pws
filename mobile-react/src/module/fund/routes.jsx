import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import PageController from 'common/controller/PageController';
// 所有route在这里加
import Wallet from './wallet/index';
import Details from './details/index';
import Withdraw from './withdraw/index';
import Records from './records/index';

class Fund extends PageController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="fund">
                {this.props.children}
            </div>
        );
    }
}
// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="fund"
            path="fund"
            component={Fund}
        >   
            <Route
                key="wallet"
                path="wallet"
                component={Wallet} 
            />
            <Route
                key="details"
                path="details"
                component={Details} 
            />
            <Route
                key="withdraw"
                path="withdraw"
                component={Withdraw} 
            />
            <Route
                key="records"
                path="records"
                component={Records} 
            />
            {routes}
        </Route>
    );
// router在这里加
}());


export default routesPromise;