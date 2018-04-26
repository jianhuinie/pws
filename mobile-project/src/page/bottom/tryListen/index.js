define(function (require) {
    'use strict';

    var $ = require('zepto');
    var appoint = require('common/appoint/appoint');
    var StaySingle = require('common/staySingle/staySingle');
    var app = require('common/app');
    var ui = require('common/ui');
    var habo = require('common/component/analysis/habo/index');
    var isApp;
    var container = $('#main');


    return function (options) {
        isApp = app.isApp();
        $('.bottom').on('click', '.tryListen', function () {
            //flag 1-试听课 2-机构留单 3-平台留单
            var that = $(this);
            var flag = that.data('flag');
            // habo.send({
            //     type: that.data('stype')
            // })
            if(flag == 1) {
                var tryButtonStatus = that.data('tryButton');
                var tryContainer = $(".try-container");
                if(tryButtonStatus == 0) {
                    var url = location.origin + $(this).data('href');
                    if(isApp) {
                        app.openNewWindow(url);
                    } else {
                        location.href = url;
                    }
                } else if (tryButtonStatus == 4) {
                    tryContainer.show();
                    tryContainer.find(".cancel-pay").click(function (){
                        tryContainer.hide();
                    });
                    tryContainer.find(".pay").click(function (e) {
                        tryContainer.hide();
                        if(isApp) {
                            var appDetail = $(this).find('a').data('app').split("|");
                            var action = appDetail[0];
                            var param = {};
                            param["purchase_id"] = appDetail[1];
                            param["course_type"] = appDetail[2];
                            app.send(action, param);

                            e.preventDefault();
                            return false;
                        }
                    });
                } else if (tryButtonStatus == 5) {
                    ui.remind("您不能购买自己的课程");
                } else if (tryButtonStatus == 2 || tryButtonStatus == 1) {
                    tryContainer.show();
                    tryContainer.find(".cancel-pay").click(function () {
                        tryContainer.hide();
                    });
                    tryContainer.find(".pay").click(function () {
                        tryContainer.hide();
                    });
                } else {
                    var url = location.origin + $(this).data('href');
                    if(isApp) {
                        app.openNewWindow(url);
                    } else {
                        location.href = url;
                    }
                }
            } else if (flag == 2 && !options.isOne2oneTeacher) {
                var url = window.location.href;
                var params = {
                    'courseType': 'org',
                    'title': options.title,
                    'objectId': options.userNum,
                    'objectType': 'cdb.teacher',
                    'detail_url': url,
                    'color': options.model
                };
                appoint.appoint(params);
            } else if (flag == 3 || options.isOne2oneTeacher) {
                var place = 'singleTeacher';
                var channel = '';
                //优选签约老师留单至boss系统（掉留单至客服接口）
                if (options.isOne2oneTeacher) {
                    place = 'sendToKefu';
                    //标识优选留单
                    channel = 'youxuan_teacher';
                    //加上来源区分 app或m站
                    if (isApp) {
                        channel += '_app';
                    }
                    else {
                        channel += '_m';
                    }
                }
                var _staySingle = new StaySingle({
                    teacher_number: options.teacher_number,
                    // nanci: 韩炀需求，个体老师平台留单从客服接口转为成都接口，老师端 app 会收到学生预约试听相关信息
                    place: place,
                    channel: channel
                });
                _staySingle.show({
                    title: that.text()
                });
            }
        });
    }
});