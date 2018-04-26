import React, { PropTypes } from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import ui from 'gsx-design/component/ui';
import Loading from 'gsx-design/component/Loading/index';
require('css-loader!./index.styl');

const MAX_SIZE = 2 * 1024 * 1024; // 最大2MB

export default class Upload extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        onUploaded: PropTypes.func.isRequired
    };
    static defaultProps = {
        children: ''
    };

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.setInput = this.setInput.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.loading = new Loading();
    }

    componentWillUnmount() {
        this.loading.destroy();
    }

    /**
     * 设置input ref
     * @param {element} input 
     */
    setInput(input) {
        this.fileInput = input;
    }
    
    /**
     * 选择文件
     */
    selectFile() {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    /**
     * 文件选择完成
     * @param {event} e 
     */
    fileChange(e) {
        const files = e.target.files;
        const file = files.length ? files[0] : null;
        if (!file) {
            return;
        }
        // if (file.size > MAX_SIZE) {
        //     ui.alert('请选择小于2MB的图片');
        //     return;
        // }
        this.loading.show();
        const fd = new FormData();
        fd.append('file', file);
        ajax.postForm(ajaxConfig.UPLOAD_IMG, fd).then((res) => {
            const { storageId, url } = res.data;
            this.props.onUploaded({
                storageId,
                url,
                name: file.name
            });
            this.loading.hide();
        });
    }

    render() {
        return (
            <div className="upload-container" onClick={this.selectFile}>
                <input 
                    ref={this.setInput} className="upload-container-input" 
                    type="file" accept="image/*" 
                    onChange={this.fileChange}
                />
                {this.props.children}
            </div>
        );
    }
}