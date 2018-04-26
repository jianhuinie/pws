/**
 * ajaxService.
 */

import { message } from 'antd';
const defaultErrorMessage = '网络请求失败, 请稍后重试';

function errorHandler(res) {
    const text = res.msg || defaultErrorMessage;
    if (res.code === 401) {
        location.href = location.origin + '/login?targetUrl=' + location.origin + '/pcweb/#/classroom';
    } else {
        message.error(text, 3);
        // alert(text);
    }
}

function send(type, url, data) {
    let promise;
    if (type === 'POST') {
        promise = $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json;charset=utf-8'
        });
    } else {
        promise = $.get(url, data);
    }
    return new Promise((resolve, reject) => {
        return promise.then((res) => {
            if (res.code === 200) {
                resolve(res);
            } else {
                errorHandler(res);
                reject();
            }
        });
    });
}

const get = function (url, data) {
    return send('GET', url, data);
};

const post = function (url, data) {
    return send('POST', url, data);
};

export default {
    get: get,
    post: post
};
