/**
 * @file 首页聚惠学模块
 * @author zengcheng
 */
define(function(require, exports) {

    var store = require('common/store');
    var cookie = require('cobble/util/cookie');

    exports.init = function () {

        var modHolder = this;

        var hotRank = $('.preferent-right', modHolder);

        // 热门榜单
        hotRank.find('.list-category').on('click', '.category-item', function () {
            var that = $(this);

            if (!that.hasClass('active')) {
                that.addClass('active').siblings().removeClass('active');
                hotRank.find('.media-list').removeClass('active')
                    .filter('.' + that.data('nav-for')).addClass('active');
            }
        });

        // pv监控
        $('.teacher-banner a[data-monitor]', modHolder).each(function (index, item) {
            WAT.send($(item).data('monitor'));
        });

        // 点击监控
        $('.teacher-banner a[data-click-monitor]', modHolder).click(function () {
            WAT.send($(this).data('click-monitor'));
        });

        /*
         * 展示统计
         */

        function showUpCount(queryList, stype, qid){
            var array = [];
            queryList.find('.media-item').each(function(index, item){
                array.push($(item).data('num'), $(item).data('cms'));
            });
            var params = {
                type : 'search',
                stype : stype,
                qid : qid,
                data : array.join()
            };
            WAT.send('http://click.genshuixue.com/sl.gif',params);
        }

        var teacherList = hotRank.find('.teacher-list');
        var courseList = hotRank.find('.course-list');
        var orgList = hotRank.find('.org-list');
        //老师展示
        showUpCount(teacherList,'index_page_top_teacher',teacherList.data('qid'));
        //课程展示
        showUpCount(courseList,'index_page_top_course',courseList.data('qid'));
        //机构展示
        showUpCount(orgList,'index_page_top_org',orgList.data('qid'));


        modHolder
        .on('click', '[log]', function (e) {
            var element = $(this);
            var name;
            var judge = element.parent().attr("class").split(" ")[1];
            if ( judge == "teacher-list") {
                name = "teacher";
            }
            else if (judge == "course-list") {
                name = "course";
            }
            else if (judge == "org-list") {
                name = "org";
            };

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
                stype : 'index_page_top_'+name,
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
