/**
 * Created by wuxuelan on 16/9/08.
 */
define(function(require) {
    'use strict';
    var $ = require("zepto");
    var ui = require("common/ui");
    var user = require('common/user');
    var MVCObject = require('common/mvc/MVCObject');
    var string = require('util/string');
    var service = require('common/service');
    var lazyLoadImage = require('common/lazyLoadImage');
    var page_layout = require('common/page_layout');
    var app = require('common/app');
    var env = require('util/env');

    var container = $('.container');
    var fid;

    return function(page_data) {
        fid = page_data.fid;
        var img = container.find('#pre_img');
        $.ajax({
            url: '/course_material/previewAjax',
            type: 'get',
            data: {
                fid: fid
            },
            success: function (response) {
                if (response.code != 0) {
                    ui.alert(response.msg);
                }
                else {
                   img.attr('src', response.data.preview_url);
                }
            }
        })



    }
});