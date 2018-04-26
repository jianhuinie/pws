/**
 * @file 金牌机构宣传页
 * @author niejianhui
 */

define(function(require, exports) {

    'use strict';

    var store = require('common/store');
    var Slider = require('common/component/Slider');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var container = $('#cert-org');
    var ThirdCallDialog = require('common/component/ThirdCallDialog');

    exports.init = function (){
        var sliderContainer = $('.caseimgs-box');

        //轮播图初始化
        new Slider({
            element: sliderContainer,
            itemSelector: '.img-item',
            iconSelector: '.btn-item',
            prevSelector: '.pre-img',
            nextSelector: '.next-img',
            duration: 150,
            delay: 4000,
            activeClass: 'active',
            autoPlay: true,
            pauseOnHover: true,
            trigger: 'click'
        });

        //表单验证
        var applyForm = $('#userinfo-form');
        var validator = new Validator({
            element: applyForm,
            realtime: true,
            fields: {
                orgname: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请输入您所在的机构名称'
                    }
                },
                telephone: {
                    rules: {
                        required: true,
                        pattern: /^1[34578](\d){9}$/,
                    },
                    errors: {
                        required: '请输入您的联系方式',
                        pattern: '手机号格式错误'
                    }
                },
                cityname: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请输入您所在的城市名'
                    }
                },
            }
        });

        container
            .on('click', '.submit-apply', function () {
                if (validator.validate()) {
                    service
                        .sendGoldApply({
                            name: applyForm.find('input[name=orgname]').val(),
                            mobile: applyForm.find('input[name=telephone]').val(),
                            city: applyForm.find('input[name=cityname]').val()
                        })
                        .then(function (response) {
                            if (response.code === 0) {
                                success('提交成功', function () {
                                    location.reload();
                                });
                            }
                        });
                }
            })
            .on('click', '.consult-btn', function () {
                var dialog = new ThirdCallDialog();
            })
    }

});