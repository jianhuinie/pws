/**
 * @file 班课设置接口
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../../common/service');

    /**
     * 老师个人中心课程分类
     * @param {Object} data
     * @param {string} data.keyword 课程分类的关键字
     * @return {Promise}
     */
    exports.getSubjectList = function (data) {
        return service.post(
            '/tcenter/subjects/list',
            {
                keyword: data.keyword
            }
        );
    };

    /**
     * 获取用户历史地址
     * @param {Object} data
     * @return {Promise}
     */
    exports.getAddressList = function (data) {
        return service.post(
            '/tcenter/addresses/list-simple'
        );
    };

    /**
     * 百度地址suggestion
     *
     * @param {Object} data
     * @property {string} data.query 输入建议关键字（支持拼音）
     * @property {string} data.region 所属城市/区域名称或代号 - 市
     * @property {string?} data.output 返回数据格式，可选json、xml两种
     *
     * @return {Promise}
     */
    exports.getAddressSuggestion = function (data) {

        return getJsonp(
            'http://api.map.baidu.com/place/v2/suggestion',
            {
                query: data.query,
                region: data.region,
                output: 'json',
                ak: 'EMB0bKIvMeOd70lyyG92BZlu'
            }
        );
    };

     /**
     * 发送跨域的 jsonp请求
     *
     * @param  {string} url
     * @param  {Object} data
     * @return {Promise}
     */
    function getJsonp(url, data, timeout) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp',
            timeout: timeout
        });
    }

    /**
     * 地址管理 - 保存位置
     * @param {Object} data
     * @param {number} data.city_id    当前用户选择数据库中市级ID
     * @param {string} data.area_name    百度传回的第三级名称
     * @return {Promise}
     *
     */
    exports.checkAddress = function (data) {
        return service.post(
            '/teacher_center/checkAddress',
            {
                city_id: data.cityId,
                area_name: data.areaName
            }
        );
    };

    /**
     * 地址管理 - 保存与修改
     * @param {Object} data
     * @param {string} data.addressId 地址簿id，有则是更新，无则是新增
     * @param {number} data.areaId      第三级 （区）id
     * @param {number} data.locationAddr       详细地址
     * @param {number} data.lng           经度
     * @param {number} data.lat           纬度
     * @param {number} data.asRegularAddress  1:设为默认地址，0：不设为默认地址
     * @return {Promise}
     *
     */
    exports.upsertAddress = function (data) {
        return service.post(
            '/teacher_center/upsertAddress',
            {
                address_id: data.addressId,
                area_id: data.areaId,
                address: data.locationAddr,
                lng: data.lng,
                lat: data.lat,
                as_regular_address: data.asRegularAddress
            },
            options
        );
    };

    /**
     * 添加相关课程
     * @param {Object} data
     * @return {Promise}
     *
     */
    exports.getRelatedCourse = function (data) {
        return service.post(
            '/tcenter/courses/all-courses/selling-courses'
        );
    };

    /**
     * 展示相关科目
     * @param {Object} data
     * @return {Promise}
     *
     */
    exports.getHistorySubject = function (data) {
        return service.post(
            '/tcenter/courses/all-courses/history-subjects'
        );
    };

    /**
     * 图片库的展示
     * @param {Object} data
     * @return {Promise}
     *
     */
    exports.getPhotoGallery = function (data) {
        return service.post(
            '/tcenter/courses/photo-gallery/list'
        );
    };
    /**
     * 线下班课保存
     * @param {Object} data
     * @return {Promise}
     *
     */
    exports.saveOfflineCourse = function (data) {
        return service.post(
            '/tcenter/courses/class-courses/save',
            {
                data: data
            },
            {
                preventError: true,
                timeout: 10000
            }
        );
    };

    /**
     * 获取用户基本信息，
     *
     * 如果传 userId 和 userType 表示获取指定用户的信息
     *
     * 如果不传，表示获取当前 session 用户的信息
     *
     * 返回数据：
     * {
     *     code: 0, 成功
     *     data: {
     *         mobile: "123",
     *         user_type: "2",
     *         user_id: "123",
     *         avatar: "url",
     *         user_name: "name",
     *         user_name_cut: "name",
     *         user_number: "123",
     *         org_id: "23" // 机构number 0为非机构
     *     }
     * }
     *
     * @param {?Object} data 可不传
     * @property {string} data.userId
     * @property {string} data.userType
     */
    exports.getUserBasicInfo = function (data) {

        var params;

        if (data && data.userId != null && data.userType != null) {
            params = {
                user_id: data.userId,
                user_type: data.userType
            };
        }

        return service.post(
            '/user/basicInfo',
            params
        );
    };

});