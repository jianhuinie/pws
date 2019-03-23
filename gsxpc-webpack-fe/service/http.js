/**
 * @file HTTP 请求统一处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */
import axios from 'axios';

import uuid from '../util/uuid';

/* eslint-disable no-magic-numbers, no-console */
const port = process.env.PORT || 3000;

const apiPort = process.env.API_PORT || 20009;

const defaultEnvType = 'local';
const envType = process.env.ENV_TYPE || defaultEnvType;
const isServer = !process.browser;

const baseURL = isServer
    ? `http://127.0.0.1:${envType !== defaultEnvType && apiPort || port}`
    : '';

const instance = axios.create({
    baseURL,
    timeout: isServer ? 500 : 3000,
    retry: isServer ? 0 : 3,
    retryDelay: 1000
});

// 设置loggerId
instance.defaults.headers.common['Logger-Id'] = uuid();

const success = ({data, config}) => {
    if (isServer) {
        const elapsed = process.uptime() * 1000 - config.log.start;
        if (elapsed > 500) {
            data.loggerID = config.log.loggerID;
            config.log.elapsed = elapsed;
            console.warn(config);
        }
    }

    // TODO: 增加通用的处理逻辑
    // 需要统一返回的 JSON 格式
    // 然后可以识别到响应异常，作统一处理，比如弹窗
    // 比如增加同样的 request 拦截，显示 loading 状态
    // 然后在 response 里隐藏 loading 状态
    return data;
};

const failData = {
    code: 500,
    msg: 'timeout'
};

const fail = res => {
    const {config} = res;

    if (!config || !config.retry) {
        if (isServer) {
            const elapsed = process.uptime() * 1000 - config.log.start;
            if (elapsed > 500) {
                config.log.elapsed = elapsed;
                console.warn(config);
            }

            console.debug(res);
        }

        return Promise.resolve(failData);
    }

    config.retryCount = (config.retryCount | 0) + 1;
    if (config.retryCount > config.retry) {
        return Promise.resolve(failData);
    }

    return new Promise(resolve => setTimeout(resolve, config.retryDelay)).then(() => instance.request(config));
};


instance.interceptors.request.use(
    config => {
        if (isServer) {
            const {baseURL, url, params, method} = config;
            config.log = {
                baseURL,
                url,
                params,
                method,
                start: process.uptime() * 1000,
                loggerID: uuid(),
                time: new Date()
            };
        }

        return config;
    }
);


instance.interceptors.response.use(
    success,
    fail
);

instance.axios = axios;

export default instance;
