/**
 * ajaxService.
 */
import $ from 'zepto';
import ui from 'gsx-design/component/ui';
const defaultErrorMessage = '网络请求失败, 请稍后重试';

function errorHandler(res) {
    const code = res.code;
    const text = res.msg || defaultErrorMessage;
    if (code === 401) {
        location.href = '/login?targetUrl=' + encodeURIComponent(location.href);
    } else if (code === 403 || code === 400 || code === 404 || code === 500) {
        location.replace('/mweb/error/');
    } else {
        ui.toast(text);
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

function synchGet(url, data) {
    const promise = $.ajax({
        url: url,
        type: 'GET',
        data: data,
        // data: JSON.stringify(data),
        // contentType: 'application/json;charset=utf-8',
        async: false,
    });
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

function postForm(url, data) {
    return $.ajax({
        url: url,
        type: 'POST',
        data: data,
        processData: false,
        contentType: false
    }).then((res) => {
        if (res.code === 200) {
            return res;
        }
        errorHandler(res);
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
    post: post,
    postForm: postForm,
    synchGet: synchGet,
};
