import React, { PropTypes } from 'react';
import { Route, IndexRedirect } from 'react-router';
// 所有route在这里加
import demoRoutes from './demo/routes';
import Course from './Course/index';
import Classroom from './Classroom/index';
import Income from './Income/index';
import Order from './Order/index';
import Purse from './Purse/index';
import SingleRoutes from './Single/routes';
import SeriesRoutes from './Series/routes';
import VideoRoutes from './Video/routes';
import LeftSider from 'common/components/LeftSider/index';
import TopBanner from 'common/components/TopBanner/index';

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
                <TopBanner />
                <LeftSider />
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
            <IndexRedirect 
                to="/classroom"
            />
            {routes}
            {SingleRoutes}
            {SeriesRoutes}
            {VideoRoutes}
            <Route
                key="income"
                path="income"
                component={Income} 
            />
            <Route
                key="order"
                path="order"
                component={Order} 
            />
            <Route
                key="purse"
                path="purse"
                component={Purse} 
            />
            <Route
                key="course"
                path="course"
                component={Course} 
            />
            <Route
                key="classroom"
                path="classroom"
                component={Classroom} 
            />
            {/* <Route 
                key="any" 
                path=":any"
                component={Classroom}
            /> */}
        </Route>
    );
// router在这里加
}(demoRoutes));


export default routesPromise;