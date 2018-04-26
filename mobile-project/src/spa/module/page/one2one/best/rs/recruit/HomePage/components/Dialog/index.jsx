import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import CONFIG from '../../../config';
import Suggestion from 'spa/common/components/Suggestion/index';
import Dialog from 'spa/common/components/Dialog/index';
const service = require('common/service');
const $ = require('zepto');
const ui = require('common/ui');
require('css-loader!./index.styl');

class RecruitDialog extends React.Component {
    static propTypes = {
        isShowDialog: PropTypes.bool,
        onCloseHandler: PropTypes.func
    };
    static defaultProps = {
        isShowDialog: false,
        onCloseHandler: null
    };
    constructor(props) {
        super(props);
        this.closeHander = this.closeHander.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubjectSelectedHandler = this.onSubjectSelectedHandler.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.state = {
            name: '',
            mobile: '',
            isOpen: props.isShowDialog
        };
    }
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {
        const me = this;
        me.setStateProps({ isOpen: nextProps.isShowDialog });
        if (nextProps.isShowDialog) {
            service
                .get(CONFIG.PATHS.TEACHER_INFO)
                .then((res) => {
                    if (res.code === 0) {
                        const dt = res.data;
                        me.setStateProps({
                            name: dt.real_name,
                            mobile: dt.mobile,
                            ratio: dt.share_ratio
                        });
                    } else {
                        ui.alert(res.msg).then(() => {
                            hashHistory.push('/one2one/best/rs/');
                        });
                    }
                });
        }
    }
    // 科目选择
    onSubjectSelectedHandler(dt) {
        this.subjectId = dt.value;
        this.setStateProps({
            subjectName: dt.title,
            subjectSource: null,
            subjectError: null,
            subjectTips: null
        });
    }
    // 科目输入
    onChanged(event) {
        const val = event.target.value;
        const type = $(event.target).data('type');
        switch (type) {
            case 'name':
                this.onNameChanged(val);
                return;
            case 'mobile':
                this.onMobileChanged(val);
                return;
            case 'subject':
                this.onSubjectChanged(val, event);
                return;
        }
    }
    onNameChanged(val) {
        this.setStateProps({ name: val });
        if (val) {
            this.setStateProps({ nameError: null });
            return true;
        }
        // 姓名不允许为空
        this.setStateProps({ nameError: '请填写姓名' });
        return false;
    }
    onMobileChanged(mobile) {
        this.setStateProps({ mobile: mobile });
        if (!mobile) {
            // 手机号不允许为空
            this.setStateProps({ mobileError: '请填写手机号' });
            return false;
        } else if (!/^1\d{3,}$/.test(mobile)) {
            // 请输入正确的手机格式
            this.setStateProps({ mobileError: '请输入正确的手机格式' });
            return false;
        }
        this.setStateProps({ mobileError: null });
        return true;
    }
    onSubjectChanged(val) {
        const me = this;
        let url = 'https://suggestion.genshuixue.com/s';

        if (location.host.indexOf('beta') !== -1) {
            url = 'https://beta-suggestion.genshuixue.com/s';
        }
        me.setStateProps({ subjectName: val });
        me.subjectId = null;
        me.setStateProps({
            subjectTips: '请通过下拉列表选择科目',
            subjectError: null
        });
        if (val) {
            $.ajax({
                url: url,
                data: {
                    key: val,
                    type: 1,
                    v: 2
                },
                dataType: 'jsonp'
            }).done(function (res) {
                const dt = res.result.r;
                if (Array.isArray(dt) && dt.length) {
                    const state = me.state;
                    state.subjectSource = res.result.r.map((item) => {
                        return {
                            value: item.sub_id,
                            title: item.title
                        };
                    });
                    me.setState(state);
                    return;
                }
                me.setStateProps({
                    subjectTips: '暂不开放该科目的报名'
                });
            });
        }
    }
    onSubmitHandler() {
        if (this.validator() && !this.isSubmit) {
            this.isSubmit = true;
            service
                .post(CONFIG.PATHS.RECRUIT, {
                    name: this.state.name,
                    mobile: this.state.mobile,
                    subject_id: this.subjectId,
                    share_ratio: this.state.ratio
                })
                .then((res) => {
                    if (res.code === 0) {
                        this.setStateProps({ isOpen: false });
                        if (typeof this.props.onCloseHandler === 'function') {
                            this.props.onCloseHandler('ok');
                        }
                    } else {
                        ui.alert(res.msg);
                    }
                    this.isSubmit = false;
                });
        }
    }
    setStateProps(newProps) {
        // hurry safari下Object.assign
        // this.setState(Object.assign(this.state, newProps));
        this.setState($.extend(this.state, newProps));
    }
    validator() {
        const name = this.state.name;
        const mobile = this.state.mobile;
        const subject = this.state.subjectName;
        let result = true;
        result = this.onNameChanged(name);
        result = this.onMobileChanged(mobile) && result;
        if (!subject) {
            // 科目不允许为空
            result = false;
            this.setStateProps({
                subjectError: '请填写科目',
                subjectTips: null
            });
        } else if (!this.subjectId) {
            // 科目不允许为空
            result = false;
            this.setStateProps({
                subjectError: '请通过下拉列表选择科目',
                subjectTips: null
            });
        } else {
            this.setStateProps({ subjectError: null });
        }
        
        return result;
    }
    closeHander() {
        this.setStateProps({ isOpen: false });
        if (typeof this.props.onCloseHandler === 'function') {
            this.props.onCloseHandler('cancel');
        }
    }
    render() {
        // ReactModal详细demo见这里：https://reactcommunity.org/react-modal/
        return (
            <Dialog isShowDialog={this.state.isOpen} onCloseHandler={this.closeHander}>
                <div className="recruit-home-dialog">
                    <div className="header">
                        <div className="title">提交您的主营科目</div>
                        <div className="sub-title">术业有专攻，只能提交一个主营科目哦</div>
                    </div>
                    <div className="body">
                        <form noValidate="novalidate" onSubmit={() => { return false; }}>
                            <div className="txt">
                                <input type="text" data-type="name" placeholder="您的姓名" value={this.state.name} maxLength="10" onChange={this.onChanged} />
                                <span className="error">{this.state.nameError}</span>
                            </div>
                            <div className="txt subject">
                                <input type="text" data-type="subject" placeholder="您的主营科目" value={this.state.subjectName} onChange={this.onChanged} />
                                <Suggestion
                                    dataSource={this.state.subjectSource}
                                    onSelectedHandler={this.onSubjectSelectedHandler}
                                    className="subject-suggestion"
                                />
                                <span className="error">{this.state.subjectError}</span>
                                <span className="tips">{this.state.subjectTips}</span>
                            </div>
                            <div className="txt">
                                <input type="number" data-type="mobile" placeholder="您的手机号码，方便顾问联系" value={this.state.mobile} maxLength="11" onChange={this.onChanged} />
                                <span className="error">{this.state.mobileError}</span>
                            </div>
                            <div>
                                <div className="button" onClick={this.onSubmitHandler} >确认报名</div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default RecruitDialog;