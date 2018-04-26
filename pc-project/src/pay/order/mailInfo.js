/**
 * @file 邮寄资料
 * @author wanglu
 */
define(function (require, exports) {

    'use strict';


    var urlUtil = require('cobble/util/url');

    var store = require('common/store');
    var RegionSelect = require('common/component/RegionSelect');
    var Validator = require('cobble/form/Validator');
    var form = require('common/form');

    var container = $('.form-mail');
    
    var mailvalidator = new Validator({
        element: container,
        realtime: true,
        fields: {
            rev_name: {
                rules: {
                    maxlength: 10,
                    required: true
                },
                errors: {
                    maxlength: '请将字数控制在10个字以内',
                    required: '请填写收件人姓名'
                }
            },
            re_mobile: {
                rules: {
                    required: true,
                    pattern: /^1[34578](\d){9}$/,
                },
                errors: {
                    required: '请填写手机号',
                    pattern: '请填写正确的手机号'
                }
            },
            area: {
                rules: {
                    required: true
                },
                errors: {
                    required: '请选择所在地区'
                }
            },
            detail_addr: {
                rules: {
                    maxlength: 50,
                    required: true
                },
                errors: {
                    maxlength: '请将字数控制在50个字以内',
                    required: '请填写详细地址'
                }
            },
            remark: {
                rules: {
                    maxlength: 200
                },
                errors: {
                    maxlength: '请将字数控制在200个字以内'
                }
            }
        }
    });

    
     exports.init = function () {
        var provinceId = store.get('provinceId'); //选中的省
        var cityId = store.get('userCityId');  //选中的市
        var areaId = store.get('areaId');  //选中的区

        new RegionSelect({
            element: $('.mail-region-select'),
            provinceId: provinceId, 
            cityId: cityId,
            areaId: areaId
        });
     };

    exports.validate = function () { //实时验证收件人、手机号、详细地址、备注
        return mailvalidator.validate();
    };

    exports.getData = function () {

        var data = form.parse(container);
        var new_address_value = false;
        var default_id = store.get('default_id');
        var name = store.get('rev_name');
        var mobile = store.get('re_mobile');
        var provinceId = store.get('provinceId'); //选中的省
        var cityId = store.get('userCityId');  //选中的市
        var areaId = store.get('areaId');  //选中的区
        var address = store.get('location_addr'); //详细地址
        
        if ( data.rev_name !== name 
            || data.re_mobile !== mobile 
            || data.detail_addr !== address 
            || data.province !== provinceId 
            || data.city !== cityId 
            || data.area !== areaId ) { 
            new_address_value = true;
        } 

        return {
            "material_post_info": {
                "is_new_address": new_address_value,
                "post_address": {
                    "name": data.rev_name,
                    "mobile": data.re_mobile,
                    "location_addr": data.detail_addr,
                    "telephone": data.h_mobile,
                    "area_id": data.area,
                    "default_id": default_id,
                    "note_msg": data.remark
                }
            }
        };
    };

});