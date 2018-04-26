/**
 * @file 全部价格
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');

    /**
     * 全部价格
     * @param {Object} options
     */
    function AllPrice(options) {
        $.extend(this, options);
        this.init();
    }

    AllPrice.prototype = {

        init: function () {

            var me = this;
            var element = me.element;
            // 价格列表
            var priceTable = element.find('.price-table');
            var priceFooter = element.find('.price-footer');
            var subjectSelect = me.subjectSelect;
            //
            var lastcourse = null ;
            var lastway = null ;
            var lastlock = false;
            // 上课方式key,value对照表
            var wayMap = {
                teacher: '老师上门',
                student: '学生上门',
                discuss: '协商地点',
                online: '在线授课'
            };

            // 清除表格背景
            function clearTableBg() {
                var style = {
                    background:'#fff',
                    color:'#6d6d6d'
                };

                priceTable.find('th').each(function (i, item) {
                    if (i > 1) {
                        $(item).css(style);
                    }
                });

                priceTable.find('td').each(function (i, item) {
                    $(item).css(style).removeClass('bgtag');
                });
            }
            // 添加表格背景
            function addTableBg(course, way) {

                if (!course && !way) {
                    return false;
                }

                var style = {
                    background:'#ff9900',
                    color:'#ffffff'
                };

                var yindex = 0;
                var xindex = 0;
                var tmpIndex = 0;
                var lock = false;

                if (way) {
                    priceTable.find('th').each(function (i, item) {
                        if (i > 1) {
                            var element = $(item);
                            if (wayMap[way] === element.html()) {
                                element.css(style);
                                xindex = i;
                            }
                        }
                    });
                }

                if (course) {
                    priceTable.find('td').each(function (i, item) {
                        var element = $(item);
                        var index = element.index();
                        var courseId = element.data('course');

                        if (lock) {
                            var targetIndex = (yindex - 1) * 5 + xindex - 1;
                            if (i === targetIndex) {
                                element.css(style);
                                element.addClass('bgtag');
                                return false;
                            }
                        }

                        if (index === 0) {
                            tmpIndex++;
                            if (courseId === course) {
                                element.css(style);
                                lock = true ;
                                yindex = tmpIndex;
                            }
                        }

                    });
                }

            }

            var popup = new Popup({
                element: element.find('.price-trigger'),
                layer: element.find('.price-menu'),
                show: {
                    trigger: 'click'
                },
                hide: {
                    trigger: 'click'
                },
                onBeforeShow: function(e) {
                    var course = subjectSelect.courseSelect.getValue();
                    var way = subjectSelect.waySelect.getValue();
                    clearTableBg();
                    addTableBg(course, way);
                    lastcourse = course;
                    lastway = way;
                    lastlock = false;
                },
                onAfterHide: function(e) {

                    if (!lastlock) {
                        clearTableBg();
                        addTableBg(lastcourse, lastway);
                        subjectSelect.courseSelect.setValue(lastcourse) ;
                        subjectSelect.waySelect.setValue(lastway);
                    }
                }
            });

            /*
             * 点击价格列表自动选择对应的科目和上课方式
             */
            priceTable

            .on('click', 'td', function(e) {

                var element = $(this);
                var x = element.index();
                var text = element.html();
                var course = element.data('course');
                var way = element.data('way');

                if (text === '--'
                    || x === 0
                ) {
                    return;
                }

                subjectSelect.courseSelect.setValue(course) ;
                subjectSelect.waySelect.setValue(way);

                clearTableBg();
                addTableBg(course, way);

            })

            .on('mouseenter', 'td', function(e) {
                var element = $(this);
                var text = element.html();
                var style = {
                    background: '#fffbef',
                    color: '#3d3d3d'
                };
                if (text.indexOf('￥') < 0
                    || element.hasClass('bgtag')
                ) {
                    return;
                }

                element.css(style);
            })

            .on('mouseleave', 'td', function(e) {
                var element = $(this);
                var text = element.html();
                var style = {
                    background: '#ffffff',
                    color: '#6d6d6d'
                };
                if (element.hasClass('bgtag')
                    || text.indexOf('￥') < 0
                ) {
                    return;
                }

                element.css(style);

            });

            priceFooter

            .on('click', '.allprice-confirm', function(e) {
                lastlock = true ;
                popup.close();
            })

            .on('click', '.allprice-cancel', function(e) {
                popup.close();
            });
        }

    };

    return AllPrice;

});