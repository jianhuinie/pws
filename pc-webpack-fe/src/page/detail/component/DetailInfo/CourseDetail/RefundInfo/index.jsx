/**
 * 退课说明弹窗
 * @author
 */
import {PureComponennt} from 'react';


import './index.styl';

class RefundInfo extends PureComponennt {
    constructor(props) {
        super(props);
        this.state = {
            showdialog: this.props.showdialog
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.showdialog !== nextProps.showdialog) {
            this.setState({
                showdialog: nextProps.showdialog,
            });
        }
    }

    render() {
        const {showdialog} = this.state;
        return (
            <div>
                {
                    showdialog && (
                        <div>
                            <div className="refund-dialog-mask" />
                            <div className="refund-dialog-box">
                                <div className="refund-dialog-top">
                                    <span className="refund-name">退款说明</span>
                                    <span
                                        className="icon-guanbi"
                                        role="presentation"
                                        onClick={this.props.hideRefundDialog}
                                    />
                                </div>

                                <div className="refund-dialog-bottom">
                                    <div className="refund-answer">由于一套课程可能包含直播课节、视频课节及教材教具，故以下针对几种情况分别说明。</div>
                                    <div className="refund-answer">
                                        <span className="refund-question">直播课节：</span>
                                        已开课的课节不可退款；未开课的课节在开课前可申请退款，退款成功的课节不能继续学习。
                                    </div>
                                    <div className="refund-answer">
                                        <span className="refund-question">视频课节：</span>
                                        申请退款时，已上传交付的课节不可退款；未上传交付的课节，在上传交付前可申请退款，退款成功的课节不能继续学习。
                                    </div>
                                    <div className="refund-answer">
                                        <span className="refund-question">教材教具：</span>
                                        退款时需要扣除已签收的教材教具费用。
                                    </div>
                                    <div className="refund-answer">
                                        <span className="refund-question">退款流程：</span>
                                        请联系课程辅导老师。
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

export default RefundInfo;
