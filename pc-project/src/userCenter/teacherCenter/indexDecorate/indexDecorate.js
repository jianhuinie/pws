/**
 * @file 老师个人中心 - 主页装修
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var browser = require('cc/util/browser');
    var service = require('./service');
    var renderImage = require('../../common/function/renderImage');

    exports.init = function (data) {

        var ractive = new Ractive({
            el: '#container',
            template: require('html!./indexDecorate.html'),
            data: {
                tpl_data: data,
                template_m_list: data.template_m_list,
                template_pc_list: data.template_pc_list,
                site_data: siteData,
                user_data: userData,
                checked_tab_index: 0, // 当前选择tab索引
                is_chrome: browser.chrome, // 当前浏览器是否为chrome
                is_preview_m: false,
                preview_m_temp_no: 0, // 当前预览的第几组模板 M
                preview_m_img: '', // 当前预览模板的图片 M
                preview_m_url: '', // 当前预览模板的H5地址 M
                checked_m_name: data.teacher.template_m || 'default', // 当前用户选中模板名M
                checked_pc_name: data.teacher.template_pc || 'default', // 当前用户选中模板名Pc
                need_m_vip_level: data.teacher.template_m_need_level || 0, // 当前选中模板所需用户等级 M
                need_pc_vip_level: data.teacher.template_pc_need_level || 0, // 当前选中模板所需用户等级 Pc
                org_id: 0 // 是否为机构老师
            },
            onrender: function () {
                renderImage();
                // 获取用户基本信息
                service
                .getUserBasicInfo()
                .then(function (response) {
                    var data = response.data;
                    // 机构老师
                    ractive.set('org_id', data.org_id);
                });
            },
            checkedTemp: function (event, num, category) { // 选择模板
                var target = $(event.node);
                var templates = target.closest('.templates');

                templates
                    .find('li')
                    .each(function (i, item) {
                        $(item).removeClass('active');
                    });

                target.addClass('active');

                if (category === 'm') {
                    ractive.set(
                        'checked_m_name',
                        ractive.get('template_m_list[' + num + '].name')
                    );
                    ractive.set(
                        'need_m_vip_level',
                        ractive.get('template_m_list[' + num + '].vip_level')
                    );
                }
                else if (category === 'pc') {
                    ractive.set(
                        'checked_pc_name',
                        ractive.get('template_pc_list[' + num + '].name')
                    );
                    ractive.set(
                        'need_pc_vip_level',
                        ractive.get('template_pc_list[' + num + '].vip_level')
                    );
                }

            },
            preview: function (num) { // 预览手机效果 - 第几个模板
                ractive.set('is_preview_m', true);
                ractive.set('preview_m_temp_no', num);

                ractive.set(
                    'preview_m_img',
                    ractive.get('template_m_list[' + num + '].preview_img')
                );
                ractive.set(
                    'preview_m_url',
                    ractive.get('template_m_list[' + num + '].preview_url')
                );
            },
            prevPreview: function (num) { // 上一个模板 M
                ractive.set('preview_m_temp_no', num);
                ractive.set(
                    'preview_m_img',
                    ractive.get('template_m_list[' + num + '].preview_img')
                );
                ractive.set(
                    'preview_m_url',
                    ractive.get('template_m_list[' + num + '].preview_url')
                );
            },
            nextPreview: function (num) { // 下一个模板 M
                ractive.set('preview_m_temp_no', num);
                ractive.set(
                    'preview_m_img',
                    ractive.get('template_m_list[' + num + '].preview_img')
                );
                ractive.set(
                    'preview_m_url',
                    ractive.get('template_m_list[' + num + '].preview_url')
                );
            },
            exitPreview: function () { // 退出预览
                ractive.set('is_preview_m', false);
                ractive.set('preview_m_temp_no', 0);
            },
            release: function (category) { // 发布
                var userVipLevel = ractive.get('user_data.vip_level');
                var needVipLevel; // 当面模版所需用户等级
                var needVipJudge = false; // 选择会员模版需进行等级判断

                var data;
                if (category === 'm') {
                    data = {
                        tempMName: ractive.get('checked_m_name')
                    };
                    needVipLevel = ractive.get('need_m_vip_level');
                    if (ractive.get('checked_m_name') != 'default') {
                        needVipJudge = true;
                    }
                    else {
                        needVipJudge = false;
                    }
                }
                else if (category === 'pc') {
                    data = {
                        tempPcName: ractive.get('checked_pc_name')
                    };
                    needVipLevel = ractive.get('need_pc_vip_level');
                    if (ractive.get('checked_pc_name') != 'default') {
                        needVipJudge = true;
                    }
                    else {
                        needVipJudge = false;
                    }
                }

                if (needVipJudge) {
                    if (ractive.get('org_id')) { // 机构
                        var content = '';

                        if (needVipLevel == 1 && userVipLevel < 1) { // 会员
                            content = '该模板仅会员用户才能使用，请联系机构开通会员';
                        }
                        else if (userVipLevel < needVipLevel) { // 超级、高级会员
                            content = '该模板需更高级别会员才能使用，请联系机构升级会员';
                        }

                        if (content) {
                            confirm({
                                title: '温馨提示',
                                width: 350,
                                content: content,
                                buttons: [
                                    {
                                        text: '我知道了',
                                        type: 'primary',
                                        action: function () {
                                            this.hide();
                                        }
                                    }
                                ]
                            });

                            return false;
                        }
                    }
                    else { // 非机构
                        var content = '';

                        if (needVipLevel == 3 && userVipLevel < 3) { // 超级会员
                            content = '该模板仅超级会员用户才能使用，开通超级会员还可以获得更多生源哦';
                        }
                        else if (needVipLevel == 2 && userVipLevel < 2) { // 高级会员
                            content = '该模板仅高级或超级会员用户才能使用，开通高级或超级会员还可以获得更多生源哦';
                        }
                        else if (needVipLevel == 1 && userVipLevel < 1) { // 会员
                            content = '该模板仅会员用户才能使用，开通会员还可以获得更多生源哦'
                        }

                        if (content) {
                            confirm({
                                title: '温馨提示',
                                width: 350,
                                content: content,
                                buttons: [
                                    {
                                        text: '立即开通',
                                        type: 'primary',
                                        action: function () {
                                            location.href = '/teacher_center/vip_center';
                                        }
                                    },
                                    {
                                        text: '详细了解',
                                        type: 'secondary',
                                        action: function () {
                                            location.href = '/teacher_center/vip_detail?type=pageDress';
                                        }
                                    }
                                ]
                            });

                            return false;
                        }
                    }
                }

                service
                    .updateTemplate(data)
                    .then(function (response) {
                        tip({
                            type: 'success',
                            content: '模板发布成功'
                        });
                    });
            }

        });

    };

});