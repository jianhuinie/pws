define(function (require, exports) {

    var store = require('common/store');
    var editor;
    var holder;

    // 初始化富文本编辑器
    var initUedit = function (element) {
        var trimSpace = /<p>(?:(?:<br\/>)|\s)*<\/p>/g;
        var editor = new UE.ui.Editor({
            initialFrameHeight: 410,
            maximumWords: 120000,
            autoHeightEnabled: false,
            initialStyle: 'body{color: #333;font-size: 14px;font-family: 微软雅黑; line-height: 24px;} img{max-width:100%;}'
        });

        editor.addListener('ready', function() {
            if (!store.get('detailInfo')) {
                editor.execCommand('drafts');
            } else {
                // 初始化完成后显示文章类容
                editor.setContent(store.get('detailInfo').introduction || '');
            }
        });

        editor.render(element);

        return {
            getContent: function () {
                return $.trim(editor.getContent().replace(trimSpace, ''));
            },

            reset: function () {
                editor.execCommand('clearlocaldata');
            }
        }
    };

    exports.init = function (events) {
        holder = this;
        editor = initUedit(this.find('.u-editor')[0]);

    };

    exports.validate = function () {
        var deferred = $.Deferred();
        var content = exports.getData().introduction;
        if (content == '') {
            holder.find('.input-tip-container').show();
        } else {
            holder.find('.input-tip-container').hide();
        }
        deferred.resolve(content != '');
        return deferred.promise();
    };

    exports.getData = function () {
        var content = editor.getContent();
        return {
            introduction: content
        };
    };

    exports.clearlocaldata = function () {
        editor.reset();
    };
});