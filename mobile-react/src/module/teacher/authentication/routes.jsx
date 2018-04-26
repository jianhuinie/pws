import React, { PropTypes } from 'react';
import { Route, hashHistory } from 'react-router';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import authStatusEnum from 'common/enum/authStatus';
import PageController from 'common/controller/PageController';
// 所有route在这里加
import Apply from './Apply/index';
import Verifying from './Verifying/index';


class Authentication extends PageController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };

    componentDidMount() {
        ajax.get(ajaxConfig.USER.GET_USER).then((res) => {
            const { authStatus, isTeacher } = res.data.user;
            // const { classId } = res.data.classroom;
            const classId = res.data.classroom && res.data.classroom.classId;
            if (!isTeacher) { // 非老师跳转至个人中心
                location.replace('/mweb/student/home');
                return;
            }
            switch (authStatus) {
                case authStatusEnum.UNAUTHORIZED: {
                    hashHistory.replace('/apply');
                    break;
                }
                case authStatusEnum.WAITING: {
                    setTimeout(function () {
                        hashHistory.replace(`/verifying?id=${classId}`);
                    }, 300);
                    break;
                }
                default: {
                    location.href = '/mweb/teacher/manager/center';
                }
            }
        });
    }

    render() {
        return (
            <div className="authen">
                {this.props.children}
            </div>
        );
    }
}
// 所有route在这里加
const routes = (
    <Route
        key="authen"
        path="/"
        component={Authentication}
    >
        <Route
            key="apply"
            path="apply"
            component={Apply}
        />
        <Route
            key="verifying"
            path="verifying"
            component={Verifying}
        />        
        
    </Route>
);

export default routes;