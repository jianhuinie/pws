/**
 * 顶部banner
 * @author leon
 */
import React from 'react';
import { Icon } from 'antd';
import PageController from 'common/controller/PageController';
// import NoticeIcon from 'common/components/NoticeIcon/index';
import AJAXCONFIG from 'common/ajaxConfig';
import service from 'common/util/ajaxService';
require('css-loader!./index.styl');
let logoutTimer;

class TopBanner extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            showLogoutPanel: !1,
            profile: {}
        };
    };

    componentWillMount() {
        const self = this;

        self.getUserInfo();
    }

    getUserInfo = () => {
        const self = this;

        service.post(AJAXCONFIG.GET_USER_INFO).then(function (res) {
            if (res && res.code === 200) {
                self.setState({
                    profile: res.data.user
                });
            }
        });
    }

    showLogout = (e) => {
        e.stopPropagation();
        const self = this;

        self.setState({
            showLogoutPanel: !0
        });
    }

    hideLogout = (e) => {
        e.stopPropagation();
        const self = this;

        logoutTimer = setTimeout(function () {
            self.setState({
                showLogoutPanel: !1
            });
        }, 500);
    }

    keepLogout = (e) => {
        e.stopPropagation();
        clearTimeout(logoutTimer);
    }

    logout = () => {
        $('#logout-form').submit();
    }

    render() {
        const self = this;
        const profile = self.state.profile || {};
        
        return (
            <div className="top-banner">
                <div className="left">
                    <span className="icon-ic-logo"></span>
                </div>
                <div className="right">
                    <div className="user-avator right-item">
                        <img alt="用户头像" src={profile.avatarUrl} />
                    </div>
                    <div className="user-name right-item">{profile.nickName}</div>
                    <div className="show-logout right-item">
                        <Icon 
                            type="caret-down" 
                            onMouseOver={self.showLogout} 
                            onMouseOut={self.hideLogout}
                        />
                        <div 
                            className={self.state.showLogoutPanel ? 'logout-panel' : 'logout-panel hide'}
                            onMouseOver={self.keepLogout} 
                            onMouseOut={self.hideLogout}
                        >
                            <div className="logout-triangle"></div>
                            <div className="logout-btn cursor" onClick={self.logout}>退出</div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <form id="logout-form" action={AJAXCONFIG.LOGOUT} method="post"></form>
            </div>
        );
    }
};

export default TopBanner;