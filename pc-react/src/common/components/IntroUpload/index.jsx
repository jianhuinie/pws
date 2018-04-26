import React from 'react';
import { Upload, Button, message } from 'antd';
import CommonController from 'common/controller/CommonController';
require('css-loader!./index.styl');

export default class IntroUpload extends CommonController {

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
                    me.props.onUpload(me.props.type, uploadedFile);
                } else {
                    message.error(res.msg);
                }
                break;
            }
            case 'error':
                message.error(uploadedFile.error || '网络故障，请稍后重试');
                break;
        }
    }
    
    /**
     * @override
     */
    render() {
        const me = this;
        return (
            <div className="intro-upload">
                <Upload 
                    action="/pc/image/upload"
                    showUploadList={false}
                    listType="picture-card"
                    accept="image/png, image/jpeg, image/jpg"
                    beforeUpload={me.hanldePrepareUpload}
                    onChange={me.handleChangeUpload}
                >
                    <Button className="intro-upload-btn"><span className="icon-img"></span>选择图片</Button>
                </Upload>
            </div>
        );
    }
}
