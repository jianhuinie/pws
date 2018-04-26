define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var walletStatusEnum = exports.walletStatusEnum = {
        WAITING: 1,
        SUCCESS: 2,
        FAIL: 3
    };
    var walletStatusMap = exports.walletStatusMap = new Map([
        [
            walletStatusEnum.WAITING,
            '提现中'
        ],
        [
            walletStatusEnum.SUCCESS,
            '提现成功'
        ],
        [
            walletStatusEnum.FAIL,
            '提现失败'
        ]
    ]);
    var walletStatusClassMap = exports.walletStatusClassMap = new Map([
        [
            walletStatusEnum.WAITING,
            'waiting'
        ],
        [
            walletStatusEnum.SUCCESS,
            'success'
        ],
        [
            walletStatusEnum.FAIL,
            'fail'
        ]
    ]);
});