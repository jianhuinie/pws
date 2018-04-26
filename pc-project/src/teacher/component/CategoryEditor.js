/**
 * @file 分类名称编辑器
 * @author zengcheng
 */
define(function (require, exports) {

    'use strict';

    var etpl = require('cobble/util/etpl');

    //编辑器的模板
    var TEMPLATE = ''
        + '<div class="categry-editor">'
        +    '<div class="error-tip" style="display: none">名称已存在</div>'
        +    '<div class="editor-wrapper">'
        +       '<input class="input-text" value="${data.name}" type="text" name="cateName" maxlength="20" placeholder="最多20个字"/>'
        +       '<span class="sure-btn">确定</span>'
        +       '<span class="cancel-btn">取消</span>'
        +    '</div>'
        + '</div>';

    /**
     * @constructor
     * @param {object} options
     */
    function CategoryEditor(options) {
        $.extend(this, options);
        this.init();
    }

    /**
     * init 初始化
     * @return {object} 对象本身
     */
    CategoryEditor.prototype.init = function () {
        //编译模板
        this.renderFunc = etpl.compile(TEMPLATE);
        return this;
    };

    /**
     * edit 元素处于编辑状态
     * @param  {jQuery} element 启动编辑的元素
     * @param  {object=} data 编辑的原始数据
     * @property {string|number} data.id 分类的id
     * @property {string} data.name 分类的名称
     * @return {object} 对象本身
     */
    CategoryEditor.prototype.edit = function (element, data) {

        var offFunc = function (e) {
            $(document).off('click', offFunc);
            that.editorElement && that.editorElement.remove();
            that.cancel && that.cancel();
            e.stopPropagation();
        };

        //当前编辑的数据
        this.data = $.extend({
            id: '',
            name: ''
        }, data);

        //当前编辑的节点
        if (element) {
            this.editorElement && this.editorElement.remove()
            this.editorElement = $(this.renderFunc({data: this.data}))
            element.append(this.editorElement);
        }

        //绑定回调事件
        if (this.editorElement) {
            var that = this;
            this.editorElement
            .on('click', function(e){
                e.stopPropagation();
                return false;
            })
            .on('click', '.sure-btn', function (e) {
                $(document).off('click', offFunc);
                //同步dom的输入到data
                that.syncData();
                if (that.validate()) {
                    that.save && that.save(that.data);
                }
                e.stopPropagation();
                return false;
            })
            .on('click', '.cancel-btn', function (e) {
                $(document).off('click', offFunc);
                that.editorElement && that.editorElement.remove();
                that.cancel && that.cancel();
                e.stopPropagation();
                return false;
            }).find('.input-text').focus().select();

            $(document).on('click', offFunc);
        }
        return this;
    };

    CategoryEditor.prototype.onsave = function (callback) {
        this.save = function(data) {
            this.editorElement && this.editorElement.remove();
            callback && callback(data);
        }
        return this;
    };

    CategoryEditor.prototype.oncancel = function (callback) {
        this.cancel = function(data) {
            callback && callback();
        }
        return this;
    };

    /**
     * 同步input的数据到data.name
     * @return {object} 返回同步之后完整的数据
     */
    CategoryEditor.prototype.syncData = function () {
        this.data.name = $.trim(this.editorElement.find('.input-text').val());
        return this.data;
    };

    /**
     * 验证数据的合法性
     * @return {boolean} 验证是否通过
     */
    CategoryEditor.prototype.validate = function () {
        if (!this.data.name) {
            this.editorElement.find('.error-tip')
                .text('请输入分类名称')
                .show();
            return false;
        }

        if (this.categoryList) {
            var tmp;
            for (var i = 0, len = this.categoryList.length; i < len; i++) {
                tmp = this.categoryList[i];
                if (this.data.id != tmp.id && tmp.name == this.data.name) {
                    this.editorElement.find('.error-tip')
                        .text('名称已存在')
                        .show();
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * 设置分类的所有原始数据
     * @param {Array.object} data 文章分类列表
     */
    CategoryEditor.prototype.setAllCategory = function (data) {
        this.categoryList = data;
    };

    /**
     * 根据id获取当前的分类详细数据
     * @param {string|number} id 文章分类id
     */
    CategoryEditor.prototype.getId = function (id) {
        if (this.categoryList) {
            var tmp;
            for (var i = 0, len = this.categoryList.length; i < len; i++) {
                tmp = this.categoryList[i];
                if (tmp.id == id) {
                    return tmp;
                }
            }
        }
    };

    return CategoryEditor;
});