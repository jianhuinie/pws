/**
 * @file 首页推荐老师模块
 * @author zengcheng
 */

define(function (require, exports) {

    var service = require("common/service");
    var etpl = require('cobble/util/etpl');
    var lazyImage = require('common/lazyImage');
    var cookie = require('cobble/util/cookie');
    var store = require('common/store');
    var offset = 0;

    etpl.addFilter('toText', function (value) {
        if (value == -1) {
            return '30年以上'
        } else {
            return value + '年教龄';
        }
    });
    // 老师模板渲染
    function renderTeacher() {
        return etpl.compile($('#recommend-teacher-template').html());
    }

    // 获取老师列表
    function getTeacherList(render) {

        service
            .getRecommendTeachers({offset:offset})
            .done(function (response) {
                if (!response.code) {
                    render(response);
                    offset += 5;
                }
            });
    }

    exports.init = function () {

        var modHolder = this;
        var listWrapper = $('.teacher-list', modHolder);
        var renderaHandler = renderTeacher();
        var render = function(response) {
            listWrapper.html(renderaHandler({ teachers: response.data }));
            lazyImage.scanning(true, listWrapper);
        };

        // 换一批老师
        modHolder.find('.refresh').on('click', function () {
            getTeacherList(render);
        });

        listWrapper.on('click','.link-wrapper',function(event){
            var thiz = $(this);
            var tid = thiz.data('monitorTid');
            var index = thiz.data('index')+1;
            var userNumber = store.get('user').number;
            var qid = thiz.data('qid');
            WAT.send("http://click.genshuixue.com/w.gif",{
                type: "search",
                stype: "teacher_recommend",
                rank: index,
                uid: cookie.get('__track_id__'),
                item_id: tid,
                qid: qid,
                user_id: userNumber
            });
        });

        getTeacherList(render);
    };

})