/**
 * @file 跟谁学发布会
 * @author wangtianhua
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');
    var Slider = require('common/component/Slider');

    function initBanner(modHolder) {

        var element = $('.promotion-slider-container', modHolder);

        return new Slider({
            element: element,
            itemSelector: '.promotion-slider-item',
            iconSelector: '.navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 1500
        });

    }

    exports.init = function () {

        var container = $('.main');
        var banner = container.find('.banner-wrapper');
        initBanner(banner);

    }
});