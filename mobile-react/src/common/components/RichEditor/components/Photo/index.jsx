/**
 * 富文本编辑器 photo
 * @author niejianhui
 */
import React from 'react';
import { Upload, message, Spin } from 'antd';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class Photo extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            disabled: false,
            url: '',
            storageId: '',
            referUrl: ''
        };
    };
    // 挂载
    componentDidMount() {
        const self = this;
        if (self.props.options.url) {
            const { url, storageId } = self.props.options;
            self.setState({
                url: url,
                storageId: storageId,
                referUrl: self.props.options.referUrl || ''
            });
        }
    }
    

    beforeUpload = (file) => {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
        if (!isJPG) {
            message.error('图片类型只能是JPG 或 PNG ');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        }
        return isJPG && isLt2M;
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    onTextChange = (e) => {
        const newVal = e.target.value;
        const self = this;
        self.setState({
            referUrl: newVal
        });
        const obj = {
            referUrl: newVal,
            storageId: self.state.storageId,
            url: self.state.url
        };
        self.onContentChange(obj);
    }

    onContentChange = (obj) => {
        const self = this;
        self.props.onContentChange({
            index: self.props.index,
            curItem: {
                uniqueId: self.props.uniqueId,
                type: 'photo',
                options: obj
            }
        });
    }

    onDeleteItem = (e) => {
        let flag = false;
        if (this.state.storageId || this.state.referUrl) {
            flag = true;
        }
        this.props.onDeleteItem(+e.currentTarget.dataset.index, flag);
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
                    url: data.url
                });
                const obj = {
                    referUrl: self.state.referUrl,
                    storageId: data.fid,
                    url: data.url
                };
                self.onContentChange(obj);
            } else {
                message.error(res.file.response.msg);
            }
            // self.getBase64(
            //     res.file.originFileObj,
            //     url => self.setState({ url })
            // );
        }
    }

    render() {
        const self = this;
        const { url, storageId, referUrl, loading, disabled } = self.state;

        return (
            <div className="editor-item editor-photo" data-index={self.props.index}>
                <i className="icon icon-item icon-image2"></i>
                <Upload
                    className="media-uploader"
                    showUploadList={false}
                    action="/base/uploadImg.do"
                    beforeUpload={self.beforeUpload}
                    onChange={self.handleChange}
                    disabled={disabled}
                    accept="image/*"
                >
                    <Spin
                        spinning={loading}
                    >
                        {
                            storageId ? 
                                (<div className="photo-item"><img src={url} alt="" /></div>)
                                : 
                                (<div className="media-uploader-trigger"><i className="icon-ic_add" /> 上传图片</div>)
                        }
                    </Spin>
                </Upload>
                <span 
                    className="icon-close" 
                    data-index={self.props.index} 
                    onClick={self.onDeleteItem}
                >
                </span>
                <div className="skip-url">
                    转向链接：
                    <input 
                        value={referUrl}
                        placeholder="请输入图片跳转链接，必须是跟谁学的链接" 
                        onChange={self.onTextChange} />
                    &nbsp;&nbsp;(可选)
                </div>
                <div className={'uploading-mask' + (loading ? '' : ' hide')}>上传中...请勿拖动排序</div>
            </div>
        );
    }
};

export default Photo;