/**
 * @file 创建订单
 * @path /payment/create-order
 */
var mockCreatFunction = function () {
    'use strict';
    var obj = {};

    obj = {
        code: 0,
        data: null,
        error: null,
        pageDto: null
    };
    obj.data = {
        "redirect": "http://test-zijin.genshuixue.com/pay/zhifuAuth?key=ziliao%3Azhifu-auth%3A342955%3A0&sign=0922fdbbd03ca2ff1cacaf86d01227ad&next=%252Fpay%252FauthPayment%253Forder_number%253D101612161417700480%2526pay_type%253Dbalancepay%25252Cweixinqrpay%25252Calipcpay"
    }

    return obj;
};
