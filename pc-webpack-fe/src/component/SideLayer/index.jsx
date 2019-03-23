/**
 * 课程右侧悬浮信息
 * @author niejianhui
 */
import {PureComponent} from 'react';
import {BackTop} from 'antd';
import http from '~/service/http';
import constant from '~/service/constant';
import util from '~/util/util';
import $ from 'jquery';
import './index.styl';

class SideLayer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this);
        http
            .get(constant.USER.BASICINFO)
            .then(res => {
                const flag = +new Date();
                const {data} = res;
                let iframeUrl = '/im/main?im_user_role=2&isSetIframeParam=true';
                iframeUrl += '&v=' + flag;
                if (data.user_name) {
                    iframeUrl += '&im_user_number=' + data.user_number;
                }
                $('<iframe id="im-iframe"></iframe>').prependTo('body');
                const imIframe = $('#im-iframe');
                imIframe.prop('src', iframeUrl);
                window.onmessage = message => {
                    const msgData = message.data;
                    if (msgData.isSetIframeParam) {
                        const width = msgData.width + 120;
                        imIframe.css({
                            width: width + 'px',
                            height: msgData.height + 'px'
                        });
                    } else if (msgData.jumpLogin) {
                        location.href = '/static/login?next=' + encodeURIComponent(location.href);
                    }
                };
            });
    }

    // 客服IM
    chatToIm = () => {
        util.chatToKefuIm();
    }

    render() {
        return (
            <div className="side-layer">
                <div
                    role="presentation"
                    className="flotage-btn analysis-haoke-log"
                    onClick={this.chatToIm}
                    data-event-id="24542095"
                >
                    <i className="icon icon-consult"></i>
                    <div className="sub-menu sub-first">
                        <div className="sub-text-first">在线咨询</div>
                        <div className="sub-text-middle">周一至周日</div>
                        <div className="sub-text-last">9:00-23:00</div>
                        <div className="triangle sub-triangle1"></div>
                    </div>
                </div>

                <div className="flotage-btn">
                    <i className="icon icon-phone"></i>
                    <div className="sub-menu sub-middle">
                        <div className="sub-text-first">电话咨询</div>
                        <div className="sub-text-middle">4000-910-910</div>
                        <div className="sub-text-last">9:00-21:00</div>
                        <div className="triangle sub-triangle2"></div>
                    </div>
                </div>

                <div className="flotage-btn">
                    <i className="icon icon-WeChat"></i>
                    <div className="sub-menu sub-last">
                        <div className="sub-text-first">关注公众号</div>
                        <img className="qrcode" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/11/5bf4030d74161.png" alt="" />
                        <div className="sub-text-middle">微信关注跟谁学</div>
                        <div className="sub-text-last">随时随地获取上课信息</div>
                        <div className="triangle sub-triangle3"></div>
                    </div>
                </div>

                <div className="flotage-btn">
                    <a
                        className="icon icon-feedback analysis-haoke-log"
                        data-event-id="24542703"
                        rel="nofollow"
                        href="/guide/join?detail=suggestion"
                        target="_blank"
                    >
                    </a>
                    <div className="sub-menu sub-final">
                        <div className="sub-text-first">意见反馈</div>
                        <div className="triangle sub-triangle4"></div>
                    </div>
                </div>

                <div className="flotage-btn item">
                    <BackTop>
                        <div className="line-box"></div>
                        <i className="icon icon-top"></i>
                    </BackTop>
                </div>

            </div>
        );
    }
}

export default SideLayer;
