/**
 * @file HTTP 请求统一处理
 * @author xiazhiyao<xiazhiyao@baijiahulian.com>
 */
import axios from 'axios';
import React from 'react';
import {Modal, message} from 'antd';
import util from '~/util/util';

const defaultErrorMessage = '网络请求失败, 请稍后重试';
const token = util.parseCookie(document.cookie).AUTH_TOKEN || '';

// 获取当前环境
const getCurrentEnv = () => {
    let env;
    env = window.location.host.split('.')[0].split('-')[0];
    if (env.indexOf(':') > -1 || env.indexOf('127') > -1 || env.indexOf('172') > -1) {
        env = 'dev';
    }
    return env;
};

let baseURL;
const envType = getCurrentEnv();
if (envType === 'test' || envType === 'beta') {
    baseURL = 'https://' + envType + '.genshuixue.com';
} else if (envType === 'www') {
    baseURL = 'https://www.genshuixue.com';
} else {
    baseURL = 'http://mock.baijiahulian.com/mock/5b07bb0d3832de6725526274/www-api-php-pc';
}

// 生成uuid
const generateUuid = (len, radix) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        let r;
        uuid[8] = '-';
        uuid[13] = '-';
        uuid[18] = '-';
        uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
};

const instance = axios.create({
    baseURL,
    timeout: 5000,
    retry: 3,
    retryDelay: 1000,
    params: {
        appType: 5
    },
});

const alertErrorInfo = res => {
    const text = res.status === 0
        ? '请求超时，请稍后重试'
        : (res.msg || defaultErrorMessage) + (res.status ? '(' + res.status + ')' : '');
    const loggerId = res.loggerId || '';
    const reactElement = React.createElement(
        'div', {
            className: 'error-info'
        },
        React.createElement('div', {className: 'error-text'}, text),
        React.createElement('div', {className: 'logger-id'}, loggerId.substr(0, 10)),
    );

    if (res.status !== 0) {
        Modal.info({
            title: '温馨提示',
            content: reactElement,
            okText: '确定',
        });
    }
};

let haveAlertModal = false;
const handler = res => {
    const ua = 'WenZaiZhiBoClient';
    // 未登陆
    if (res.code === 401) {
        if (navigator.userAgent.indexOf(ua) !== -1) {
            const nextUrl = location.origin + '/pcweb/#/Login';
            location.href = '/auth/logout?next=' + encodeURIComponent(nextUrl);
        } else {
            const nextUrl = '/static/login?next=' + encodeURIComponent(location.href);
            location.href = '/auth/logout?next=' + encodeURIComponent(nextUrl);
        }
    }

    // 302直接跳转
    if (res.code === 302) {
        window.location.href = res.redirect_url;
        return;
    }

    // 307用于处理重定向制定URL  后端会返回跳转scheme
    if (res.code === 307) {
        message.info(res.msg, 1.5, () => {
            util.skipScheme(res.scheme);
        });
    }

    // 1004用于处理重定向制定URL  后端会返回跳转scheme
    // 1003-被踢  1004-token失效 1005
    if (res.code === 1003) {
        if (haveAlertModal) {
            return;
        }
        if (navigator.userAgent.indexOf(ua) !== -1) {
            haveAlertModal = true;
            Modal.info({
                title: '温馨提示',
                content: res.msg,
                okText: '确定',
                onOk: () => {
                    instance
                        .get('/sapi/auth/logout')
                        .then(() => {
                            window.location.reload();
                        });
                }
            });
        }
    }

    if (res.code === 1004) {
        if (haveAlertModal) {
            return;
        }
        haveAlertModal = true;
        Modal.info({
            title: '温馨提示',
            content: res.msg,
            okText: '确定',
            onOk: () => {
                instance
                    .get('/sapi/auth/logout')
                    .then(() => {
                        window.location.reload();
                    });
            }
        });
    }
    // code为888889是竞品老师评价的时候的错误码
    // code为1000111发送验证码时，需要出图形验证码的错误码
    // code为110056发送验证码时，图形验证码无效
    if (
        res.code !== 0
        && res.code !== 1004
        && res.code !== 1000111
        // && res.code !== 110056
        && (res.code !== 990000 && res.code !== 888889)
    ) {
        alertErrorInfo(res);
    }
};

const success = ({data, config}) => {
    // TODO: 增加通用的处理逻辑
    // 需要统一返回的 JSON 格式
    // 然后可以识别到响应异常，作统一处理，比如弹窗
    // 比如增加同样的 request 拦截，显示 loading 状态
    // 然后在 response 里隐藏 loading 状态
    // 返回数据
    const {headers} = config;
    return new Promise((resolve, reject) => {
        if (data.code === 0) {
            resolve(data);
        } else {
            handler(Object.assign(data, {
                loggerId: headers['Logger-Id']
            }));
            reject(data);
        }
    });
};

const failData = {
    code: 500,
    msg: 'timeout'
};

const fail = res => {
    const {config, request} = res;
    // 重复请求
    if (!config || !config.retry) {
        return new Promise((resolve, reject) => {
            let res;
            try {
                res = JSON.parse(request.response);
            } catch (err) {
                res = null;
            }
            if (request && res) {
                alertErrorInfo(Object.assign(res, {
                    status: request.status
                }));
            } else {
                alertErrorInfo(Object.assign(request, {loggerId: config.headers['Logger-Id']}));
            }
            reject(Object.assign(request, {loggerId: config.headers['Logger-Id']}));
        });
    }
    config.retryCount = (config.retryCount | 0) + 1;
    if (config.retryCount > config.retry) {
        return new Promise((resolve, reject) => {
            let res;
            try {
                res = JSON.parse(request.response);
            } catch (err) {
                res = null;
            }
            if (request && res) {
                alertErrorInfo(Object.assign(res, {
                    status: request.status
                }));
            } else {
                alertErrorInfo(Object.assign(request, {loggerId: config.headers['Logger-Id']}));
            }
            reject(Object.assign(request, {loggerId: config.headers['Logger-Id']}));
        });
    }
    return new Promise(resolve => setTimeout(resolve, config.retryDelay)).then(() => instance.request(config));
};


instance.interceptors.request.use(config => {
    config.headers = {
        'Accept': '*/*',
        'token': token,
        'X-Requested-With': 'XMLHttpRequest',
        'Logger-Id': generateUuid(32, 16),
    };
    return config;
});


instance.interceptors.response.use(
    success,
    fail
);

instance.axios = axios;

export default instance;

