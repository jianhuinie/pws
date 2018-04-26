/**
 * @file 用户信息tooltip详情
 * @author peilonghui
 */

define (function (require) {

    var Tooltip = require('cobble/ui/Tooltip');

    var store = require('common/store');
    var service = require('common/service');

    var etpl = require('cobble/util/etpl');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');


    /**
     * 用户角色代码与角色名称的映射
     *
     * @const
     * @type {Object}
     */
    var USERROLE_MAP = {
        '-1': '游客',
        0: '老师',
        1: '家长',
        2: '在校生',
        3: '普通学习者'
    };

    /**
     * 用户信息tooltip的浮层模板
     *
     * @const
     * @type {String}
     */
    var TOOLTIP_TEMPLATE_RENDER = etpl.compile(''
        +   '<div class="role-tooltip-info">'
        +       '<img class="thumbnail circle" src="${avatar}" alt="${name}" title="${name}" />'
        +       '<div class="base-info">'
        +           '<strong title="${fullName}">${name}</strong>'
        +           '<!-- if: ${userType} == 0 -->'
        +           '<span class="mobile" data-mobile="${mobile}" data-number="${number}" data-name="${name}">'
        +               '<i class="icon icon-call"></i>'
        +           '</span>'
        +           '<!-- else -->'
        +           '<span>${mobile}</span>'
        +           '<!-- /if -->'
        +       '</div>'
        +   '</div>'
        +   '<div class="role-tooltip-buttons">'

        +       '<!-- if: !${isSelf} -->'
        +   '<div class="chat-wrapper">'
        +       '<span class="chat-label tiny ${imStatus}" data-user-number="${number}" data-user-type="${type}">'
        +           '<i class="icon icon-chat"></i><b>${labelText}</b>'
        +       '</span>'
        +   '</div>'
        +       '<!-- /if -->'

        +       '<a href="'
        +           '<!-- if: ${userUrl} !== "####" -->'
        +               '${userUrl}'
        +           '<!-- else  -->'
        +               'javascript:alert(\'即将上线，敬请期待\')'
        +           '<!-- /if -->'
        +           '" title="查看${detailText}" target="_blank" class="icon ${iconClass}">${detailText}</a>'
        +   '</div>'
    );


    /**
     * 绑定每个头像的hover弹窗
     *
     * @param {jQueryElment} container  要初始化的容器
     * @param {string} selector 要加tooltip 的选择器文本
     * @return
     */
    function bindTooltips(container, selector) {

        var namespace = '.user_info_tooltip';

        var getUserId = function (element) {
            return element.parent().attr('data-userId');
        };
        Tooltip.init(
            container.find(selector),
            {
                template: ''
                    + '<div class="tooltip tooltip-default role-tooltip">'
                    +   TOOLTIP_TEMPLATE_RENDER(
                            {
                                avatar: '',
                                name: '',
                                mobile: '',
                                userUrl: '####',
                                detailText: '',
                                iconClass: '',
                                fullName: ''
                            }
                        )
                    + '</div>',
                placement: 'top',
                onBeforeShow: function () {
                    if (getUserId(this.element) == null) {
                        return false;
                    }
                },
                onAfterShow: function () {

                    this.layer
                    .on('click' + namespace, '.mobile[data-mobile] .icon', function () {

                        var from = store.get('user').number;
                        var to  = $(this).parent().data('number');
                        var name = $(this).parent().data('name');

                        new MakePhoneCallDialog({
                            from: from,
                            to: to,
                            mobile: store.get('user').mobile,
                            name: name
                        });
                    });

                },
                onAfterHide: function () {
                    this.layer.off(namespace);
                },
                updateContent: function () {

                    var me = this;
                    var layer = me.layer;
                    var element = me.element;

                    var userid = getUserId(element);
                    if (userid == null) {
                        return;
                    }

                    var userNumber = element.parent().attr('data-userNumber');
                    var avatarName = element.parent().attr('data-avatarName');
                    var userDomain = element.parent().attr('data-domain');
                    var fr = element.parent().data('fr');  // 评价类型
                    var userType = +store.get('user').type;
                    var role;

                    if (userType === 0) {
                        userType = 2;
                        role = 'student';
                    }
                    else {
                        userType = 0;
                        role = 'teacher';
                    }

                    var deferred = $.Deferred();

                        service
                        .getStudentVIPOrderList({
                            userNumber: userNumber,
                            displayName: avatarName
                        })
                        .done(function (response) {
                            var renderData = {
                                userUrl: '/comment/fromTeacherDetail?page_size=10&page=1&number=' + userNumber,
                                iconClass: 'icon-star-o',
                                detailText: 'TA的信用'
                            };

                            if (response && response.code === 0) {

                                var data = response.data.user_info;

                                renderData.name = data.display_name.slice(0, 9);
                                renderData.avatar = data.avatar;

                                // 邀请评价需要去掉老师手机号的展示
                                if (fr != '' && fr == 2 ){
                                    renderData.mobile = '';
                                }
                                else{
                                    renderData.mobile = data.mobile;
                                }

                                // 学生手机号不展示
                                if (userType === 2) {
                                    renderData.mobile = '';
                                }

                                renderData.fullName = data.display_name;
                                renderData.number = data.user_number;
                                renderData.type = role;
                                renderData.userType = userType;
                                //IM在线离线
                                if (data.im_online_status == 0) {
                                    renderData.imStatus = 'offline';
                                    renderData.labelText = '离线留言';
                                }
                                else {
                                    renderData.imStatus = 'online';
                                    if (userType === 2) {
                                        renderData.labelText = '在线聊天';
                                    }
                                    else {
                                        renderData.labelText = '在线咨询';
                                    }
                                }

                                // 不能和自己聊天
                                renderData.isSelf = store.get('user').number == data.user_number;

                                if ( userType === 0 ) {
                                    renderData.iconClass = 'icon-home-o';
                                    renderData.detailText = 'TA的主页';
                                    renderData.userUrl = '/' + userDomain;
                                }

                                layer.html(
                                    TOOLTIP_TEMPLATE_RENDER(renderData)
                                );

                                deferred.resolve();
                            }
                            else {
                                deferred.reject();
                            }

                        });

                    return deferred;

                }

            }
        );
    };

    return {
        init: bindTooltips,
        repaint: bindTooltips
    }
});