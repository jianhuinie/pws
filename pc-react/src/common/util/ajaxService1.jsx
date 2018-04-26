/**
 * 公共ajax方法
 */
import axios from 'axios';

axios.interceptors.response.use((res) => {
    return res.data;
});
// post默认json提交
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 超时时间
axios.defaults.timeout = 3000;

const defaultErrorMessage = '网络请求失败, 请稍后重试';

function alertErrorInfo(res) {
    alert(res.msg || defaultErrorMessage);
}

const errorHandler = (res) => {
    const code = res.code;
    // 未登陆
    if (code >= 400 && code < 500) {
        alertErrorInfo(res);
    } else if (code === 302) {
        location.href = res.redirect_url;
    } else {
        alertErrorInfo(res);
    }
};

const send = (type = 'POST', url, data) => {
    return axios({
            url,
            method: type,
            data
        })
        .then((res) => {
            if (res.code === 200) {
                return res;
            }
            errorHandler(res);
        });
};

const post = (url, data) => {
    return send('POST', url, data);
};

const get = (url, data) => {
    return send('GET', url, data);
};

const service = {
    post: post,
    get: get
};

export default service;