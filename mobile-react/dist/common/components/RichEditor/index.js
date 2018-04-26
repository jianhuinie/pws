define(function (require, exports) {
    'use strict';
    var _react = require('react');
    var _antd = require('antd');
    var _dragula = require('dragula');
    var _PageController2 = require('common/controller/PageController');
    var _index = require('./components/Title/index');
    var _index3 = require('./components/Body/index');
    var _index5 = require('./components/Photo/index');
    var _index7 = require('./components/Video/index');
    var _index9 = require('./components/Audio/index');
    var _index11 = require('./components/PreviewDialog/index');
    (require('css-loader!./index.styl'))
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = _interopRequireDefault(_react);
    var _dragula2 = _interopRequireDefault(_dragula);
    var _PageController3 = _interopRequireDefault(_PageController2);
    var _index2 = _interopRequireDefault(_index);
    var _index4 = _interopRequireDefault(_index3);
    var _index6 = _interopRequireDefault(_index5);
    var _index8 = _interopRequireDefault(_index7);
    var _index10 = _interopRequireDefault(_index9);
    var _index12 = _interopRequireDefault(_index11);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var RichEditor = function (_PageController) {
        _inherits(RichEditor, _PageController);
        function RichEditor(props) {
            _classCallCheck(this, RichEditor);
            var _this = _possibleConstructorReturn(this, (RichEditor.__proto__ || Object.getPrototypeOf(RichEditor)).call(this, props));
            _this.formatEditorList = function (editorList) {
                editorList.forEach(function (item, index) {
                    item.uniqueId = +new Date() + index;
                });
                return editorList;
            };
            _this.onContentChange = function (params) {
                var tempList = JSON.parse(JSON.stringify(_this.state.editorList));
                tempList[params.index] = params.curItem;
                _this.setState({ editorList: tempList });
                _this.props.onContentChange(tempList);
            };
            _this.doDeleleItem = function (index) {
                var tempList = JSON.parse(JSON.stringify(_this.state.editorList));
                tempList.splice(index, 1);
                _this.setState({ editorList: tempList });
                _this.props.onContentChange(tempList);
            };
            _this.deleteItem = function (index, flag) {
                var self = _this;
                if (flag) {
                    _antd.Modal.confirm({
                        title: '温馨提示',
                        content: '您确认删除吗\uFF1F',
                        onOk: function onOk() {
                            self.doDeleleItem(index);
                        },
                        okText: '确认',
                        cancelText: '取消'
                    });
                } else {
                    self.doDeleleItem(index);
                }
            };
            _this.scrollToBottom = function () {
                var $editorList = _this.refs.editorList;
                setTimeout(function () {
                    $editorList.scrollTop = $editorList.scrollHeight;
                }, 30);
            };
            _this.doAddItem = function (item) {
                var tempList = JSON.parse(JSON.stringify(_this.state.editorList));
                tempList.push(item);
                _this.setState({ editorList: tempList });
                _this.props.onContentChange(tempList);
                _this.scrollToBottom();
            };
            _this.addTitle = function () {
                var titleItem = {
                    uniqueId: +new Date(),
                    type: 'title',
                    options: { text: '' }
                };
                _this.doAddItem(titleItem);
            };
            _this.addBody = function () {
                var bodyItem = {
                    uniqueId: +new Date(),
                    type: 'body',
                    options: {
                        text: '',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        textAlign: 'left',
                        color: '#000000'
                    }
                };
                _this.doAddItem(bodyItem);
            };
            _this.addPhoto = function () {
                var photoItem = {
                    uniqueId: +new Date(),
                    type: 'photo',
                    options: {
                        storageId: '',
                        url: '',
                        referUrl: ''
                    }
                };
                _this.doAddItem(photoItem);
            };
            _this.addVideo = function () {
                var videoItem = {
                    uniqueId: +new Date(),
                    type: 'video',
                    options: {
                        storageId: '',
                        coverUrl: ''
                    }
                };
                _this.doAddItem(videoItem);
            };
            _this.addAudio = function () {
                var audioItem = {
                    uniqueId: +new Date(),
                    type: 'audio',
                    options: {
                        storageId: '',
                        url: ''
                    }
                };
                _this.doAddItem(audioItem);
            };
            _this.addItem = function (e) {
                var self = _this;
                var type = e.currentTarget.dataset.type;
                switch (type) {
                case 'title':
                    self.addTitle();
                    break;
                case 'body':
                    self.addBody();
                    break;
                case 'photo':
                    self.addPhoto();
                    break;
                case 'video':
                    self.addVideo();
                    break;
                case 'audio':
                    self.addAudio();
                    break;
                }
            };
            _this.handleDrag = function (dragItem) {
                var self = _this;
                if (dragItem) {
                    (0, _dragula2.default)([dragItem]).on('drop', function (el, target, source, sibling) {
                        var curIndex = +el.dataset.index;
                        var tempList = JSON.parse(JSON.stringify(self.state.editorList));
                        var curItem = tempList.splice(curIndex, 1)[0];
                        if (sibling) {
                            var sibIndex = +sibling.dataset.index;
                            if (curIndex < sibIndex) {
                                sibIndex--;
                            }
                            tempList.splice(sibIndex, 0, curItem);
                        } else {
                            tempList.push(curItem);
                        }
                        self.setState({ editorList: tempList });
                        self.props.onContentChange(tempList);
                    });
                }
            };
            _this.onUploadingStatusChange = function (isUploading) {
                _this.setState({ isUploading: isUploading });
            };
            _this.onExit = function () {
                _this.setState({ showDialog: false });
            };
            _this.previewCourseDetail = function () {
                _this.setState({ showDialog: true });
            };
            _this.state = {
                editorList: [],
                isUploading: false,
                showDialog: false
            };
            return _this;
        }
        _createClass(RichEditor, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var self = this;
                    if (self.props.editorList.length) {
                        self.setState({ editorList: self.formatEditorList(self.props.editorList) });
                    }
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var self = this;
                    if (nextProps.editorList !== self.props.editorList && nextProps.editorList.length) {
                        self.setState({ editorList: self.formatEditorList(nextProps.editorList) });
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var self = this;
                    var panelListMap = {
                        title: '标题',
                        body: '正文',
                        photo: '图片',
                        video: '视频',
                        audio: '音频'
                    };
                    return _react2.default.createElement('div', { className: 'rich-editor' }, _react2.default.createElement('div', { className: 'editor-panel' }, self.props.panelList.map(function (value) {
                        return _react2.default.createElement('div', {
                            className: 'panel-item',
                            key: value,
                            'data-type': value,
                            onClick: self.addItem
                        }, panelListMap[value]);
                    })), _react2.default.createElement('div', {
                        className: 'editor-list',
                        ref: 'editorList'
                    }, _react2.default.createElement('div', {
                        id: 'drag-container',
                        ref: self.handleDrag
                    }, self.state.editorList.map(function (item, index) {
                        var curItem = void 0;
                        var params = {
                            key: item.uniqueId,
                            uniqueId: item.uniqueId,
                            index: index,
                            options: item.options,
                            onContentChange: self.onContentChange,
                            onDeleteItem: self.deleteItem,
                            onUploadingStatusChange: self.onUploadingStatusChange
                        };
                        switch (item.type) {
                        case 'title':
                            curItem = _react2.default.createElement(_index2.default, params);
                            break;
                        case 'body':
                            curItem = _react2.default.createElement(_index4.default, params);
                            break;
                        case 'photo':
                            curItem = _react2.default.createElement(_index6.default, params);
                            break;
                        case 'video':
                            curItem = _react2.default.createElement(_index8.default, params);
                            break;
                        case 'audio':
                            curItem = _react2.default.createElement(_index10.default, params);
                            break;
                        default:
                            break;
                        }
                        return curItem;
                    })), _react2.default.createElement('div', { className: 'text-info' + (self.state.editorList.length > 1 ? '' : ' hide') }, '长按模块前图标可以拖动排序')), _react2.default.createElement('div', { className: 'preview-course-detail' + (self.state.editorList.length && !self.state.isUploading ? '' : ' hide') }, _react2.default.createElement('span', { onClick: self.previewCourseDetail }, '预览课程详情')), _react2.default.createElement(_index12.default, {
                        showDialog: self.state.showDialog,
                        onExit: self.onExit,
                        editorList: self.state.editorList
                    }));
                }
            }
        ]);
        return RichEditor;
    }(_PageController3.default);
    RichEditor.defaultProps = {
        panelList: [
            'title',
            'body',
            'photo',
            'video',
            'audio'
        ],
        editorList: []
    };
    ;
    exports.default = RichEditor;
});