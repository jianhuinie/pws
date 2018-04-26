/**
 * 富文本编辑器
 * @author niejianhui
 */
import React from 'react';
import { Modal } from 'antd';
import Dragula from 'dragula';
import PageController from 'common/controller/PageController';
import Title from './components/Title/index';
import Body from './components/Body/index';
import Photo from './components/Photo/index';
import Video from './components/Video/index';
import Audio from './components/Audio/index';
import PreviewDialog from './components/PreviewDialog/index';

require('css-loader!./index.styl');

class RichEditor extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            editorList: [],
            isUploading: false,
            showDialog: false
        };
    };
    static defaultProps = {
        panelList: ['title', 'body', 'photo', 'video', 'audio'],
        editorList: []
    }

    formatEditorList = (editorList) => {
        editorList.forEach((item, index) => {
            item.uniqueId = +new Date() + index;
        });
        return editorList;
    }
    componentDidMount() { 
        const self = this;
        if (self.props.editorList.length) {
            self.setState({
                editorList: self.formatEditorList(self.props.editorList)
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const self = this;
        if (nextProps.editorList !== self.props.editorList && nextProps.editorList.length) {
            self.setState({
                editorList: self.formatEditorList(nextProps.editorList)
            });
        }
    }

    onContentChange = (params) => {
        const tempList = JSON.parse(JSON.stringify(this.state.editorList));
        tempList[params.index] = params.curItem;
        this.setState({
            editorList: tempList
        });
        this.props.onContentChange(tempList);
    }

    doDeleleItem = (index) => {
        const tempList = JSON.parse(JSON.stringify(this.state.editorList));
        tempList.splice(index, 1);
        this.setState({
            editorList: tempList
        });
        this.props.onContentChange(tempList);
    }

    deleteItem = (index, flag) => {
        const self = this;
        if (flag) {
            Modal.confirm({
                title: '温馨提示',
                content: '您确认删除吗？',
                onOk: function () {
                    self.doDeleleItem(index);
                },
                okText: '确认',
                cancelText: '取消'
            });
        } else {
            self.doDeleleItem(index);
        }
    }

    scrollToBottom = () => {
        const $editorList = this.refs.editorList;
        setTimeout(() => { $editorList.scrollTop = $editorList.scrollHeight; }, 30);
    }
    doAddItem = (item) => {
        const tempList = JSON.parse(JSON.stringify(this.state.editorList));
        tempList.push(item);
        this.setState({
            editorList: tempList
        });
        this.props.onContentChange(tempList);
        this.scrollToBottom();
    }
    addTitle = () => {
        const titleItem = {
            uniqueId: +new Date(),
            type: 'title',
            options: {
                text: ''
            }
        };
        this.doAddItem(titleItem);
    }

    addBody = () => {
        const bodyItem = {
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
        this.doAddItem(bodyItem);
    }

    addPhoto = () => {
        const photoItem = {
            uniqueId: +new Date(),
            type: 'photo',
            options: {
                storageId: '',
                url: '',
                referUrl: ''
            }
        };
        this.doAddItem(photoItem);
    }

    addVideo = () => {
        const videoItem = {
            uniqueId: +new Date(),
            type: 'video',
            options: {
                storageId: '',
                coverUrl: ''
            }
        };
        this.doAddItem(videoItem);
    }

    addAudio = () => {
        const audioItem = {
            uniqueId: +new Date(),
            type: 'audio',
            options: {
                storageId: '',
                url: ''
            }
        };
        this.doAddItem(audioItem);
    }

    addItem = (e) => {
        const self = this;
        const type = e.currentTarget.dataset.type;
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
    }

    /**
     * 处理拖拽
     */
    handleDrag = (dragItem) => {
        const self = this;
        if (dragItem) {
            Dragula([dragItem])
                .on('drop', (el, target, source, sibling) => {
                    const curIndex = +el.dataset.index; 
                    const tempList = JSON.parse(JSON.stringify(self.state.editorList));
                    const curItem = tempList.splice(curIndex, 1)[0];
                    if (sibling) {
                        let sibIndex = +sibling.dataset.index;
                        if (curIndex < sibIndex) {
                            sibIndex--;
                        }
                        tempList.splice(sibIndex, 0, curItem);
                    } else {
                        tempList.push(curItem);
                    }
                    self.setState({
                        editorList: tempList
                    });
                    self.props.onContentChange(tempList);
                });
        }
    }

    onUploadingStatusChange = (isUploading) => {
        this.setState({ isUploading });
    }

    onExit = () => {
        this.setState({ 
            showDialog: false
        });
    }
    previewCourseDetail = () => {
        this.setState({ 
            showDialog: true
        });
    }

    render() {
        const self = this;
        const panelListMap = {
            title: '标题',
            body: '正文',
            photo: '图片',
            video: '视频',
            audio: '音频'
        };
        return (
            <div className="rich-editor">
                <div className="editor-panel">
                    {self.props.panelList.map((value) => {
                        return (
                            <div 
                                className="panel-item" 
                                key={value} 
                                data-type={value}
                                onClick={self.addItem}
                            >
                                {panelListMap[value]}
                            </div>
                        );
                    })}
                </div>

                <div className="editor-list" ref="editorList">
                    <div id="drag-container" ref={self.handleDrag}>
                        {self.state.editorList.map((item, index) => {
                            let curItem;
                            const params = {
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
                                    curItem = (
                                        <Title {...params} />
                                    );
                                    break;
                                case 'body':
                                    curItem = (
                                        <Body {...params} />
                                    );
                                    break;
                                case 'photo':
                                    curItem = (
                                        <Photo {...params} />
                                    );
                                    break;
                                case 'video':
                                    curItem = (
                                        <Video {...params} />
                                    );
                                    break;
                                case 'audio':
                                    curItem = (
                                        <Audio {...params} />
                                    );
                                    break;
                                default:
                                    break;
                            }
                            return curItem;
                        })}
                    </div>
                    <div className={'text-info' + (self.state.editorList.length > 1 ? '' : ' hide')}>长按模块前图标可以拖动排序</div>
                </div>
                {/* <div className={'outer-uploading-mask' + (self.state.isUploading ? '' : ' hide')}>正在上传，请稍候...</div> */}
                <div className={'preview-course-detail' + ((self.state.editorList.length && !self.state.isUploading) ? '' : ' hide')}>
                    <span onClick={self.previewCourseDetail}>预览课程详情</span>
                </div>
                <PreviewDialog 
                    showDialog={self.state.showDialog} 
                    onExit={self.onExit}
                    editorList={self.state.editorList}
                />
            </div>
        );
    }
};

export default RichEditor;