/**
 * @file 课程推荐 - 检索
 * @author zhangliyuan
 */
define(function (require, exports) {


    'use strict';

    var AutoComplete = require('cobble/ui/AutoComplete');
    var etpl = require('cobble/util/etpl');
    var service = require('common/service');

    var classifyTpl = etpl.compile(
           '<!-- if: ${type} == "lest" -->'
          +     '<p class="message-default no-data-message">'
          +         '抱歉，你这个科目目前还真没有，'
          +         '要不换个词试试或者在下面的类目选择中看看是否有贴近的，'
          +         '把你的科目写到自定义科目中。'
          +      '</p>'
          + '<!-- elif: ${type} === "less" -->'
          +     '<p class="row-head">根据你填写的关键字，你是否是要开设以下类目的课程：</p>'
          +     '<!-- for: ${list} as ${item} -->'
          +         '<div class="message-default row-classify" '
          +             'data-cat1-id="${item[1].id}"'
          +             'data-cat1-name="${item[1].name}"'
          +             'data-cat2-id="${item[2].id}"'
          +             'data-cat2-name="${item[2].name}"'
          +             'data-cat3-id="${item[3].id}"'
          +             'data-cat3-name="${item[3].name}"'
          +         '>'
          +         '<!-- if: ${item[3]} -->'
          +             '<div class="remark_name">'
          +                 '${item[3].remark_name}'
          +             '</div>'
          +             '${item[1].name}&gt;${item[2].name}&gt;${item[3].name}'
          +         '<!-- elif: ${item[2]} -->'
          +             '<div class="remark_name">'
          +                 '${item[2].remark_name}'
          +             '</div> '
          +             '${item[1].name}&gt;${item[2].name}'
          +         '<!-- elif: ${item[1]} -->'
          +             '<div class="remark_name">'
          +                 '${item[1].remark_name}'
          +             '</div> '
          +             '${item[1].name}'
          +         '<!-- /if -->'
          +         '</div>'
          +     '<!-- /for -->'
          + '<!-- elif: ${type} === "more" -->'
          +     '<p class="row-head">根据你填写的关键字，你是否是要开设以下类目的课程：</p>'
          +     '<!-- for: ${list} as ${classify},${classifyName} -->'
          +     '<!-- var: len = ${classify.length} - 1 -->'
          +         '<div class="classify">'
          +         '<div class="classify-name">'
          +             '${classifyName}'
          +         '</div>'
          +         '<div class="classify-content">'
          +             '<!-- for: ${classify} as ${item},${index} -->'
          +                 '<!-- if: ${index} % 5 == 0 -->'
          +                     '<div class="row-con">'
          +                 '<!-- /if -->'
          +                     '<div class="message-default row-col-classify" '
          +                         'data-cat1-id="${item[1].id}"'
          +                         'data-cat1-name="${item[1].name}"'
          +                         'data-cat2-id="${item[2].id}"'
          +                         'data-cat2-name="${item[2].name}"'
          +                         'data-cat3-id="${item[3].id}"'
          +                         'data-cat3-name="${item[3].name}"'
          +                     '>'
          +                         '<!-- if: ${item[3]} -->'
          +                             '${item[3].remark_name}'
          +                         '<!-- elif: ${item[2]} -->'
          +                             '${item[2].remark_name}'
          +                         '<!-- elif: ${item[1]} -->'
          +                             '${item[1].remark_name}'
          +                         '<!-- /if -->'
          +                     '</div>'
          +                 '<!-- if: ${index} % 5 == 4 || ${index} == ${len} -->'
          +                     '</div>'
          +                 '<!-- /if -->'
          +             '<!-- /for -->'
          +         '</div>'
          +         '</div>'
          +     '<!-- /for -->'
          + '<!-- else -->'
          +         '<p class="message-default no-data">'
          +             '老师，多给小秘书点信息吧，这点信息小秘书已经挑花眼了，实在不敢给你推荐啊'
          +         '</p>'
          + '<!-- /if -->'
        );

    function classify(keyword) {

        var deferred = $.Deferred();

        service
        .courseClassify({
            keyword: keyword
        })
        .done(function (response) {

            if (response.code === 0) {

                deferred.resolve(
                    classifyTpl({
                        list: response.data.data,
                        type: response.data.type
                    })
                );

            }
        });

        return deferred;
    }

    /*
     * @param {function} refresh 刷新表单
     * @param {function} refresh 刷新表单
     * @param {string} type 容器，类名
     */
    exports.init = function (me, refresh, type) {


        var container = $('.'+ type +'-form');

        var autoComplete = new AutoComplete({
            element: container.find('.classify-keyword'),
            menu: container.find('.classify-result'),
            load: function(){}
        });


        container
        .on('click', '.row-classify,.row-col-classify', function (e) {

            var target = $(this);
            var data = target.data();

            if (!me.data) {
                me.data = {};
            }

            me.data.subject_path = [];

            me.data.subject_path.push({
                id: data.cat1Id,
                name: data.cat1Name
            });

            me.data.subject_path.push({
                id: data.cat2Id,
                name: data.cat2Name
            });

            me.data.subject_path.push({
                id: data.cat3Id,
                name: data.cat3Name
            });

            refresh();
            autoComplete.close();
        })

        .on('keydown','.classify-keyword',function (e) {
                if (e.keyCode === 13) {
                classify(
                    this.value
                )
                .done(function (html) {
                    container.find('.classify-result').html(
                        html
                    );
                    autoComplete.open();
                });
            }
        })

        .on('click','.course-classify',function (e) {

            classify(
                $(e.target).parent().find('.classify-keyword').val()
            )
            .done(function (html) {
                container.find('.classify-result').html(
                    html
                );
                autoComplete.open();
            });

        });

    }

});