/**
 * @file 支付相关接口
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');

    var payConstant = require('./constant');

    exports.suggestBank = function (data) {
        return service.post(
            '/pay/suggestBank',
            {
                card_no: data.cardNo
            }
        );
    };

    /**
     * 切换提现卡
     *
     * @param {Object} data
     * @property {string} data.region
     * @property {string} data.cardId
     * @property {string} data.password
     * @property {string} data.province
     * @property {string} data.city
     * @return {Promise}
     */
    exports.changeWithdrawCard = function (data) {
        return service.post(
            '/pay/changeWithdrawCard',
            {
                card_id: data.cardId,
                password: data.password,
                region: [ data.province, data.city ].join('_')
            }
        );
    };

    /**
     * 获得绑卡时的用户信息
     *
     * @return {Promise}
     */
    exports.getPayUserInfo = function () {
        return service.post(
            '/pay/getPayUserInfo'
        );
    };

    /**
     * 支持的所有银行列表
     *
     * @return {Promise}
     */
    exports.getSupportedBankList = function () {
        return service.post(
            '/pay/getSupportedBankList'
        );
    };

    /**
     * 绑卡，发送短信验证码
     *
     * 返回
     * {
     *     code: 0,
     *     data: {
     *         token: ''
     *     }
     * }
     *
     * @param {Object} options
     * @property {string} options.ownerId 户主身份证
     * @property {string} options.ownerName 户主姓名
     * @property {string} options.ownerMobile 预留手机号
     * @property {string} options.bankNo 银行编号，如 ICBC
     * @property {string} options.cardNo 银行卡号
     * @property {string} options.cardType 银行卡类型，取值为 payConstant.CARD_TYPE_XX
     * @property {number} options.bindType 绑定卡类型，0 新增提现卡 2 新增支付卡
     * @property {string=} options.cvv 银行卡类型为信用卡时需传入
     * @property {string=} options.exp 银行卡类型为信用卡时需传入
     * @property {number=} options.province 开户行所在省
     * @property {number=} options.city 开户行所在市
     * @property {number=} options.bankName 银行中文名
     * @property {boolean=} options.forced 是否强制绑卡
     * @return {Promise}
     */
    exports.sendSMS = function (data, options) {

        var params = {
            owner_name: data.ownerName,
            id_number: data.ownerId,
            mobile: data.ownerMobile,
            bank_no: data.bankNo.toUpperCase(),
            card_no: data.cardNo,
            card_type: data.cardType,
            bind_type: data.bindType,
            forced: data.forced ? 1 : 0
        };

        if (data.cardType === payConstant.CARD_TYPE_CREDIT) {
            params.cvv = data.cvv;
            params.exp = data.expireYear + '-' + data.expireMonth;
        }

        if (data.province && data.city) {
            params.region = data.province + '_' + data.city;
        }
        if (data.bankName) {
            params.bank_name = data.bankName;
        }

        return service.post(
            '/bank_card/sendSMS',
            params,
            options
        );

    };

    /**
     * 验证卡（绑卡的最后一步）
     *
     * @param {Object} options
     * @property {string} options.token 调用短信验证码接口返回的 token
     * @property {string} options.code 收到的短信验证码
     * @return {Promise}
     */
    exports.verifyCard = function (data) {
        return service.post(
            '/bank_card/verifyCard',
            {
                token: data.token,
                code: data.code
            }
        );
    };

});