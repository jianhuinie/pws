/**
 * @file 获取老师成功案例信息
 * @path /api/tcenter/success-case/list
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        query_success_cases: [
            {
                id: "13824",
                title: '相关案例1',
                date: '2017-04-08',
                content: '相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1',
                verify_status: "PASS",
                verify_outer_reasons: null    
            },
            {
                id: "13824",
                title: '相关案例1',
                date: '2017-04-08',
                content: '相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1',
                verify_status: "PASS",
                verify_outer_reasons: null    
            },
            {
                id: "13824",
                title: '相关案例1',
                date: '2017-04-08',
                content: '相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1',
                verify_status: "PASS",
                verify_outer_reasons: null    
            },
            {
                id: "13824",
                title: '相关案例1',
                date: '2017-04-08',
                content: '相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1',
                verify_status: "PASS",
                verify_outer_reasons: null    
            },
            {
                id: "13824",
                title: '相关案例1',
                date: '2017-4-8',
                content: '相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1相关案例1',
                verify_status: "PASS",
                verify_outer_reasons: null    
            }
            
        ]
    };

    return data;
};
