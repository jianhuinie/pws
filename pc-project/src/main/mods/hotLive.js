
/**
 * @file 热门直播
 * @author zengcheng
 */
define(function (require, exports) {

    var service = require('common/service');
    var etpl = require('cobble/util/etpl');
    var lazyImage = require('common/lazyImage');
    var store = require('common/store');

    var cookie = require('cobble/util/cookie');

    var renderCourserList = etpl.compile($('#hot-live-template').html());

    etpl.addFilter('truncate', function (value, length) {
        if (value.length > length) {
            return value.substring(0, length-1) + '...'
        } else {
            return value.substring(0, length);
        }
    });

    function getLogUrl(list, qid) {
        var tmp;
        for (var i = list.length - 1; i >= 0; i--) {
            tmp = list[i];
            list[i].log_url =  (i+1) + ',' + tmp.number + ',' + qid + ',' + tmp.is_cms;
        }
    }

    // 填充热门直播列表
    function initContent(wrapper, data) {

        var currentData = {
            isCurrent: true,
            list: data.today,
            qid: data.qid
        };
        var nextData = {
            isCurrent: false,
            list: data.tomorrow,
            qid: data.qid
        };
        getLogUrl(currentData.list, data.qid);
        getLogUrl(nextData.list, data.qid);

        wrapper.html(
            renderCourserList({data: currentData}) + renderCourserList({data: nextData})
        );
        wrapper.find('.week-item:eq(0)').addClass('active');
        lazyImage.scanning(true, wrapper);
        if(currentData.list.length<=0)
        {
            wrapper.find('.week-title:eq(0)').addClass('hide');
        }
    }

    // 初始化hover效果
    function initHover(modHolder) {
        modHolder.find('.list-wrapper .week-item').hover(function(){
            var that = $(this);
            if (!that.hasClass('active')) {
                $('.list-wrapper .week-item.active').removeClass('active');
                that.addClass('active');
            }
        });
        modHolder.find('.list-wrapper').mouseover(function(e){
            var ohover = $(this);
                ohover.addClass('hover');
        }).mouseout(function(){
            var ohover = $(this);
                ohover.removeClass('hover');
        });


    }

    exports.init = function () {

        var modHolder = this;
        var qid = modHolder.find('.now-week').data('qid');

        service
        .getHotLiveList()
        .done(function (response) {
            if (!response.code) {
                initContent($('.list-liner', modHolder), response.data);
                initHover(modHolder);


                // 展示统计
                var url = 'http://click.genshuixue.com/sl.gif';

                var data_hl_arr = [];
                modHolder
                    .find('.week-list .week-item')
                    .each(function (index, item) {
                        data_hl_arr.push($(item).data('num'), $(item).data('cms'));
                    });

                var params = {
                    type : 'search',
                    stype : 'index_page_hot_online',
                    qid :modHolder.find('.now-week').data('qid'),
                    data : data_hl_arr.join()
                };
                WAT.send(url,params);

            }
        });

        modHolder
        .on('click', '[log]', function (e) {
            var element = $(this);
            var specialWrapper = element.closest('.org-list-wrapper').prev('.special-wrapper');
            var url = 'http://click.genshuixue.com/w.gif';
            var log = element.attr('log');
            var temp = log.split(",");
            var rank = temp[0];
            var item_id = temp[1];
            var qid = temp[2];
            var item_type = temp[3];
            var uid = cookie.get('PHPSESSID');
            var time = (new Date()).getTime();
            var uuid = store.get('user').id ? store.get('user').id : -1;
            var params = {
                type : 'search',
                stype : 'index_page_hot_online',
                rank : rank,
                item_id: item_id,
                qid : qid,
                item_type : item_type,
                uid : uid,
                t : time,
                user_id : uuid
            } ;
            WAT.send(url,params);

        });
    };
});
