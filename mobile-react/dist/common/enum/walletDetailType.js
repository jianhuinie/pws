define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var walletTypeEnum = exports.walletTypeEnum = {
        ALL: 0,
        LIVE: 1,
        RELAY: 2,
        SERIES: 3,
        WITHDRAW: 4,
        FEE: 6,
        OTHER: 5
    };
    var walletTypeMap = exports.walletTypeMap = new Map([
        [
            0,
            '全部'
        ],
        [
            1,
            '直播课'
        ],
        [
            2,
            '视频课'
        ],
        [
            3,
            '系列课'
        ],
        [
            4,
            '提现'
        ],
        [
            5,
            '其他'
        ],
        [
            6,
            '支付手续费'
        ]
    ]);
});