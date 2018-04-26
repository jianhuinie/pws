/**
 * K12&留学页面表单模板
 * @file leon
 */
import React from 'react';
const SERVICE = require('common/service');
const UI = require('common/ui');
const UTIL = require('common/util');
const SlideSelect = require('common/ui/SlideSelect/index');
const observer = require('common/mvc/observer');
const ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
require('css-loader!./index.styl');

class VideoItem extends React.Component {

    constructor(props) {
        super(props);
        const urlParamsObj = UTIL.getHashParams();
        this.state = props.item;
        this.state.firstSubjects = [].concat(this.state.subjects);
        this.state.isRegister = 1;
        this.state.isGetCode = 0;
        this.state.scdSubjects = [];
        this.state.inputName = null;
        this.state.inputMobile = null;
        this.state.inputCode = null;
        this.state.type = urlParamsObj.type || 'k12';
        this.state.from = urlParamsObj.from || null;
        this.state.selectedGradeId = null;
        this.state.selectedGradeName = null;
        this.state.selectedSubjectId = null;
        this.state.selectedSubjectName = null;
        this.state.showImg = 0;
        this.state.imgUrl = null;
        this.nameChange = this.nameChange.bind(this);
        this.mobileChange = this.mobileChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.postDemand = this.postDemand.bind(this);
        this.hideImg = this.hideImg.bind(this);
        this.getVerifyCode = this.getVerifyCode.bind(this);
    }

    componentDidMount() {
        const self = this;

        SlideSelect.init({
            content: self.state.firstSubjects,
            title: '年级',
            name: 'tpl-grade', 
            containerName: 'abroad-form', 
            callback: self.selectGrade.bind(self), 
            iconName: 'icon-show-grade'
        });
    }

    getScdSubjects(obj) {
        const self = this;
        const url = '/cms-liudan/get-subject-list';
        const params = {
            subject_id: obj.id
        };

        SERVICE.post(url, params)
            .then(function (res) {
                if (+res.code === 0) {
                    self.setState({
                        scdSubjects: res.data.subject_list
                    });
                    SlideSelect.init({
                        content: self.state.scdSubjects,
                        title: '科目',
                        name: 'tpl-subject', 
                        containerName: 'abroad-form', 
                        callback: self.selectSubject.bind(self), 
                        iconName: 'icon-show-subject'
                    });
                }
            });
    }

    getVerifyCode(code) {
        const self = this;
        let verifyCodeWaiting = 60;
        const params = {
            mobile: self.state.inputMobile,
            type: 'signin'
        };

        if (code && typeof code === 'string') {
            params.captcha = code;
            params.captcha_name = 'signin';
        }

        const updateCountdown = function () {
            self.setState({
                isGetCode: 1,
                getCodeTitle: verifyCodeWaiting + '秒后可重新发送'
            });
        };

        const verifyCodeTimer = setInterval(
            function () {
                verifyCodeWaiting--;
                if (!verifyCodeWaiting) {
                    clearInterval(verifyCodeTimer);
                    self.setState({
                        isGetCode: 0,
                    });
                } else {
                    updateCountdown();
                }
            },
            1000
        );
        
        updateCountdown();

        SERVICE.post('/sms/send', params)
            .then(function (res) {
                if (+res.code === 0) {
                    console.log('ok!');
                } else if (
                    +res.code === 1000111
                    || +res.code === 110056
                    ) {
                    const imageCodeDialog = new ImageCheckCodeDialog({
                        title: '请输入图形验证码',
                        type: 'signin',
                        errorText: +res.code === '110056' ? '验证码错误，请重新输入' : ''
                    });
                    observer.addListenerOnce(imageCodeDialog, 'success', function (resCode) {
                        imageCodeDialog.hide();
                        imageCodeDialog.destroy();
                        clearInterval(verifyCodeTimer);
                        self.setState({
                            isGetCode: 0,
                        });
                        self.getVerifyCode(resCode);
                    });
                    observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
                        imageCodeDialog.hide();
                        imageCodeDialog.destroy();
                        clearInterval(verifyCodeTimer);
                    });
                    imageCodeDialog.show();
                    clearInterval(verifyCodeTimer);
                    self.setState({
                        isGetCode: 0,
                    });
                }
            });
    }

    selectGrade(obj) {
        const self = this;

        self.setState({
            selectedGradeId: obj.id,
            selectedGradeName: obj.name,
            selectedSubjectId: null,
            selectedSubjectName: null
        });
        $('.tpl-subject').unbind();
        self.getScdSubjects(obj);
    }

    selectSubject(obj) {
        const self = this;

        self.setState({
            selectedSubjectId: obj.id,
            selectedSubjectName: obj.name
        });
    }

    clearSubject() {
        const self = this;

        self.setState({
            selectedGradeId: null,
            selectedGradeName: null,
            selectedSubjectId: null,
            selectedSubjectName: null
        });
    }

    initCustomInfo() {
        const self = this;

        self.setState({
            inputName: null,
            inputMobile: null,
            inputCode: null,
            isRegister: 1
        });

        self.clearSubject();
    }

    nameChange(event) {
        const self = this;

        self.setState({
            inputName: event.target.value
        });
    }

    checkMobileExist(mobile) {
        const self = this;
        const reg = /^1\d{10}$/;

        if (mobile && reg.test(mobile)) {
            const params = {
                mobile: mobile
            };

            SERVICE.post('/auth/check_mobile_ajax', params)
                .then(function (res) {
                    if (+res.code === 0) {
                        const isRegister = res && res.data && res.data.exist;
                        self.setState({
                            isRegister: isRegister
                        });
                    }
                });
        } else {
            self.setState({
                isRegister: 1
            });
        }
    }

    mobileChange(event) {
        const self = this;
        let val = event.target.value;

        if (!(+val)) {
            val = null;
        } else if (val.length === 11) {
            self.checkMobileExist(val);
        } else if (val.length > 11) {
            val = val.substr(0, 11);
        }

        self.setState({
            inputMobile: val,
            isRegister: 1
        });
    }

    codeChange(event) {
        const self = this;

        self.setState({
            inputCode: event.target.value
        });
    }
    
    postDemand() {
        const self = this;
        const name = $.trim(self.state.inputName);
        const mobile = $.trim(self.state.inputMobile);
        const gradeId = self.state.selectedGradeId;
        const subjectName = self.state.selectedSubjectName;
        
        if (!name) {
            UI.remind('请输入姓名！');
            return;
        }

        if (!gradeId) {
            UI.remind('请选择年级！');
            return;
        }

        if (!subjectName) {
            UI.remind('请选择科目！');
            return;
        }

        if (!mobile) {
            UI.remind('请输入手机号！');
            return;
        }

        const url = '/cms-liudan/submit';
        const params = {
            user_name: name,
            course_name: subjectName,
            mobile: mobile,
            from: self.state.from,
            tpl_type: self.state.type
        };

        if (!self.isRegister) {
            params.sms_code = self.state.inputCode;
        }

        SERVICE.post(url, params)
            .then(function (res) {
                if (+res.code === 0) {
                    self.initCustomInfo();
                    if (res.data && res.data.img_url) {
                        self.setState({
                            showImg: 1,
                            imgUrl: res.data.img_url
                        });
                    }
                }
            });
    }

    hideImg() {
        const self = this;

        self.setState({
            showImg: 0,
            imgUrl: null
        });
    }

    render() {
        const self = this;
        const inputName = self.state.inputName || '';
        const inputMobile = self.state.inputMobile || '';
        const inputCode = self.state.inputCode || '';
        const selectedGrade = self.state.selectedGradeName || '请选择年级';
        const selectedSubject = self.state.selectedSubjectName || '请选择科目';

        return (
            <div className="form-item">
                <div className="big-title">{self.state.title}</div>
                <div className="small-title">{self.state.sub_title}</div>
                <div className="abroad-form">
                    <input 
                        className="input-border name" value={inputName} type="text" required="required" maxLength="30" placeholder="请输入您的姓名"
                        onChange={self.nameChange}
                    />
                    <div className="abroad-select">
                        <div className="input-border select-subject abroad-grade">
                            <div className={self.state.selectedGradeName ? 'tpl-grade' : 'tpl-grade uninput'}>{selectedGrade}</div>
                            <i className="icon-show-grade icon-caret-down2"></i>
                        </div>
                        <div className="input-border select-subject abroad-subject">
                            <div className={self.state.selectedSubjectName ? 'tpl-subject' : 'tpl-subject uninput'}>{selectedSubject}</div>
                            <i className="icon-show-subject icon-caret-down2"></i>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <input 
                        className="input-border mobile" value={inputMobile} type="number" required="required" maxLength="20" placeholder="请输入您的手机号码"
                        onChange={self.mobileChange}
                    />
                    <div className={self.state.isRegister ? 'input-border code-block hide' : 'input-border code-block'}>
                        <input 
                            className="input-border code" type="text" maxLength="6" placeholder="输入短信验证码" 
                            value={inputCode} onChange={self.codeChange}
                        />
                        <div className={self.state.isGetCode ? 'get-code hide' : 'get-code'} onClick={self.getVerifyCode}>获取验证码</div> 
                        <div className={self.state.isGetCode ? 'get-code sending-code' : 'get-code sending-code hide'}>{self.state.getCodeTitle}</div> 
                    </div>
                    <div className="post-btn abroad-post" onClick={self.postDemand}>
                        立即预约
                    </div>
                </div>
                <div className={self.state.showImg ? 'mask-container' : 'mask-container hide'}>
                    <div className="success-dialog">
                        <img 
                            src={self.state.imgUrl} alt="" className="q-card" />
                        <span className="icon icon-close" onClick={self.hideImg}></span>
                    </div>
                </div>
            </div>
        );
    }
}
export default VideoItem;