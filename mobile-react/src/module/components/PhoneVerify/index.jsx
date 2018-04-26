import React, { PropTypes } from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import CommonController from 'common/controller/CommonController';

require('css-loader!./index.styl');

const CODE_BTN_DEFAULT = '获取验证码';

export default class PhoneVerify extends CommonController {

    static propTypes = {
        onSubmitSuccess: PropTypes.func.isRequired,
        submitLabel: PropTypes.string
    };

    static defaultProps = {
        submitLabel: '提交'
    }

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            code: '',
            tip: '', // 顶部提醒
            showTip: false,
            isError: false,
            codeBtnText: CODE_BTN_DEFAULT,
            submiting: false
        };
        this.handleMobileChange = this.handleMobileChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.getCode = this.getCode.bind(this);
        this.submit = this.submit.bind(this);
    }

    /**
     * 获取验证码
     */
    getCode() {
        const self = this;
        if (this.state.codeBtnText !== CODE_BTN_DEFAULT) { // 验证码已发
            return;
        }
        const mobile = this.state.mobile;
        if (this.validateMobile()) {
            this.setState({
                codeBtnText: '获取中'
            });
            ajax.post(ajaxConfig.PHONE.GET_CODE, {
                mobile: mobile
            }).then(() => {
                this.setBtnStatus();
                this.setTip('验证码已发送，请查看手机短信', false);
            }, () => {
                const codeBtnText = CODE_BTN_DEFAULT;
                self.setState({ codeBtnText });
            });
        }
    }

    /**
     * 设置顶部浮层提醒
     * @param {string} tip 
     * @param {boolean} isError 
     */
    setTip(tip, isError) {
        this.setState({
            showTip: true,
            isError: isError,
            tip: tip
        });
        setTimeout(() => {
            this.setState({
                showTip: false
            });
        }, 2000);
    }

    /**
     * 获取二维码倒计时
     */
    setBtnStatus() {
        let time = 60;
        let codeBtnText = '';
        this.timer = setInterval(() => {
            time--;
            if (time > 0) {
                codeBtnText = `${time}s`;
            } else {
                clearInterval(this.timer);
                codeBtnText = CODE_BTN_DEFAULT;
            }
            this.setState({
                codeBtnText
            });
        }, 1000);
    }

    componentDidMount() {
        const self = this;
        ajax.get(ajaxConfig.USER.GET_USER, {}).then((res) => {
            if (res && res.code === 200 && res.data.user.mobile) {
                const mobile = res.data.user.mobile;
                self.setState({ mobile });
            }
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    /**
     * 校验手机号
     */
    validateMobile() {
        const mobile = this.state.mobile;
        if (mobile && mobile.length === 11) { 
            return true;
        }
        this.setTip('请填写正确的11位数字手机号码', true);
        return false;
    }

    /**
     * 输入手机号
     * @param {event} e 
     */
    handleMobileChange(e) {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            this.setState({
                mobile: value
            });
        }     
    }

    /**
     * 输入验证码
     * @param {event} e 
     */
    handleCodeChange(e) {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            this.setState({
                code: value
            });
        }     
    }

    /**
     * 提交验证码 
     */
    submit() {
        if (!this.validateMobile()) {
            return;
        }
        this.setState({
            submiting: true
        });
        ajax.post(ajaxConfig.PHONE.VERIFY, {
            mobile: this.state.mobile,
            code: this.state.code
        }).then((res) => {
            this.setState({
                submiting: false
            });
            if (res.data && res.data.isValid) {
                this.props.onSubmitSuccess();
            } else {
                this.setTip('验证码不符', true);
            }
        });
    }

    render() {
        return (
            <div className="phone-vertify">
                <div 
                    className={
                        `phone-vertify-tip ${this.state.isError ? 'error' : 'success'}
                        ${this.state.showTip ? 'tip-appear' : 'tip-hidden'}`
                    }
                >
                    { this.state.tip }
                </div>
                <div className="phone-vertify-title">手机短信认证</div>
                <div className="phone-vertify-number">
                    <label className="label" htmlFor="mobile">
                        手机号码
                    </label>
                    <div className="content">
                        <input
                            value={this.state.mobile} 
                            className="content" name="mobile" placeholder="请输入手机号码" 
                            onChange={this.handleMobileChange}
                        />
                    </div>
                    <button className="get" onClick={this.getCode}>
                        {this.state.codeBtnText}
                    </button>
                </div>
                <div className="phone-vertify-code">
                    <label className="label" htmlFor="code">
                        验证码
                    </label>
                    <div className="content">
                        <input
                            className="content" 
                            name="code" placeholder="请输入获取的验证码" 
                            onChange={this.handleCodeChange}
                        />
                    </div>
                </div>
                <button
                    onClick={this.submit}
                    disabled={!(this.state.mobile && this.state.code) || this.state.submiting}
                    className="ws-btn-red phone-vertify-next"
                >
                    { this.state.submiting ? '提交中' : this.props.submitLabel}
                </button>
            </div>
        );
    }
};
