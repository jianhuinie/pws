/**
 * 报名成功弹窗
 * @author niejianhui
 */

import {PureComponent} from 'react';
import http from '~/service/http';
import constant from '~/service/constant';
import {Modal} from 'antd';
import './index.styl';

class EnrollSuccess extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {subclazzNumber} = this.props;
        http
            .get(constant.WEIXIN.GETCOURSEQRCODE, {
                courseType: 15,
                subclazzNumber
            })
            .then(res => {
                this.setState({
                    qrCodeUrl: res.data.url
                });
            });
    }

    onCloseDialog = () => {
        this.props.onCloseDialog();
    }

    render() {
        const {showEnrollSuccess} = this.props;
        return (
            <Modal
                visible={showEnrollSuccess}
                onCancel={this.onCloseDialog}
                footer={null}
                wrapClassName="enroll-success-dialog"
                width={600}
            >
                <div className="content">
                    <div className="title">
                        <span className="icon-success"></span>
                        <span>报名成功</span>
                    </div>
                    <div className="remind-tip">
                        上课须知：可以通过“我的课表”进入教室学习，
                    </div>
                    <div className="remind-tip">
                        记得要准时上课哦。
                    </div>
                    <div className="qrcode-info">
                        <img src={this.state.qrCodeUrl} alt="" />
                        <div className="qrcode-detail">
                            <div className="text-primary">担心错过上课提醒和回放</div>
                            <div className="text-muted">微信识别二维码关注官方服务号</div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}
export default EnrollSuccess;
