import React from 'react';
import { Upload, Button, message } from 'antd';
import CommonController from 'common/controller/CommonController';
require('css-loader!./index.styl');

export default class ImageUpload extends CommonController {

    static defaultProps = {
        tip: '建议尺寸100X100px，小于2M',
        size: 1,
        storageId: undefined,
        url: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            fileList: this.getFileListByProps(props)
        };
    }

    /**
     * @override
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const me = this;
        if (nextProps.storageId && nextProps.storageId !== me.props.storageId) {
            me.setState({
                fileList: me.getFileListByProps(nextProps)
            });
        }
    }

    /**
     * 处理从props获取的数据
     * @param props 
     */
    getFileListByProps(props) {
        return props.storageId ? [{
            uid: props.storageId,
            name: `${props.storageId}`,
            size: 0,
            status: 'done',
            url: `${props.url}`
        }] : [];
    }

    /**
     * 图片上传前的处理
     * @param {File} file 
     */
    hanldePrepareUpload = (file) => {
        const me = this;
        // 图片最大尺寸
        const MAX_SIZE = me.props.size * 1024 * 1024;
        if (Number(file.size) > MAX_SIZE) {
            message.warning(`请选择大小在${me.props.size}M以内的图片`, 3);
            return false;
        }
        return true;
    }

    /**
     * 处理图片上传
     * @param {*} info 
     */
    handleChangeUpload = (info) => {
        const me = this;
        const uploadedFile = info.file;
        switch (uploadedFile.status) {
            case 'done': {
                const res = uploadedFile.response;
                if (res.code === 200) {
                    const data = res.data;
                    uploadedFile.uid = data.storageId;
                    uploadedFile.name = `${data.storageId}`;
                    uploadedFile.url = data.url;
                    me.props.onUpload(uploadedFile);
                } else {
                    message.error(res.msg);
                }
                me.setState({
                    fileList: [uploadedFile]
                });
                break;
            }
            case 'uploading': {
                me.setState({
                    fileList: [uploadedFile]
                });
                break;
            }
            case 'error':
                message.error(uploadedFile.error || '网络故障，请稍后重试');
                break;
        }
    }

    /**
     * 
     */
    showUploadList() {
        return {
            showRemoveIcon: false,
            showPreviewIcon: false
        };
    }
    
    /**
     * @override
     */
    render() {
        const me = this;
        return (
            <div className="image-upload">
                <Upload 
                    action="/pc/image/upload"
                    showUploadList={me.showUploadList()}
                    listType="picture-card"
                    accept="image/png, image/jpeg, image/jpg"
                    fileList={me.state.fileList}
                    beforeUpload={me.hanldePrepareUpload}
                    onChange={me.handleChangeUpload}
                >
                    <Button className="image-upload-btn">选择文件</Button>
                </Upload>
                <div className="image-upload-tip">{me.props.tip}</div>
            </div>
        );
    }
}
