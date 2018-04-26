import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import PageController from 'common/controller/PageController';
// 所有route在这里加
import Home from './home/index';
import Follow from './follow/index';
import Purchase from './purchase/index';
import Phone from './phone/index';
import BasicModify from './basicModify/index';
import courseRoutes from './course/routes';

class Student extends PageController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="student">
                {this.props.children}
            </div>
        );
    }
}
// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="student"
            path="student"
            component={Student}
        >   
            <Route
                key="home"
                path="home"
                component={Home} 
            />
            <Route
                key="follow"
                path="follow"
                component={Follow} 
            />
            <Route
                key="purchase"
                path="purchase"
                component={Purchase} 
            />
            <Route
                key="modify"
                path="modify"
                component={BasicModify} 
            />
            <Route
                key="phone"
                path="phone"
                component={Phone} 
            />
            {routes}
        </Route>
    );
// router在这里加
}(courseRoutes));


export default routesPromise;