import React from 'react';
import { Route, hashHistory } from 'react-router';
import SignContainer from './index';
import HomePage from './HomePage/index';
import ResultPage from './ResultPage/index';
import FailPage from './FailPage/index';
import CONFIG from '../config';
const service = require('common/service');
const urlUtil = require('util/url_v2');

function getHash() {
    const subjectId = urlUtil.parseQuery(location.search).subject_id;
    const data = {};
    if (subjectId) {
        data.subject_id = subjectId;
    }
    service
        .get(
            CONFIG.PATHS.SIGN_STATUS,
            data
        )
        .then(function (res) {
            if (res.code === 0) {
                const dt = res.data;
                switch (dt.status) {
                    case CONFIG.SIGN_STATUS.NO_VERIFY:
                        // 招募未通过审核
                        hashHistory.replace('one2one/best/rs/recruit/fail');
                        break;
                    case CONFIG.SIGN_STATUS.NO_SIGN_WITH_SUCCESS_VERIFY:
                        // 已通过审核，未签约
                        hashHistory.replace('one2one/best/rs/sign/home');
                        break;
                    case CONFIG.SIGN_STATUS.IS_SIGN:
                        // 已签约
                        hashHistory.replace('one2one/best/rs/sign/result');
                        break;
                    case CONFIG.SIGN_STATUS.NO_RECRUIT:
                        // 未申请招募
                        hashHistory.replace('one2one/best/rs/recruit/home');
                        break;
                }
            } else if (res.code === 401) {
                location.href = res.redirect_url + encodeURIComponent('#/one2one/best/rs/sign/');
            }
        });
}

const onEnter = (nextState, replace) => {
    const hash = nextState.location.pathname;
    if (hash !== '/one2one/best/rs/sign/') {
        // 如果是直接打开子页面，则进行替换后跳转，由父级跳转
        replace({ pathname: '/one2one/best/rs/sign/' });
        return;
    }
    getHash();
};

const routes = (
    <Route
        key="one2one-sign"
        path="sign"
        onEnter={onEnter}
        component={SignContainer}
    >
        <Route
            key="one2one-sign-home"
            path="home"
            component={HomePage}
        />
        <Route
            key="one2one-sign-fail"
            path="fail"
            component={FailPage}
        />
        <Route
            key="one2one-sign-result"
            path="result"
            component={ResultPage}
        />
    </Route>
);

export default routes;