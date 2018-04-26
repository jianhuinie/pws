/**
 * @file SEM K12聚合页
 * @author wangyujie
 */

define(function (require, exports) {

    var sliderBannerIntro = require('./component/sliderBannerIntro');
    var specialCourse = require('./k12/special');
    var recommendCourse = require('./k12/recommendCourse');
    var recommendTeacher = require('./k12/recommendTeacher');
    var recommendOrg = require('./k12/recommendOrg');
    var searchBox = require('./component/searchBox');
    var comment = require('./k12/comment');

    var store = require('common/store');
    var entrance = require('im/entrance');
    var EasyRegisterDialog = require('common/component/EasyRegisterDialog');
    var cookie = require('cobble/util/cookie');
    /*
     * 初始化
     */
    exports.init = function () {
        sliderBannerIntro.init();
        specialCourse.init();
        recommendCourse.init();
        recommendTeacher.init();
        recommendOrg.init();
        searchBox.init();
        comment.init();

        var main = $('#main');

        window.onload = function() {

            // 最终注册标记
            var params = [];
            params.push(store.get('source'));
            params.push(store.get('plan'));
            params.push(store.get('group'));
            params.push(store.get('keyword'));
            params.push(store.get('query'));

            cookie.set('register-params', params.join(','), {
                domain: '.genshuixue.com',
                path: '/'
            });

            var chatToNumber = cookie.get('chat-to-number');
            var chatToType = cookie.get('chat-to-type');
            if (chatToNumber && store.get('user').number) { // 已登陆，调im
                entrance.chatTo({
                    userNumber: chatToNumber,
                    userType: chatToType
                });
                cookie.set('chat-to-number', '', {
                    domain: '.genshuixue.com',
                    path: '/'
                });

                cookie.set('chat-to-type', '', {
                    domain: '.genshuixue.com',
                    path: '/'
                });
            }
        }

        main
        .on('click', '.register-to-chat', function (e) { // 咨询浅注册
            var target = $(e.currentTarget);
            var userNumber = target.data('userNumber');
            var userType = target.data('userType');

            if (store.get('user').number) { // 已登陆，调im
                entrance.chatTo({
                    userNumber: userNumber,
                    userType: userType
                });
            }
            else { // 未登陆弹浅注册弹窗
                cookie.set('chat-to-number', userNumber, {
                    domain: '.genshuixue.com',
                    path: '/'
                });

                cookie.set('chat-to-type', userType, {
                    domain: '.genshuixue.com',
                    path: '/'
                });

                new EasyRegisterDialog({
                    onSuccess: function (newNumber) {

                        var timestamp = store.get('serverTime') + 0;
                        WAT.send('http://click.genshuixue.com/act.gif', {
                            source: store.get('source'),
                            plan: store.get('plan'),
                            group: store.get('group'),
                            keyword: store.get('keyword'),
                            q: store.get('query'),
                            _: timestamp
                        });

                        success('登录成功', function () {
                            location.reload();
                        });
                    }
                });
            }
        })

    };



});