/**
 * @file 获取常用地址
 * @path /api/tcenter/addresses/default-address
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var obj = {
        code: 0,
        pageDto: null,
        error: null
    };

    obj.data = {
        address_default: {
            id: 42690,
            location_addr: "欧亚上影(上海影城店)"
        }
    }
    

    return obj;
};
