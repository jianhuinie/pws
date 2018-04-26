import React, { PropTypes } from 'react';
import { Route, hashHistory, IndexRoute, Link } from 'react-router';
import PageController from 'common/controller/PageController';
import DiscoveryFooter from 'module/discovery/component/DiscoveryFooter/index';
// 所有route在这里加
import All from './All/index';
import Ready from './Ready/index';
import Bought from './Bought/index';
require('css-loader!./index.styl');

const TAB_CONFIGUE = [{
    name: '全部课程',
    path: '/all'
}, {
    name: '即将开始',
    path: '/ready'
}, {
    name: '已购课程',
    path: '/bought'
}];

class CourseIndex extends PageController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };
    
    render() {
        let current = hashHistory.getCurrentLocation().pathname;
        if (current === '/') {
            current = TAB_CONFIGUE[0].path;
        }
        return (
            <div className="course">
                <div className="course-view">
                    <div className="course-view-tab">
                        {
                            TAB_CONFIGUE.map((tab) => {
                                return (
                                    <div key={tab.path} className="course-view-tab-item">
                                        <Link to={tab.path}>
                                            <div className={`text ${current === tab.path ? 'active' : ''}`}>
                                                {tab.name}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="course-view-content">
                        {this.props.children}
                    </div> 
                    <DiscoveryFooter key="course" current="course" />
                </div>
            </div>
        );
    }
}
// 所有route在这里加
const routes = (
    <Route
        key="course"
        path="/"
        component={CourseIndex}
    >   
        <IndexRoute component={All} />
        <Route
            key="all"
            path="all"
            component={All}
        />
        <Route
            key="ready"
            path="ready"
            component={Ready}
        />
        <Route
            key="bought"
            path="bought"
            component={Bought}
        />
    </Route> 
);

export default routes;