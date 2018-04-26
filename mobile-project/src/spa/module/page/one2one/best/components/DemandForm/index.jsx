/**
 * 一对一首页需求填写表单
 */

import React from 'react';
const service = require('common/service');
import CONFIG from 'spa/module/page/one2one/best/studentEnter/detail/config';
const uiNew = require('common/ui');
const observer = require('common/mvc/observer');
const app = require('common/app');
const ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
import AutoSearchSubject from 'spa/module/page/one2one/best/components/AutoSearchSubject/index';
require('css-loader!./index.styl');

class DemandForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegister: 1,
            subjectId: null,
            subjectName: null,
            inputName: null,
            inputMobile: null,
            getCodeTitle: '',
            isGetCode: 0,
            isPost: 0
        };
        this.checkMobile = this.checkMobile.bind(this);
        this.choosedSubject = this.choosedSubject.bind(this);
        this.getVerifyCode = this.getVerifyCode.bind(this);
        this.postForm = this.postForm.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.mobileChange = this.mobileChange.bind(this);
        this.getOrangeBorder = this.getOrangeBorder.bind(this);
        this.removeOrangeBorder = this.removeOrangeBorder.bind(this);
    }

    componentDidMount() {
        this.initCustomInfo();
    }

    getOrangeBorder(e) {
        $(e.target).removeClass('gray');
        $(e.target).parent().removeClass('gray').addClass('orange');
    }

    getVerifyCode(code) {
        const self = this;
        let verifyCodeWaiting = 60;
        const params = {
            mobile: $.trim(self.refs.myMobile.value),
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

        service.post(CONFIG.PATHS.SENDSMS, params)
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

    removeOrangeBorder(e) {
        const domEle = $(e.target);
        const val = $.trim(domEle.val());
        if (!val) {
            domEle.addClass('gray');
            domEle.parent().addClass('gray');
        }
        domEle.parent().removeClass('orange');
    }

    postForm() {
        const self = this;
        const name = $.trim(self.refs.myName.value);
        const mobile = $.trim(self.refs.myMobile.value);
        const smsCode = $.trim(self.refs.myCode.value);
        const subjectId = self.state.subjectId;
        const subjectName = self.state.subjectName;

        if (!name) {
            uiNew.remind('请输入姓名！');
            return;
        }

        if (!subjectId) {
            uiNew.remind('请输入科目！');
            return;
        }

        if (!mobile) {
            uiNew.remind('请输入手机号！');
            return;
        }

        if (!self.state.isRegister && !smsCode) {
            uiNew.remind('请输入短信验证码！');
            return;
        }

        const params = {
            name: name,
            subject: subjectName,
            mobile: mobile,
            sms_code: smsCode || null
        };

        service.post(CONFIG.PATHS.SUBMIT, params)
            .then(function (res) {
                if (+res.code === 0) {
                    uiNew.remind('提交成功！').then(function () {
                        self.initCustomInfo();
                        // setTimeout(function () {
                        if (params.sms_code) {
                            // window.location.href = window.location.href;
                            if (app.isStudentApp()) {
                                window.location.reload();
                            } else {
                                self.reloadInWX();
                            }
                        }
                        // });
                    });
                }
            });
    }

    reloadInWX() {
        const str = location.href;
        const arr = str.split('#');
        arr[0] = arr[0].split('?')[0] + '?t=' + (+new Date());
        const newUrl = arr.join('#');
        window.location.href = newUrl;
    }

    choosedSubject(item) {
        const self = this;

        self.setState({
            subjectId: item.sub_id,
            subjectName: item.title,
            isPost: 1
        });
    }

    checkMobile(e) {
        const self = this;
        const val = $.trim(self.refs.myMobile.value);

        self.removeOrangeBorder(e);
        if (val && CONFIG.MOBILEREG.test(val)) {
            const params = {
                mobile: val
            };

            service.post(CONFIG.PATHS.CHECKMOBILE, params)
                .then(function (res) {
                    if (+res.code === 0) {
                        const isRegister = res && res.data && res.data.exist;
                        // if (isRegister === 0) {
                            self.setState({
                                isRegister: isRegister
                            });
                        // }
                    } else {
                        uiNew.remind(res.msg);
                    }
                });
        } else {
            self.refs.myMobile.value = null;
            self.setState({
                isRegister: 1
            });
        }
    }

    initCustomInfo() {
        const self = this;
        
        if (window.gsx_ready) {
            window.gsx_ready(function (config) {
                if (config && config.user) {
                    const user = config.user;
                    self.setState({
                        inputMobile: user.mobile,
                        inputName: user.name,
                        subjectId: null,
                        subjectName: null,
                        isGetCode: 0,
                        isPost: 0
                    });
                } else {
                    self.clearCustomInfo();
                }
            });
        } else {
            self.clearCustomInfo();
        }
    }

    clearCustomInfo() {
        this.setState({
            inputMobile: null,
            inputName: null,
            subjectId: null,
            subjectName: null,
            isGetCode: 0,
            isPost: 0
        });
    }

    nameChange(event) {
        this.setState({
            inputName: event.target.value
        });
    }

    mobileChange(event) {
        this.setState({
            inputMobile: event.target.value
        });
    }
                    
    render() {
        const self = this;
        const inputName = self.state.inputName || '';
        const inputMobile = self.state.inputMobile || '';

        return (
            <div id="form" className="liudan-form">
                <div className="input-box">
                    <div className="input-border name-border gray"> 
                        <input 
                            className="name gray" value={inputName} onChange={self.nameChange} 
                            onFocus={self.getOrangeBorder} onBlur={self.removeOrangeBorder}
                            type="text" name="name" required="required" maxLength="20" placeholder="您的姓名"  ref="myName" />
                    </div>
                    <AutoSearchSubject callbackChoosed={self.choosedSubject} isPost={self.state.isPost} />
                </div>
                <div className="input-box input-border gray">
                    <input 
                        className="number gray" value={inputMobile} onChange={self.mobileChange} 
                        onFocus={self.getOrangeBorder}
                        type="number" name="number" required="required" maxLength="15" placeholder="您的手机号码，方便顾问联系"  ref="myMobile" onBlur={self.checkMobile} /> 
                </div>
                <div className={self.state.isRegister ? 'input-box input-border gray hide' : 'input-box input-border gray'}>
                    <input 
                        className="number gray" type="number" name="number" required="required" maxLength="6" placeholder="输入短信验证码" ref="myCode" 
                        onFocus={self.getOrangeBorder} onBlur={self.removeOrangeBorder} />
                    <div className={self.state.isGetCode ? 'get-code hide' : 'get-code'} onClick={self.getVerifyCode}>获取验证码</div> 
                    <div className={self.state.isGetCode ? 'get-code sending-code' : 'get-code sending-code hide'}>{self.state.getCodeTitle}</div> 
                </div>
                <div className="submit center analysis-habo-log one-to-one-post" onClick={self.postForm}>立即抢跑
                </div>
            </div>
        );
    }
};

export default DemandForm;