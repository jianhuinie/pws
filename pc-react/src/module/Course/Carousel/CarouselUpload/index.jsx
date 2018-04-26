/**
 * 轮播图的上传图片
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React, { PropTypes } from 'react';
import { Upload, message } from 'antd';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

export default class CarouselUpload extends PageController {

    static propTypes = {
        url: PropTypes.string,
        onUpload: PropTypes.func,
        storageId: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            url: props.url
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
                url: nextProps.url,
                storageId: nextProps.storageId
            });
        }
    }
 
    /**
     * 处理图片上传
     */
    handleChange = (info) => {
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
                break;
            }
            case 'error':
                message.error(uploadedFile.error || '网络故障，请稍后重试');
                break;
        }
    }

    /**
     * 图片上传前的处理
     */
    beforeUpload = (file) => {
        // 图片最大尺寸
        const MAX_SIZE = 5 * 1024 * 1024;
        if (Number(file.size) > MAX_SIZE) {
            message.warning('请选择大小在5M以内的图片', 3);
            return false;
        }
        return true;
    }

    /**
     * @override
     */
    render() {
        const uploadButton = (
            <div className="carousel-upload-button">
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4c8b62712ee.png" className="carousel-upload-button-image" />
                <div className="carousel-upload-button-text">上传图片尺寸750*422</div>
            </div>
        );
        const imageUrl = this.state.url;
        return (
            <Upload
                listType="picture-card"
                className="carousel-upload"
                showUploadList={false}
                action="/pc/image/upload"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="" className="carousel-upload-image" /> : uploadButton}
            </Upload>
        );
    }
}