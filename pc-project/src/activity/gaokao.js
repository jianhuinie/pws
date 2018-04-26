/**
 * @file 2014.09版首页的脚本文件
 * @author peilonghui
 */

define(function (require) {

    var service = require('common/service');
    var store = require('common/store');

    var container = $('#content-left');

    var subjectId = null;
    var nextCursor = 2;
    var hasMore = false;

    function getHtml(list){
        var result = "";
        var item ="";
        for(var i =0;i<list.length; i++){
            var val = list[i],img = '' ,style='style="height:140px;"';
            var title = val.title.length >22 ? val.title.substr(0,22)+'...':val.title;
            var description = val.description.length >78 ? val.description.substr(0,78)+'...':val.description;
            if(val.cover_img){
                img='<img src="'+val.cover_img+'">';
                style='';
            }
            item
            = '<a class="subject-item" href="'+val.link+'" target="_blank" '+style+'>'
            +   img
            +   '<div class="item-content">'
            +       '<div class="item-title">'
            +           '<em><nobr>'+title+'</nobr></em>'
            +       '</div>'
            +       '<div class="item-description">'
            +           description
            +       '</div>'
            +   '</div>'
            + '</em>'

            result += item;
        }
        return result;
    }

    return {
        init: function () {
            subjectId = store.get("subjectId");
            nextCursor = store.get("nextCursor");
            hasMore = store.get("hasMore");

            container.on('click','.seemore',function(event){
                var thiz = $(event.target);
                thiz.text('正在加载');
                service.getGaoKaoActivity({
                    subject_id : subjectId,
                    next_cursor : nextCursor
                }).done(function(response){
                    if(response.code == 0){
                        nextCursor = response.data.next_cursor;
                        thiz.text('加载更多');
                        if(!response.data.has_more){
                            thiz.hide();
                        }
                        var html = getHtml(response.data.list);
                        $('#hiddenDiv').html(html);
                        $('#hiddenDiv').find('.subject-item').appendTo(container.find('.content-div'))
                        container.find('.content-div').appendChild(html);
                        $('#hiddenDiv').html('');
                    }
                });
            });
        }
    }
});
