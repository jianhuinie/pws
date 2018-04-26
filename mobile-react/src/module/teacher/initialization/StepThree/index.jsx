import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import Upload from 'common/components/Upload/index';
import ui from 'gsx-design/component/ui';
// import stringService from 'common/util/stringService';
import PageController from 'common/controller/PageController';
import Avatar from 'module/components/Avatar/index';
import WxContext from 'common/util/wxContext';
import Loading from 'gsx-design/component/Loading/index';
// import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class StepTwo extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            headUrl: '',
            name: '',
            intro: '',
            headStorageId: null,
            submiting: false
        };
        this._hackIos();
        this.loading = new Loading();
        this.loading.show();
    }

    componentDidMount() {
        document.title = '课堂基本信息';
        ajax.get(ajaxConfig.USER.GET_USER).then((res) => {
            const { isTeacher } = res.data.user;
            // const { classId } = res.data.classroom;
            const classId = res.data.classroom && res.data.classroom.classId;
            this.loading.hide();
            if (isTeacher) {
                location.replace(`/mweb/classroom?id=${classId}`);
            } else {
                this.getClassBasic();
            }
        });
        // Util.sharePage();
    }

    getClassBasic = () => {
        ajax.get(ajaxConfig.CLASSROOM.GET_ROOM_BASE).then((res) => {
            this.setState({
                headUrl: res.data.headUrl,
                name: res.data.name,
                intro: res.data.intro,
            });
        });
    }

    /**
     * 解决ios在返回上一页面时，页面不自动刷新的问题
     */
    _hackIos() {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }


    /**
     * 课堂名称变化
     * @param {event} e 
     */
    handleNameChange = (e) => {
        const self = this;
        const name = e.target.value;
        // console.log(name.length);
        self.setState({ name });
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
        // const length = stringService.getCharacterLength(name);
        const length = name.length;
        if (length > 20 || length < 3) {
            ui.alert('课堂名称为3-20个字');
            return;
        }
        this.setState({
            submiting: true
        });
        ajax.post(ajaxConfig.CLASSROOM.CREATE_ROOM, {
            headStorageId,
            name,
            intro
        }).then((res) => {
            const { classId } = res.data;
            new WxContext()
                .wxPay(ajaxConfig.CLASSROOM.PAY_CREATE_ROOM, {}, () => {
                    this.paySuccess(classId);
                }, this.payCancel);
        }, () => {
            this.setState({
                submiting: false
            });
        });
    }

    paySuccess = (classId) => {
        ajax.post('/m/classroom/createPart2').then(() => {
            ui.alert('创建成功').done(() => {
                location.href = `/mweb/classroom?id=${classId}`;
            });
        }); 
    }

    payCancel = () => {
        this.setState({
            submiting: false
        });
    }

    render() {
        return (
            <div className="classroom-basic">
                <div className="classroom-basic-title">课堂基本信息</div>
                <div className="classroom-basic-portrait">
                    <Upload onUploaded={this.handleUploaded}>
                        <Avatar 
                            // avatarSize={76} 
                            className="portrait" 
                            src={this.state.headUrl} 
                        />
                        <div className="upload">点击上传课堂头像</div>
                    </Upload>
                    <div className="des">建议尺寸 100px*100px 大小不超过2M</div>
                </div>
                <div className="classroom-basic-title">课堂名称（必填，3-20个字）</div>
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
                    disabled={this.state.submiting}
                    className="ws-btn-red classroom-basic-next"
                >
                    {this.state.submiting ? '提交中' : '立即支付 ￥0.01'}
                </button>
                <div className="classroom-basic-tip">提示：本次创建所支付的0.01元会返现至个人账户余额</div>
            </div>
        );
    }
};
