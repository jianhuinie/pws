/**
 * @file 课程模板
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict'

    var service = require('../service');
    var renderImage = require('../../../../common/function/renderImage');
    var pcMap = {};
    var mMap = {};
    var org_id = '';

    function showDialog (courseInfor) {
        if (org_id == 0) {
            alert({
                title: '温馨提示',
                content: courseInfor.content,
                width: 382,
                skinClass: 'vip-dialog',
                buttons: [
                    {
                        text: '立即开通',
                        type: 'error',
                        action: function () {
                            location.href = "/teacher_center/vip_center";
                            this.hide();
                        }
                    },
                    {
                        text: '了解详情',
                        type: 'default',
                        action: function () {
                            location.href = "/teacher_center/vip_detail?type=pageDress";
                            this.hide();
                        }
                    }
                ]
            });
        }
        else {
            alert({
                title: '温馨提示',
                content: courseInfor.content,
                width: 382,
                skinClass: 'vip-dialog',
                buttons: [
                    {
                        text: '我知道了',
                        type: 'error',
                        action: function () {
                            this.hide();
                        }
                    }
                ]
            });
        }
        return false;
    }
    /**
     * 班课的课程模板
     *
     * @param {Object} options
     * @property {?String} options.templatePc 网页模板
     * @property {?String} options.templateM 手机模板
     * @property {?String} options.templateCheckedPc 选中的网页模板
     * @property {?String} options.templateCheckedM 选中的手机模板
    **/
    return Ractive.extend({
        template: require('html!./OfflineCourseTemplate.html'),
        data: function () {
            return {
                style: require('text!./OfflineCourseTemplate.styl'),
                checkedIndex: 0,
                defaultTemplate: true,
                template: {
                    data: null,
                    checkedName: ''
                },
                options: {
                    templatePc: null,
                    templateM: null,
                    templateCheckedPc: 'skin101',
                    templateCheckedM: 'orange'
                }
            }
        },
        onrender: function () {
            renderImage();
            var me = this;
            if (me.get('options.templateCheckedPc') || me.get('options.templateCheckedM')) {
                me.set('defaultTemplate', false);
            }
            var templatePc = me.get('options.templatePc');
            var templateM = me.get('options.templateM');
            $.each(
                templatePc,
                function (index, value) {
                    pcMap[value.name] = value.vip_level;
                }
            );
            $.each(
                templateM,
                function (index, value) {
                    mMap[value.name] = value.vip_level;
                }
            );
            me.observe('checkedIndex', function (index) {
                var data = {};
                if (index == 0) {
                    data = {
                        data: templatePc,
                        checkedName: 'PC'
                    }
                }
                else {
                    data = {
                        data: templateM,
                        checkedName: 'M'
                    }
                }
                me.set('template', data);
            });
            me.observe('options.templateCheckedPc', function (template) {
                if (template) {
                    me.set('defaultTemplate', false);
                }
            });
            me.observe('options.templateCheckedM', function (template) {
                if (template) {
                    me.set('defaultTemplate', false);
                }
            });
        },
        chooseTemplate: function (data) {
            var me = this;
            if (me.get('template.checkedName') == 'PC') {
                me.set(
                    'options.templateCheckedPc', data.name
                )
            }
            else {
                me.set(
                    'options.templateCheckedM', data.name
                )
            }
        },
        validate: function () {
            var me = this;
            // 获取用户基本信息
            service
            .getUserBasicInfo()
            .then(function (response) {
                org_id = response.data.org_id;
            });

            var vipLevel = userData.vip_level;
            var templateCheckedPc = me.get('options.templateCheckedPc')
                                    ? me.get('options.templateCheckedPc')
                                    : 'default';
            var templateCheckedM = me.get('options.templateCheckedM')
                                    ? me.get('options.templateCheckedM')
                                    : 'default';
            var templatePCVip = pcMap[templateCheckedPc];
            var content = '';
            var templateMVip = mMap[templateCheckedM];

            if (vipLevel < pcMap[templateCheckedPc]) {
                if (org_id == '0') {
                    if (templatePCVip == '1') {
                        content = '您选择的网页模板为会员模板，开通会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (templatePCVip == '2') {
                        content = '您选择的网页模板为高级会员模板，开通高级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (templatePCVip == '3') {
                        content = '您选择的网页模板为超级会员模板，开通超级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                }
                else {
                    if (templatePCVip == '1') {
                        content = '您选择的网页模板为会员模板，请联系机构开通会员。';
                    }
                    else if (templatePCVip == '2') {
                        content = '您选择的网页模板为高级会员模板，请联系机构开通高级会员。';
                    }
                    else if (templatePCVip == '3') {
                        content = '您选择的网页模板为超级会员模板，请联系机构开通超级会员。';
                    }
                }
                showDialog({ content: content });
                return false;
            }
            if (vipLevel < mMap[templateCheckedM]) {
                if (me.get('org_id') == '0') {
                    if (templateMVip == '1') {
                        content = '您选择的手机模板为会员模板，开通会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (templateMVip == '2') {
                        content = '您选择的手机模板为高级会员模板，开通高级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                    else if (templateMVip == '3') {
                        content = '您选择的手机模板为超级会员模板，开通超级会员后即可使用，会员还可享有优先推荐获得更多生源哦~';
                    }
                }
                else {
                    if (templateMVip == '1') {
                        content = '您选择的手机模板为会员模板，请联系机构开通会员。';
                    }
                    else if (templateMVip == '2') {
                        content = '您选择的手机模板为高级会员模板，请联系机构开通高级会员。';
                    }
                    else if (templateMVip == '3') {
                        content = '您选择的手机模板为超级会员模板，请联系机构开通超级会员。';
                    }
                }
                showDialog({ content: content });
                return false;
            }
            return true;
        }
    })
})