/**
 * @file etpl 自定义学生订单列表过滤器
 * @author wanglu
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var etpl = require('cobble/util/etpl');
    var string = require('cobble/util/string');

    exports.init = function () {
        etpl.
            addFilter('getDeadLineTime', function (value, type) {  // 订单失效时间倒计时
                if (type === 1) {
                    var hours = Math.floor(value / 3600);
                    if (hours > -10 && hours < 10) {
                        hours = '0' + hours;
                    }
                    return hours;
                } 
                else if (type === 2) {
                    var minutes = Math.floor((value % 3600) / 60);
                    if (minutes > -10 && minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    return minutes;
                }
                else if (type === 3) {
                    var seconds = Math.floor((value % 3600) % 60);
                    if (seconds > -10 && seconds < 10) {
                        seconds = '0' + seconds;
                    }
                    return seconds;
                }
            });
        etpl.
            addFilter('getLessonWay', function (value) { // 获得学生上课方式
                var objLessonWay = {
                    1 :'协商地点',
                    2 :'在线授课',
                    4 :'学生上门',
                    8 :'老师上门'
                }
                for (var val in objLessonWay) {
                    if (+value === +val) {
                        return objLessonWay[val];
                    }
                }   
            });
        etpl.
            addFilter('getPercent', function (value) { // 已完成小时/课节百分比
                    var percent = ((+value) / 60);
                    if (parseInt(percent) !== percent) {
                        percent = percent.toFixed(1);
                        return percent;
                    }
                    else {
                        return percent;
                    }
            });
        etpl.
            addFilter('widthPercent', function (value, totle, perType) { // 横线长度百分比
                var widthPercents;
                if (perType === 1) {
                    widthPercents = ((+value)*100/(+totle)).toFixed(2);
                } else {
                    widthPercents = ((+value)*100/60.0/(+totle)).toFixed(2);
                }
                return widthPercents;
            });
        etpl.
            addFilter('getRetireText', function (value, userType) { // 平台支付保障退款提示 -- 老师／学生
                var retireText = '';
                var usePlatEnsure, retireLength, retire_flag;

                if (!value.retire_flag) {
                    retire_flag = 0;
                } else {
                    retire_flag = (+(value.retire_flag));
                }

                if (!value.use_plat_ensure || (+(value.use_plat_ensure)) === 1 ) {
                    usePlatEnsure = true;
                } else {
                    usePlatEnsure = false;
                }

                if (!value.retire_length) {
                    retireLength = '';
                } else {
                    retireLength = value.retire_length;
                }
                if (usePlatEnsure) {
                    retireText = '平台支付保障已开启';
                    if ((+(value.course_type)) === 2) { 
                        if (userType === 0) { // 老师
                            if (retire_flag === 2) {
                                retireText += '支持限时退，第' + retireLength + '节课开始前学生可申请退款';
                            } else if (retire_flag === 1) {
                                retireText += '支持限时退，开班' + ((+retireLength)/3600).toFixed(0) + '小时前学生可申请退款';
                            } else if (retire_flag === 100) {
                                retireText += '该课程报名后不提供线上退课服务，如需退课学生会与您协商';
                            } else {
                                retireText += '支持随时退，学生首次课不满意全额退款，其余课次可申请退剩余课酬';
                            }
                        } else if (userType === 2) { // 学生
                            if (retire_flag === 2) {
                                retireText += '支持限时退，第' + retireLength + '节课开始前可申请退款';
                            } else if (retire_flag === 1) {
                                retireText += '支持限时退，开班' + ((+retireLength)/3600).toFixed(0) + '小时前可申请退款';
                            } else if (retire_flag === 100) {
                                retireText += '该课程报名后不提供线上退课服务，如需退课请与老师协商';
                            } else {
                                retireText += '支持随时退，首次课不满意全额退款，其余课次可申请退剩余课酬';
                            }
                        }
                    } else {
                        if (userType === 0) { // 老师
                            retireText += '支持随时退，学生首次课不满意全额退款，其余课次可申请退剩余课酬';
                        } else if (userType === 2) { // 学生
                            retireText += '支持随时退，首次课不满意全额退款，其余课次可申请退剩余课酬';
                        }

                    }
                }
                return retireText;
            }); 
        etpl.
            addFilter('getOrderStatus', function (value, isVideoCourse) { // 订单状态映射
                var config = {
                    'wait_for_pay':'待支付',
                    'canceled':'已取消',
                    'refunded':'申请退款成功',
                    'closed':'已关闭',
                    'pay_failed':'待支付',
                    'pay_success':'进行中',
                    'refunding':'退款中',
                    'refund_success':'退款成功',
                    'wait_for_comment':'待评价',
                    'appealing':'申诉中',
                    'normal_over':'已完成',
                    'appeal_over':'申诉完成',
                    'apply_refunding':'申请退款中'
                }
                if (isVideoCourse && (value === 'pay_success')) {
                    return '已支付';
                } 
                else {
                    for (var item in config) {
                        if (item === value) {
                            return config[item];
                        }
                    }
                }  
            });
        etpl.
            addFilter('oldPricePer', function (value, hours) { // pre_pay_money和时间的比例
                return (value / hours);
            });
        etpl.
            addFilter('defaultUsePlateEnsure', function (value) { // 平台支付保障默认值
                var usePlatEnsure;
                if (!value) {
                    usePlatEnsure = 1;
                } else {
                    usePlatEnsure = value;
                }
                return  usePlatEnsure;
            });
        etpl.
            addFilter('round', function (value, end, page, nofollow) { // 分页 
                var linkText = '';

                for (var i = ((+value)); i <= (+end); i++) {
                    
                    if (i == +page) {
                        linkText += '<a class="active page-child" data-page="' + i + '"';
                        if (nofollow) {
                            linkText += 'rel="nofollow"';
                        }
                        linkText += '>' + i + '</a>'; 
                    }
                    else {
                        linkText += '<a' + ' class="page-child" data-page="' + i + '"';
                        if (nofollow) {
                            linkText += 'rel="nofollow"';
                        } 
                        linkText += '>' + i + '</a>'; 
                    }
                    
                }
                
                return linkText;
            });
    }
});