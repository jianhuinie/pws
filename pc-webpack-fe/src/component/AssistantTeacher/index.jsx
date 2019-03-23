/**
 * 助教弹窗
 * @author niejianhui
 */

import {PureComponent} from 'react';
import http from '~/service/http';
import constant from '~/service/constant';
import {Modal} from 'antd';
import util from '~/util/util';
import './index.styl';

class AssistantTeacher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            teacherInfo: {}
        };
    }

    componentDidMount() {
        http
            .get(constant.ASSISTANTTEACHTER.BUSINESSCARD, {
                number: this.props.teacherNumber
            })
            .then(res => {
                this.setState({
                    teacherInfo: res.data
                });
            });
    }

    // 调起客服IM
    chatToIm = () => {
        util.chatToKefuIm();
        this.props.onCloseDialog();
    }

    render() {
        const {teacherInfo} = this.state;
        const {showAssistantTeacher, onCloseDialog} = this.props;
        return (
            <Modal
                visible={showAssistantTeacher}
                onCancel={onCloseDialog}
                footer={null}
                wrapClassName="assistant-teacher-dialog"
                width={637}
            >
                {
                    teacherInfo.displayName && (
                        <div className="content">
                            <div className="left-info">
                                <img src={teacherInfo.avatarUrl} alt="" />
                                <div className="teacher-name">{teacherInfo.displayName}</div>
                            </div>
                            <div className="right-info">
                                <img className="qrcode" src={teacherInfo.weixinQrcodeUrl} alt="" />
                                <div className="detail-info">
                                    <div className="wx-number">添加微信号“{teacherInfo.weixinNumber}”</div>
                                    <div>课程相关内容都可以咨询哦~</div>
                                    <div className="chat-im" role="presentation" onClick={this.chatToIm}>
                                        <i className="icon icon-consult"></i>
                                        在线咨询
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>
        );
    }
}
export default AssistantTeacher;
