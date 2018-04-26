import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import ui from 'gsx-design/component/ui';
import Avatar from 'module/components/Avatar/index';
import Upload from 'common/components/Upload/index';
import stringService from 'common/util/stringService';
import Util from 'common/util/util';

require('css-loader!./index.styl');

export default class BasicModify extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            intro: '',
            avatarStorageId: null,
            avatarUrl: '',
            submiting: false
        };
    }

    /**
     * 头像上传完毕
     * @param {object} file 
     */
    handleUploaded = (file) => {
        this.setState({
            avatarUrl: file.url,
            avatarStorageId: file.storageId
        });
    }

    componentDidMount() {
        document.title = '编辑个人信息';
        this.getStudentInfo();
        Util.sharePage();
    }

    /**
     * 获取学生信息
     */
    getStudentInfo = () => {
        ajax.get(ajaxConfig.USER.GET_STUDENT_INFO).then((res) => {
            const { nickName, intro, avatarUrl } = res.data;
            this.setState({
                nickName,
                intro,
                avatarUrl
            });
        });
    }

    /**
     * 修改昵称
     * @param {event} e 
     */
    handleNameChange = (e) => {
        const value = e.target.value;
        if (stringService.getCharacterLength(value) <= 32) {
            this.setState({
                nickName: value
            });
        }
    }

    /**
     * 修改介绍
     * @param {event} e 
     */
    handleIntroChange = (e) => {
        const value = e.target.value;
        if (stringService.getCharacterLength(value) <= 100) {
            this.setState({
                intro: value
            });
        }
    }

    /**
     * 提交
     */
    submit = () => {
        this.setState({
            submiting: true
        });
        const {
            nickName,
            avatarStorageId,
            intro
        } = this.state;
        ajax.post(ajaxConfig.USER.UPDATE_STUDENT_INFO, {
            nickName,
            avatarStorageId,
            intro
        }).then(() => {
            ui.alert('修改成功').done(() => {
                location.replace('/mweb/student/home');
            });
        }, () => {
            this.setState({
                submiting: false
            });
        });
    }

    render() {
        return (
            <div className="basic-modify">
                <div className="basic-modify-item avatar">
                    <div className="title">头像</div>
                    <Upload onUploaded={this.handleUploaded}>
                        <Avatar 
                            // avatarSize={38} 
                            src={this.state.avatarUrl} 
                        />
                    </Upload>
                </div>
                <div className="basic-modify-item">
                    <div className="title">昵称</div>
                    <input onChange={this.handleNameChange} className="nickName" value={this.state.nickName} /> 
                </div>
                {/* <div className="basic-modify-desc">我的介绍（将显示在课程介绍的页面）</div> */}
                {/* <div className="basic-modify-textarea">
                    <textarea
                        value={this.state.intro}
                        onChange={this.handleIntroChange}
                        className="desc"
                        placeholder="请输入我的介绍，最多可输入50个汉字"
                    />
                </div> */}
                <div className="basic-modify-submit">
                    <button 
                        onClick={this.submit}
                        disabled={!this.state.nickName || this.state.submiting} 
                        className="ws-btn-red"
                    >
                        { this.state.submiting ? '提交中' : '保存' }
                    </button>
                </div>
            </div>
        );
    }
}