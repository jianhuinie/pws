import React from 'react';
import { Route, hashHistory } from 'react-router';
import RecruitContainer from './index';
import HomePage from './HomePage/index';
import SuccPage from './SuccPage/index';
import FailPage from './FailPage/index';
import CONFIG from '../config';
const service = require('common/service');

function getHash() {
    service
        .get(
            CONFIG.PATHS.RECRUIT_STATUS
        )
        .then(function (res) {
            if (res.code === 0) {
                if (!res.data.is_login) {
                    // 未登录统一跳转到首页
                    hashHistory.replace('one2one/best/rs/recruit/home');
                    return;
                }
                const dt = res.data;
                switch (dt.status) {
                    case CONFIG.RECRUIT_STATUS.NO_RECRUIT:
                        // 未申请招募
                        hashHistory.replace('one2one/best/rs/recruit/home');
                        break;
                    case CONFIG.RECRUIT_STATUS.IS_VERIFING:
                        // 招募审核中
                        hashHistory.replace('one2one/best/rs/recruit/success');
                        break;
                    case CONFIG.RECRUIT_STATUS.VERIFY_REFUSE:
                        // 招募未通过审核
                        hashHistory.replace('one2one/best/rs/recruit/fail');
                        break;
                    case CONFIG.RECRUIT_STATUS.VERIFY_SUCCESS:
                        // 招募审核通过
                        hashHistory.replace('one2one/best/rs/sign/home');
                        break;
                    case CONFIG.RECRUIT_STATUS.NO_VALID:
                        hashHistory.replace('one2one/best/rs/recruit/home/1');
                        break;
                }
            } else if (res.code === 401) {
                location.href = res.redirect_url + encodeURIComponent('#/one2one/best/rs/recruit/');
            }
        });
}

const onEnter = (nextState, replace) => {
    const hash = nextState.location.pathname;
    if (hash !== '/one2one/best/rs/recruit/') {
        // 如果是直接打开子页面，则进行替换后跳转，由父级跳转
        replace({ pathname: '/one2one/best/rs/recruit/' });
        return;
    }
    getHash();
};

const routes = (
    <Route
        key="one2one-best-recruit"
        path="recruit"
        onEnter={onEnter}
        component={RecruitContainer}
    >
        <Route
            key="one2one-best-recruit-home"
            path="home(/:isNoValid)"
            component={HomePage}
        />
        <Route
            key="one2one-best-recruit-success"
            path="success"
            component={SuccPage}
        />
        <Route
            key="one2one-best-recruit-fail"
            path="fail"
            component={FailPage}
        />
    </Route>
);

export default routes;