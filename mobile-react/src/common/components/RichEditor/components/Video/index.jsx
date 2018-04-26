/**
 * 富文本编辑器 video
 * @author niejianhui
 */
import React from 'react';
import { Upload, message, Spin } from 'antd';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class Video extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            disabled: false,
            coverUrl: '',
            storageId: ''
        };
    };
    // 挂载
    componentDidMount() {
        const self = this;
        if (self.props.options.storageId) {
            const { coverUrl, storageId } = self.props.options;
            self.setState({
                coverUrl,
                storageId
            });
        }
    }
    

    beforeUpload = (file) => {
        // TODO
    }

    onContentChange = (obj) => {
        const self = this;
        self.props.onContentChange({
            index: self.props.index,
            curItem: {
                uniqueId: self.props.uniqueId,
                type: 'video',
                options: obj
            }
        });
    }


    handleChange = (res) => {
        const self = this;
        const status = res.file.status;
        if (status === 'uploading') {
            const disabled = true;
            const loading = true;
            self.setState({ loading, disabled });
            self.props.onUploadingStatusChange(true);
        }

        if (status === 'done') {
            self.setState({ loading: false, disabled: false });
            self.props.onUploadingStatusChange(false);
            if (res.file.response.code === 0) {
                const data = res.file.response.data;
                self.setState({
                    storageId: data.fid,
                    coverUrl: data.coverUrl
                });
                const obj = {
                    storageId: data.fid,
                    coverUrl: data.coverUrl
                };
                self.onContentChange(obj);
            } else {
                message.error(res.file.response.msg);
            }
        }
    }

    onDeleteItem = (e) => {
        let flag = false;
        if (this.state.storageId) {
            flag = true;
        }
        this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
    }

    render() {
        const self = this;
        const { coverUrl, storageId, loading, disabled } = self.state;

        return (
            <div className="editor-item editor-video" data-index={self.props.index}>
                <i className="icon icon-item icon-live-o"></i>
                <Upload
                    className="media-uploader"
                    showUploadList={false}
                    action="/base/uploadVideo.do"
                    beforeUpload={self.beforeUpload}
                    onChange={self.handleChange}
                    disabled={disabled}
                    accept="video/*"
                >
                    <Spin
                        spinning={loading}
                    >
                        {
                            storageId ? 
                                (<div className="photo-item"><img src={coverUrl} alt="" /><span className="video-icon"></span></div>)
                                : 
                                (<div className="media-uploader-trigger"><i className="icon-ic_add" /> 上传视频</div>)
                        }
                    </Spin>
                </Upload>
                <span 
                    className="icon-close" 
                    data-index={self.props.index} 
                    onClick={self.onDeleteItem}
                >
                </span>
                <div className={'uploading-mask' + (loading ? '' : ' hide')}>上传中...请勿拖动排序</div>
            </div>
        );
    }
};

export default Video;