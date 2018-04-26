/**
 * @file 老师个人中心数据中心扣分记录
 * @author wangtianhua
 */
 define(function (require, exports) {

    'use strict';

    var underscore = require('underscore');
    var AllegeDialog = require('./AllegeDialog');
    var service = require('../service');
    var underscore = require('underscore');

    exports.init = function (data) {
        var ractive = new Ractive({
            el: '#container',
            template: require('html!./recordPoint.html'),
            data: {
                current_deduct_points: data.current_deduct_points,
                total_deduct_points: data.total_deduct_points,
                list: data.list,
                length: underscore.keys(data.list).length,
                pager: Math.ceil(underscore.keys(data.list).length/3),
                pagers: {},
                showlist: {},
                currentpage: '1',
                upisdisable: true,
                downisdisable: false
            },
            components: {
            },
            onrender: function () {
                var me = this;
                var showlist = [];
                var nowtimestamp = Date.parse(new Date());
                for (var i=0; i < 3; i++) {
                    if (me.get('list')[i]) {
                        var changeTime = me.get('list')[i].expired_time.replace(/-/g, '/');
                        var endtimestamp = Date.parse(new Date(changeTime));
                        var is_allege = endtimestamp - nowtimestamp; //已过期
                        if (is_allege < 0) {
                            me.get('list')[i].time = true;
                        }
                        else {
                            me.get('list')[i].time = false;
                        }
                        showlist.push(me.get('list')[i]);
                    }
                }

                me.set('showlist', showlist);
                var pagers = [];
                for (var i = 1; i <= me.get('pager') ; i++) {
                    pagers.push(i);
                }
                me.set('pagers', pagers);

                if (me.get('pager') == 1) {
                    me.set('downisdisable', true);
                }
            },
            flip: function (data) { // 点击页数
                var me = this;
                var showlist = [];
                var index = data*3;
                var currentpage = parseInt(me.get('currentpage'));
                me.set('currentpage', data);
                // 取当前的时间
                var nowtimestamp = Date.parse(new Date());

                for (var i=3; i > 0; i--) {
                    if (me.get('list')[index-i]) {
                        var changeTime = me.get('list')[index-i].expired_time.replace(/-/g, '/');
                        var endtimestamp = Date.parse(new Date(changeTime));
                        var is_allege = endtimestamp - nowtimestamp; //已过期
                        if (is_allege < 0) {
                            me.get('list')[index-i].time = true;
                        }
                        else {
                            me.get('list')[index-i].time = false;
                        }
                        showlist.push(me.get('list')[index-i]);
                    }
                }
                me.set('showlist', showlist);
                if (me.get('currentpage') == 1) {
                    me.set('upisdisable', true)
                    me.set('downisdisable', false)
                }
                else if (me.get('currentpage') == me.get('pager')) {
                    me.set('upisdisable', false)
                    me.set('downisdisable', true)
                }
                else {
                    me.set('upisdisable', false)
                    me.set('downisdisable', false)
                }
            },
            flipUp: function (data) { // 点击上一页
                var me = this;
                var currentpage = parseInt(me.get('currentpage'));
                // 当前为第一页不可点
                if (currentpage != 1) {
                    me.set('currentpage', currentpage - 1);
                    var data = me.get('currentpage');
                    var showlist = [];
                    var index = data*3;
                    // 取当前时间
                    var nowtimestamp = Date.parse(new Date());
                    for (var i=3; i > 0; i--) {
                        if (me.get('list')[index-i]) {
                            var changeTime = me.get('list')[index-i].expired_time.replace(/-/g, '/');
                            var endtimestamp = Date.parse(new Date(changeTime));
                            var is_allege = endtimestamp - nowtimestamp; //已过期
                            if (is_allege < 0) {
                                me.get('list')[index-i].time = true;
                            }
                            else {
                                me.get('list')[index-i].time = false;
                            }
                            showlist.push(me.get('list')[index-i]);
                        }
                    }
                    me.set('showlist', showlist);
                     if (me.get('currentpage') == 1) {
                        me.set('upisdisable', true)
                        me.set('downisdisable', false)
                    }
                    else if (me.get('currentpage') == me.get('pager')) {
                        me.set('upisdisable', false)
                        me.set('downisdisable', true)
                    }
                }
            },
            flipDown: function (data) { // 点击下一页
                var me = this;
                var currentpage = parseInt(me.get('currentpage'));
                var nowtimestamp = Date.parse(new Date());
                // 当前为最后一页不可点
                if (currentpage != me.get('pager')) {
                    me.set('currentpage', currentpage + 1);
                    var data = me.get('currentpage');
                    var showlist = [];
                    var index = data*3;
                    for (var i=3; i > 0; i--) {
                        if (me.get('list')[index-i]) {
                            var changeTime = me.get('list')[index-i].expired_time.replace(/-/g, '/');
                            var endtimestamp = Date.parse(new Date(changeTime));
                            var is_allege = endtimestamp - nowtimestamp; //已过期
                            if (is_allege < 0) {
                                me.get('list')[index-i].time = true;
                            }
                            else {
                                me.get('list')[index-i].time = false;
                            }
                            if (me.get('list')[index-i]) {
                                showlist.push(me.get('list')[index-i]);
                            }
                        }
                    }

                    me.set('showlist', showlist);

                    if (me.get('currentpage') == 1) { // 第一页
                        me.set('upisdisable', true);
                        me.set('downisdisable', false);
                    }
                    else if (me.get('currentpage') == me.get('pager')) { // 最后一页
                        me.set('upisdisable', false);
                        me.set('downisdisable', true);
                    }
                    else {
                        me.set('upisdisable', false);
                        me.set('downisdisable', false);
                    }
                }
            },
            allege: function (data) {// 点击申述
                var dialog = new AllegeDialog(data);
                dialog.show();
            },
            reasult: function (data) {

                service
                .deductDetail({
                    deduct_id: data.id
                })
                .then(function (response) {
                    var dialog = new AllegeDialog(response.data);
                    dialog.show();
                })
            }
        });

        var header = new Ractive({
            el: '#content-header',
            template: require('html!./../header.html')
        });
    };

});
