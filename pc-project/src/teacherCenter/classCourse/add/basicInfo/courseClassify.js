/**
 * @file 课程推荐 - 检索
 * @author 张少龙
 */
define(function (require, exports) {

    'use strict';

    var AutoComplete = require('cobble/ui/AutoComplete');
    var service = require('common/service');

    require('tpl!./courseClassify.tpl');

    function classify(keyword) {

        var deferred = $.Deferred();

        service.courseClassify({
            keyword: keyword
        }).done(function (response) {
            if (response.code === 0) {
                deferred.resolve(
                    Simplite.render('course-classify', {
                        list: response.data.data,
                        type: response.data.type
                    })
                );
            }
        });
        return deferred.promise();
    }

    /*
     * @param {Dom Node} container 包含推荐分类的容器元素
     * @param {function} refresh 刷新表单
     */
    exports.init = function (container, refresh) {

        var autoComplete = new AutoComplete({
            element: container.find('.classify-keyword'),
            menu: container.find('.classify-result'),
            load: function(){}
        });


        container
        .on('click', '.row-classify, .row-col-classify', function (e) {
            var target = $(this);
            var data = target.data();
            var subjectPath = data.subject_path = [];

            subjectPath.push({
                id: data.cat1Id,
                name: data.cat1Name
            });

            subjectPath.push({
                id: data.cat2Id,
                name: data.cat2Name
            });

            subjectPath.push({
                id: data.cat3Id,
                name: data.cat3Name
            });

            refresh(data);
            autoComplete.close();
        })

        .on('keydown', '.classify-keyword', function (e) {
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

        .on('click', '.help-find', function (e) {

            classify(
                $(e.target).parent().find('.classify-keyword').val()
            )
            .done(function (html) {
                container.find('.classify-result').html(
                    html
                );
                autoComplete.open();
            });

        })

        .on('click', '.no-data-message > span', function () {
            refresh();
            autoComplete.close();
        });

    }

});