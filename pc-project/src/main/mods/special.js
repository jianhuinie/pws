/**
 * @file 首页专场模块
 * @author zengcheng
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');
    var VideoDialog = require('common/component/VideoDialog');
    var cookie = require('cobble/util/cookie');
    var store = require('common/store');

    /**
     * 初始化评论
     */
    function initCommentsCarousel(ele) {
        return new Slider({
            element: ele,
            itemSelector: '.comment-item',
            scrollOneDirection: true,
            duration: 10000
        });
    }

    exports.init = function () {

        var modHolder = this;

        // 初始化评论列表
        initCommentsCarousel($('.comment-list', modHolder));

        // 弹出视频框
        modHolder.on('click', '.icon-play-oo', function () {

            var element = $(this);
            new VideoDialog({
                url: element.data('video'),
                title: ''
            });

            return false;
        });

        modHolder
        .on('click', '[log]', function (e) {
            var element = $(this);
            var specialWrapper = element.closest('.special-wrapper');
            var url = 'http://click.genshuixue.com/w.gif';
            var log = element.attr('log');
            var temp = log.split(",");
            console.log(temp);
            var rank = temp[0];
            var item_id = temp[1];
            var qid = temp[2];
            var item_type = temp[3];
            var uid = cookie.get('PHPSESSID');
            var time = (new Date()).getTime();
            var uuid = store.get('user').id ? store.get('user').id : -1;
            var params = {
                type : 'search',
                stype : 'index_page_' + specialWrapper.data('floor') + '_' + element.data('type') ,
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

        modHolder
        .next(".org-list-wrapper")
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
                stype : 'index_page_' + specialWrapper.data('floor') + '_4',
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
        // .on('click', '[log]', function (e) {
        //     var element = $(this);
        //     var specialWrapper = element.closest('.org-list-wrapper').prev('.special-wrapper');
        //     var url = 'http://click.genshuixue.com/w.gif?type=search&stype=index_page_' + specialWrapper.data('floor') + '_4&' + element.attr('log');
        //     var uid = cookie.get('PHPSESSID');
        //     var time = (new Date()).getTime();
        //     var uuid = store.get('user').id ? store.get('user').id : -1;
        //     url += '&uid=' + (uid ? uid : '') + '&t=' + time + '&user_id=' + uuid;
        //     var img = new Image();
        //     img.src = url;
        // });


        //展示统计方法
        function showUpCount(query, floor, qid){

            var array = [];
            modHolder.find(query).each(function(index,item){
                array.push($(item).data('num'), $(item).data('cms'));
            });
            var params ={
                type : 'search',
                stype : floor,
                qid : qid,
                uid : cookie.get('PHPSESSID') ? cookie.get('PHPSESSID') : '',
                user_id : store.get('user').id ? store.get('user').id : -1,
                t : (new Date()).getTime(),
                data : array.join()
            }

            WAT.send('http://click.genshuixue.com/sl.gif', params);
        }

        /*
         * 展示统计
         */
        var floor = modHolder.data('floor');
        var qids = modHolder.data('qid');

        // 热门课程 - hot_course 1
        showUpCount('.course-media-list .course-media','index_page_'+floor+'_1',qids.media_list);

        // 最新课程 - latest_course 2
        showUpCount('.course-recommend-list li','index_page_'+floor+'_2',qids.latest_courses);

        // 热门老师 － hot_teacher 3
        showUpCount('.special-right-content .hot-list li','index_page_'+floor+'_3',qids.hot_teachers);

        // 机构 － org_list 4
        var query = modHolder
            .next('.org-list-wrapper')
            .find('.org-list .org-logo');

        showUpCount(query,'index_page_'+floor+'_4',qids.org_list);

    };
});
