/**
 * @file 班课搜索列表页模块
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var cookie = require('cobble/util/cookie');
    var store = require('common/store');
    var flag = false;

    exports.init = function () {

        var container = $("#search-list");

        container
        .on('click', '.toggle-up', function(){
            var element = $(this);
            var count = element.data('count');
            if (count < 3) {
                return false;
            }
            var parent = element.parent().parent();
            var list = parent.find('.hide').show();
            element.parent().find('.toggle-down').show();
            element.hide();
        })
        .on('click', '.toggle-down', function(){
            var element = $(this);
            var parent = element.parent().parent();
            var list = parent.find('.hide').hide();
            element.parent().find('.toggle-up').show();
            element.hide();
        })
        .on('click', '.extend', function(){
            var element = $(this);
            var parent = element.parent().parent();
            parent.find('.hide').show();
            parent.find('li:eq(1)').css({'border-right':'1px solid #999'});
            element.hide();
        })

        .on('click', '[log]', function (e) {
            var element = $(this);
            var url = 'http://click.genshuixue.com/w.gif';
            var log = element.attr('log');
            var temp = log.split(",");
            var rank = temp[0];
            var tid = temp[1];
            var qid = temp[2];
            var location = temp[3];
            var crank = element.data("crank");
            var itemId = element.data("number");
            var uid = cookie.get('PHPSESSID');
            var time = (new Date()).getTime();
            var uuid = store.get('user').id ? store.get('user').id : -1;
            var resType = element.data('restype') ? element.data('restype') : 0;
            var params = {
                type : 'search',
                stype : 'org',
                rank : rank,
                tid: tid,
                item_id: itemId ? itemId : tid,
                qid : qid,
                location :location,
                c_rank : crank ? crank : 0,
                uid : uid,
                t : time,
                user_id : uuid,
                ad_res_type: resType
            } ;
            WAT.send(url,params);

        });

    };
});