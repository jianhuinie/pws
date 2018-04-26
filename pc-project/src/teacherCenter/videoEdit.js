/**
 * @file 编辑视频信息
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var TagInput = require('common/component/TagInput');
    var service = require('common/service');
    var form = require('common/form');
    var store = require('common/store');

    exports.init = function () {

        var container = $('#content .edit-form');
        // var hint = container.find('.hint');

        // 标签
        var tagInput = new TagInput({
            element: container.find('[name="labels"]')
        });
        tagInput.setValue(store.get('labels') || '');

        // 分类
        var cateRadio = container.find('[name="category"]');
        var zeroRadio = cateRadio.filter('[value="0"]'); // 自我介绍
        var oneRadio = cateRadio.filter('[value="1"]'); // 讲课短片
        var twoRadio = cateRadio.filter('[value="2"]'); // 才艺展示
        var threeRadio = cateRadio.filter('[value="3"]'); // 其他
        var activityRadio = cateRadio.filter('[value="4"]'); // 风云大赛

        var category = store.get('category');

        var arrRadio = {
            0: zeroRadio,
            1: oneRadio,
            2: twoRadio,
            3: threeRadio,
            4: activityRadio
        };
        cateRadio = arrRadio[category];
        // 不用点击没法触发 change 事件
        cateRadio.click();

        container
        .on('click', '.all-pics li', function (e) { // 选封面
            var target = $(e.currentTarget);
            var allPics = target.closest('.all-pics');

            if (!target.hasClass('active')) {

                allPics
                .find('li')
                .each(function (index, item) {
                    if ($(item).hasClass('active')) {
                        $(item).removeClass('active');
                    }
                });

                target.addClass('active');

                var currentSrc = target.find('img').attr('src');
                container.find('.preview img').attr('src', currentSrc);

            }
        })

        .on('click', '.btn-save', function () { // 保存

            var data = form.parse(container);
            var labels = tagInput.getValue();

            if (!data.title) {
                alert('请输入视频标题');
                return;
            }

            if (data.category == null) {
                alert('请选择视频分类');
                return;
            }

            if (labels.length === 0) {
                alert('请输入视频标签');
                return;
            }

            service
            .createVideo({
                edit: 1,
                id: data.id,
                title: data.title,
                category: data.category,
                labels: labels,
                url: container.find('.preview img').attr('src')
            })
            .done(function (response) {
                if (response.code === 0) {
                    success('保存成功', function () {
                        location.href = '/teacher_center/video';
                    });
                }
            });
        });
    };

});