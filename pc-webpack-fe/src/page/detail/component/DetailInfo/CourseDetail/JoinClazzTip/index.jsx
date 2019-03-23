/**
 * 上课须知
 * @author niejianhui
 */
import {PureComponent} from 'react';
import './index.styl';

class JoinClazzTip extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showdialog: false
        };
    }

    showRefundDialog = () => {
        const {showdialog} = this.state;
        this.setState({
            showdialog: !showdialog
        });
    }

    hideRefundDialog = () => {
        const {showdialog} = this.state;
        this.setState({
            showdialog: !showdialog
        });
    }

    goDownload = () => {
        window.open('https://www.genshuixue.com/static/liveclient', '_blank');
    }

    render() {
        const imgSrc = {
            listenStyle: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/03/5abdf3991fa57.png',
        };
        // 秒
        const overTime = this.props.overTime;
        const days = Math.floor(overTime / 60 / 60 / 24);
        return (
            <div id="enroll-tips">
                <div className="module-name">
                    <span />
                    购课须知
                </div>
                <div className="tip-item">
                    <div className="item-name">
                        <span>1</span>
                        课程说明
                    </div>
                    <div className="item-detail">
                        <div>
                            <span className="type">直播课节：</span>
                            课程在直播结束后自动生成回放，回放在有效期内可反复观看。
                        </div>
                        <div>
                            <span className="type">视频课节：</span>
                            在视频上线后可在学习中心内查看。
                        </div>
                        <div>
                            <span className="type">有效期：</span>
                            {days}天
                        </div>
                    </div>
                </div>
                <div className="tip-item">
                    <div className="item-name">
                        <span>2</span>
                        听课方式
                    </div>
                    <div className="item-detail">
                        <div className="mobile">
                            <img src={imgSrc.listenStyle} alt="" />
                            <div>
                                <strong>手机：</strong>
                                下载[跟谁学]APP，APP中支持回放下载和倍速播放哦~
                                为保证上课质量，建议在4M及以上的WiFi环境下听课。
                            </div>
                        </div>
                        <div className="computer">
                            <img
                                src="https://imgs.genshuixue.com/0cms/d/file/content/2018/03/5abdf398c7b72.png"
                                alt=""
                            />
                            <div>
                                <strong>电脑：</strong>
                                下载跟谁学直播助手(
                                <span className="download-now" onClick={this.goDownload} role="presentation">立即下载</span>
                                )听课
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tip-item">
                    <div className="item-name">
                        <span>3</span>
                        退课说明
                    </div>
                    <div className="item-detail">
                        <div>由于在线课程的特殊性质,符合以下退款条件的,方可申请退款:</div>
                        <div>一套课程可能包含直播课节、视频课节及教材教具，故以下针对几种情况分别说明。</div>
                        <div>
                            <span className="refund-question">直播课节：</span>
                            已开课的课节不可退款；未开课的课节在开课前可申请退款，退款成功的课节不能继续学习。
                        </div>
                        <div>
                            <span className="refund-question">视频课节：</span>
                            申请退款时，已上传交付的课节不可退款；未上传交付的课节，在上传交付前可申请退款，退款成功的课节不能继续学习。
                        </div>
                        <div><span className="refund-question">教材教具：</span>退款时需要扣除已签收的教材教具费用。</div>
                        <div><span className="refund-question">退款流程：</span>请联系课程辅导老师。</div>
                    </div>
                </div>
                <div className="tip-item">
                    <div className="item-name">
                        <span>4</span>
                        发货说明
                    </div>
                    <div className="item-detail">
                        <div>1）部分课程会寄送配套资料，请正确填写收货地址。</div>
                        <div>2）如需更改收货地址，请及时联系辅导老师。</div>
                        <div>3）快递寄出后会给您发送消息，请留意APP-系统消息；或查询订单中的物流进度。</div>
                    </div>
                </div>
                <div className="tip-item">
                    <div className="item-name">
                        <span>5</span>
                        版权声明
                    </div>
                    <div className="item-detail">
                        <div>
                            本课程相关知识产权归权利人合法享有或已取得合法授权，仅供购买相关课程的注册用户基于自我学习之目的使用。本课程中涉及的所有内容，
                            包括但不限于视频、文字、图片等未经权利人书面授权许可，任何人不得对本课程内容进行翻录、复制、改编、传播、销售等行为（不论是否用于商业用途）。
                            否则，一经发现，跟谁学有权禁止该账号登录，取消其听课资格，并不予退费，同时，根据相关法律法规的规定，追究侵权人的相关法律责任。
                        </div>
                    </div>
                </div>
                <div className="tip-item">
                    <div className="item-name">
                        <span>6</span>
                        联系我们
                    </div>
                    <div className="item-detail">
                        <div>客服电话：4000-910-910</div>
                        <div>服务时间：9:00-21:00</div>
                        <div>客服邮件：service@genshuixue.com。</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinClazzTip;
