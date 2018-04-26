import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import Upload from 'common/components/Upload/index';
import ui from 'gsx-design/component/ui';
import PageController from 'common/controller/PageController';
import stringService from 'common/util/stringService';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class Modify extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            headUrl: '',
            name: '',
            intro: '',
            headStorageId: null,
            submiting: false,
            nameValid: false,
        };
    }

    componentDidMount() {
        document.title = '课堂基本信息';
        ajax.get(ajaxConfig.CLASSROOM.GET_ROOM_BASE).then((res) => {
            this.setState({
                ...res.data,
                nameValid: stringService.getCharacterLength(res.data.name) >= 8
            });
        });
        Util.sharePage();
    }

    /**
     * 课堂名称变化
     * @param {event} e 
     */
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    /**
     * 课堂简介变化
     * @param {event} e 
     */
    handleIntroChange = (e) => {
        this.setState({
            intro: e.target.value
        });
    }

    /**
     * 课堂头像变化
     * @param {object} file
     */
    handleUploaded = (file) => {
        this.setState({
            headUrl: file.url,
            headStorageId: file.storageId
        });
    }

    /**
     * 提交
     */
    submit = () => {
        const { headStorageId, name, intro } = this.state;
        const length = stringService.getCharacterLength(name);
        if (length > 24 || length < 8) {
            ui.alert('课堂名称为4-12个字');
            return;
        }
        this.setState({
            submiting: true
        });
        ajax.post(ajaxConfig.CLASSROOM.UPDATE_ROOM_BASE, {
            headStorageId,
            name,
            intro
        }).then((res) => {
            const { status } = res.data;
            if (status) {
                ui.alert('修改成功').done(() => {
                    location.replace('/mweb/teacher/manager/center');
                });
            }
        }, () => {
            this.setState({
                submiting: false
            });
        });
    }

    render() {
        return (
            <div className="classroom-basic">
                <div className="classroom-basic-title">课堂基本信息</div>
                <div className="classroom-basic-portrait">
                    <Upload onUploaded={this.handleUploaded}>
                        <img className="portrait" src={this.state.headUrl} />
                        <div className="upload">点击上传课堂头像</div>
                    </Upload>
                    <div className="des">建议尺寸 100px*100px 大小不超过2M</div>
                </div>
                <div className="classroom-basic-title">课堂名称（必填，4-12个字）</div>
                <div className="classroom-basic-name">
                    <input
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        placeholder="请填写课堂名称"
                    />
                </div>
                <div className="classroom-basic-title">课堂介绍（选填）</div>
                <div className="classroom-basic-dec">
                    <textarea 
                        value={this.state.intro}
                        onChange={this.handleIntroChange}
                        className="text" 
                        placeholder="请填写课堂介绍" 
                    />
                </div>
                <button
                    onClick={this.submit}
                    disabled={!this.state.nameValid || this.state.submiting}
                    className="ws-btn-red classroom-basic-next"
                >
                    {this.state.submiting ? '提交中' : '确定'}
                </button>
            </div>
        );
    }
};
