/**
 * @file 富文本
 * @author niejianhui
 * @date 2017/08/17
 */
define(function (require) {
    'use strict';
    var Draggable = require('cc-config/helper/Draggable');
    var rectUtil = require('cc/util/rect');

    angular.module('Manage.directives')
        .directive('richEditor', ['utilService', '$timeout', 'dialog', '$rootScope',
        function (utilService, $timeout, dialog, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            /**
             * options.style 背景主题
             * options.editorList 富文本列表对象数组 
             * options.editorList[i].type 可以是 title body photo video audio
             * options.editorList[i].options 数组元素具体配置参照对应项的配置参数
             * options.panelList 左侧面板配置 array 如['title', 'body'] 不传默认全部
             * options.notSupportPreview  是否不需要支持预览详情 默认 false(即支持预览)
             */
            scope : {
                options: '='
            },
            templateUrl: 'app/common/ngDirective/richEditor/tpl.html',
            link: function ($scope, element) {
                $scope.hasUploadingItem = false;
                $scope.$on('uploadingStatusChange', function (e, data) {
                    $scope.hasUploadingItem = data;
                });

                //初始化左侧面板
                var defaultPanelList = ['title', 'body', 'photo', 'video', 'audio'];
                function initPanel() {
                    $scope.panelList = $scope.options.panelList || defaultPanelList;
                    $scope.panelListMap = {
                        'title': '标题',
                        'body': '正文',
                        'photo': '图片',
                        'video': '视频',
                        'audio': '音频',
                    };
                }
                initPanel();
                $scope.notSupportPreview = $scope.options.notSupportPreview || false;

                //滑到刚增加到那项的位置
                function scrollToBottom() {
                    var $editList = element.find('.editor-list')[0];
                    $timeout(function () {
                        $editList.scrollTop = $editList.scrollHeight;
                    }, 30);
                }
                //添加一项插入操作
                function doAddItem(item) {
                    $scope.options.editorList.push(item);
                    scrollToBottom();
                }

                //增加标题
                function addTitle() {
                    var titleItem = {
                        type: 'title',
                        options: {
                            text: ''
                        }
                    };
                    doAddItem(titleItem);
                }
                //增加正文
                function addBody() {
                    var bodyItem = {
                        type: 'body',
                        options: {
                            text: '',
                            fontWeight: 'normal',
                            fontSize: '15px',
                            textAlign: 'left',
                            color: '#000000'
                        }
                    };
                    doAddItem(bodyItem);
                }
                //增加图片
                function addPhoto() {
                    var photoItem = {
                        type: 'photo',
                        options: {
                            storageId: '',
                            url: '',
                            refer_url: ''
                        }
                    };
                    doAddItem(photoItem);
                }
                //增加音频
                function addAudio() {
                    var audioItem = {
                        type: 'audio',
                        options: {
                            storageId: '',
                            url: ''
                        }
                    };
                    doAddItem(audioItem);
                }
                //增加视频
                function addVideo() {
                    var videoItem = {
                        type: 'video',
                        options: {
                            videoId: '',
                            coverUrl: ''
                        }
                    };
                    doAddItem(videoItem);
                }
                //增加一项
                $scope.addItem = function (type) {
                    switch(type) {
                        case 'title':
                            addTitle();
                            break;
                        case 'body':
                            addBody();
                            break;
                        case 'video':
                            addVideo();
                            break;
                        case 'photo':
                            addPhoto();
                            break;
                        case 'audio':
                            addAudio();
                            break;
                    }
                };

                //删除操作
                function doDeleteItem(index) {
                    $scope.options.editorList.splice(index, 1);
                }

                //删除确认弹窗
                function confirmDelete(index) {
                    utilService
                        .showMessage({
                            title: '温馨提示',
                            content: '您确认删除吗？',
                            hideCancel: false,
                            okBtnPosition: 'left',
                            okHandler: function () {
                                doDeleteItem(index);
                            }
                        });
                }

                //删除文本项
                function deleteTextItem(item, index) {
                    if (item.options.text) {
                        confirmDelete(index);
                    }
                    else {
                        doDeleteItem(index);
                    }
                }

                //删除图片或音频项
                function deleteAudioOrPhoto(item, index) {
                    if (item.options.storageId) {
                        confirmDelete(index);
                    }
                    else {
                        doDeleteItem(index);
                    }
                }
                
                //删除视频
                function deleteVideo(item, index) {
                    if (item.options.videoId) {
                        confirmDelete(index);
                    }
                    else {
                        doDeleteItem(index);
                    }
                }
                
                //删除某一项 (删除也可以在每一项里定义 然后emit出来)
                $scope.deleteItem = function (item, index) {
                    switch(item.type) {
                        case 'title':
                        case 'body':
                            deleteTextItem(item, index);
                            break;
                        case 'photo':
                        case 'audio':
                            deleteAudioOrPhoto(item, index);
                            break;
                        case 'video':
                            deleteVideo(item, index);
                            break;
                    }
                };
                $scope.previewCourseDetail = function () {
                    dialog.open({
                        skinClass: 'preview-coursedetail-dialog',
                        width: 780,
                        resolve: {
                            courseDetail: function () {
                                return $scope.options;
                            }
                        },
                        controller: require('common/ngDirective/richEditor/previewCourseDetailDialog/controller'),
                        templateUrl: 'app/common/ngDirective/richEditor/previewCourseDetailDialog/tpl.html'
                    });
                };

                $timeout(function () {
                    //拖动
                    var draggingElement;
    
                    var afterIndex;
                    var beforeIndex;
                    var elementList;
                    var rectList;
                    var containerElement = element.find('.editor-list');
                    
        
                    var activeClass = 'active';
                    var brotherClass = 'brother';
                    var activeParentClass = 'active-parent';
                    var mainSelector = '.editor-box';
    
                    var refreshList = function () {
                        beforeIndex = afterIndex = null;
                        elementList = element.find(mainSelector);
                        rectList = rectUtil.makeRectList(elementList, containerElement);
                    };
                    refreshList();
    
                    var draggable = new Draggable({
                        mainElement: element,
                        mainSelector: mainSelector,
                        containerElement: containerElement,
                        includeSelector: ['.draggable-icon'],
                        draggingClass: 'dragging',
                        onpick: function (e, data) {
                            draggingElement = data.mainElement;
                            draggingElement.addClass(activeClass);
                            draggingElement
                            .width(
                                draggingElement.width()
                            );
    
                            var parentElement = draggingElement.closest('.editor-item');
                            parentElement
                            .addClass(activeParentClass)
                            .height(
                                parentElement.height()
                            );
                            refreshList();
                        },
                        onbeforedrag: function (e, data) {
                            beforeIndex = elementList.index(draggingElement);
                            afterIndex = null;
                        },
                        ondrag: function (e, data) {
                            var rect = {
                                left: data.left,
                                top: data.top,
                                width: rectList[beforeIndex].width,
                                height: rectList[beforeIndex].height
                            };
                            var list = rectUtil.sortByIntersectionArea(rect, rectList);
                            if ($.type(afterIndex) === 'number') {
                                elementList
                                    .eq(afterIndex)
                                    .removeClass(brotherClass);
                            }
        
                            var max = list[0].index !== beforeIndex
                                ? list[0]
                                : list[1];
                            if (max) {
                                var area = rect.width * rect.height;
                                // 随便大于一个阈值就行（比如 0.1）
                                if (area > 0 && max.area / area > 0.1) {
                                    afterIndex = max.index;
                                    elementList
                                        .eq(afterIndex)
                                        .addClass(brotherClass);
                                    return;
                                }
                            }
        
                            afterIndex = null;
                        },
                        onafterdrag: function (e, data) {
                            $rootScope.safeApply(function () {
                                var dragItem = $scope.options.editorList.splice(beforeIndex, 1);
                                $scope.options.editorList.splice(afterIndex, 0, dragItem[0]);
                                refreshList();
                                var staticStyle = {
                                    'position': 'relative',
                                    'top': 0,
                                    'left': 0
                                };
                                elementList.removeClass(brotherClass).css(staticStyle).removeAttr('style');
                            });
                        },
                        ondrop: function (e, data) {
                            draggingElement = data.mainElement;
                            draggingElement.removeClass(activeClass);
                            draggingElement
                            .width(
                                draggingElement.width()
                            );
                            var parentElement = draggingElement.closest('.editor-item');
                            parentElement
                            .removeClass(activeParentClass)
                            .height('');
                        }
                    });
                }, 0);
                
            }   
        };
    }]);
});
