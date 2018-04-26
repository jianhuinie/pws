import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import PageController from 'common/controller/PageController';
// 所有route在这里加
class Manager extends PageController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="manager">
                {this.props.children}
            </div>
        );
    }
}
const routes = (
    <Route
        key="manager"
        path="manager"
        component={Manager}
    >
    </Route>
);

export default routes;