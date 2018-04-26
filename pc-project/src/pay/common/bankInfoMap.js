define(function () {
    // 非快钱的编号集合，即快捷支付的银行code
    return {
        quickPay: {
            SPDB_D: 1,
            PSBC_D: 1,
            CITIC_D: 1,
            BOS_D: 1,
            JSB_D: 1,
            NBCB_D: 1,
            HZB_D: 1,
            BNC_D: 1,
            BOB_C: 1,
            NBCB_C: 1,
            BJRCB_C: 1
        },
        code2Name: {
            CMB: '招商银行',
            ICBC: '中国工商银行',
            CCB: '中国建设银行',
            ABC: '中国农业银行',
            BOB: '北京银行',
            BOC: '中国银行',
            SPDB: '浦发银行',
            CIB: '兴业银行',
            PSBC: '中国邮政储蓄银行',
            CGB: '广发银行',
            CEB: '光大银行',
            PAB: '平安银行',
            CMBC: '民生银行',
            CITIC: '中信银行',
            BOCD: '成都银行',
            BOS: '上海银行',
            BJRCB: '北京农村商业银行',
            NBCB: '宁波银行',
            HZB: '杭州银行',
            SRCB: '上海农商银行',
            HXB: '华夏银行',
            JSB: '江苏银行',
            BNC: '南昌银行'
        },
        type2Name: {
            C: '信用卡',
            D: '储蓄卡'
        }
    };
})