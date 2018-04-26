define(function (require, exports) {

    var holder;

    var browser = require('cc/util/browser');

    exports.init = function (data) {
        holder = $(this);
        //手机模板的弹层
        var previewPhone = holder.find('.preview-phone');
        var previewMask = holder.find('.preview-mask');
        var m_temp = holder.find('.templates_m');
        var pc_temp = holder.find('.templates_pc');
        m_temp
        .on('click', '.mode', function () {
            var element = $(this);
            m_temp.find('.mode').removeClass('active');
            element.addClass('active');
        })
        pc_temp
        .on('click', '.mode', function () {
            var element = $(this);
            pc_temp.find('.mode').removeClass('active');
            element.addClass('active');
        })
        holder
        .on('click', '.nav-item', function () {
            var element = $(this);
            var preview = holder.parent().find('.preview-action');
            element.addClass('active')
                   .siblings().removeClass('active');
            if (element.data('template') == 'templates_m') {
                pc_temp.hide();
                m_temp.show();
                preview.html('<i class="icon icon-eye"></i>预览手机版');
            }
            else if (element.data('template') == 'templates_pc'){
                m_temp.hide();
                pc_temp.show();
                preview.html('<i class="icon icon-eye"></i>预览网页版');
            }

        })
    };

    exports.getData = function () {


        var templates_m = holder.find('.templates_m'); //m模板
        var templates_pc = holder.find('.templates_pc'); //pc模板
        //手机模板选中的模板
        var template_m = templates_m.find('.image .active');
        var mobile_template = template_m.data('template');
        //网页模板选中的模板
        var template_pc = templates_pc.find('.image .active');
        var PC_template = template_pc.data('template');
        //网页模板默认模板
        if (PC_template) {
            PC_template = PC_template;
        }
        else {
            PC_template = 'default';
        }
        //手机模版的默认模板
        if (mobile_template) {
            mobile_template = mobile_template;
        }
        else {
            mobile_template = 'default'
        }
        return {
            template_m : mobile_template,
            template_pc : PC_template
        };
    };

});