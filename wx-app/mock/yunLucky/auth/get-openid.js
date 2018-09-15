/**
 * @file 获取openid
 * @path /auth/get-openid
 * @author niejianhui
 */
var mockCreatFunction = function() {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        openid: 12,
        token: 'hsdahsfdjhdsjfkhsdjkfhjsdk'        
    };

    return data;
};