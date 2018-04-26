import React from 'react';
import Upload from 'common/components/Upload/index';
import PageController from 'common/controller/PageController';

export default class UploadLicense extends PageController {
    
    render() {
        const props = this.props;
        return (
            <div className="apply-authen-upload">
                <div className="title">上传营业执照扫描件</div>
                <div className="upload-area">
                    <Upload onUploaded={this.props.onUploaded}>
                        {
                            props.storageId
                                ? 
                                <img className="upload-content-org" src={props.url} />
                                :
                                <div className="upload-content upload-content-org">
                                    <div className="icon-upload-org" />
                                    <div className="upload-content-tip">点击上传图片</div>
                                </div>
                        }
                    </Upload>
                    <div className="desc">
                        <div className="desc-item">
                            <span>*</span>
                            请上传清晰彩色扫描件或者数码照片
                        </div>
                        <div className="desc-item">
                            <span>*</span>
                            仅支持JPG、JPEG、PNG格式
                        </div>
                        <div className="desc-item">
                            <span>*</span>
                            最大不超过2M
                        </div>
                    </div>
                </div>
                <div className="apply-authen-upload-example">
                    参考示例：请仔细检查照片要求，提高认证通过率
                    <img className="example" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4c948fef465.png" />
                </div>
            </div>
        );
    }
}
