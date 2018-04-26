/**
 * 详情页面底部
 */

import React from 'react';
const open400TelDialog = require('common/openAppDialog/open400TelDialog');
import FooterItem from 'spa/module/page/one2one/best/components/FooterItem/index';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class DetailFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showKefuIcon: 1
        };
        this.scrollTop = this.scrollTop.bind(this);
        this.bindBottomCall = this.bindBottomCall.bind(this);
    }

    componentDidMount() {
        const self = this;

        lazyLoadImage.init();
        $(window).scroll(function () {
            const topBtnOffset = $('.one-to-one-post').offset();
            const scrollTop = $(window).scrollTop();
            const baseWidth = 375;
            const realWidth = $(window).width();
            const offsetHeight = Math.ceil(48 * realWidth / baseWidth);
            if (topBtnOffset) {
                if (scrollTop > topBtnOffset.top + offsetHeight) {
                    self.setState({
                        showKefuIcon: 0
                    });
                } else {
                    self.setState({
                        showKefuIcon: 1
                    });
                }
            }
        });
    }

    bindBottomCall() {
        open400TelDialog.makePhoneCall('4000910910');
    }

    scrollTop() {
        $(window).scrollTop(0);
    }

    render() {
        return (
            <div>
                <div className="footer-container">
                    <img className="footer-back" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590af1d43cdcb.png" />
                    <div className="back-box">
                        <p className="small-title center">全球好老师数量遥遥领先的</p>
                        <p className="title center">找好老师学习服务平台</p>
                        <div className="number-box">
                            <div className="box">
                                <p className="number center">60万+</p>
                                <p className="exp center">认证老师</p>
                            </div>
                            <div className="box">
                                <p className="number center">8000万+</p>
                                <p className="exp center">用户</p>
                            </div>
                            <div className="box">
                                <p className="number center">400+</p>
                                <p className="exp center">城市</p>
                            </div>
                        </div>
                    </div>
                    <FooterItem title="预约名师试听课" classEle="one-to-one-post" />
                </div>
                <div className={this.state.showKefuIcon ? 'contact-kefu' : 'contact-kefu hide'} onClick={this.bindBottomCall}>
                    <i className="icon-cellphone"></i>
                    <span className="contact-phone phone" data-tel="4000910910">联系客服</span>
                </div>
            </div>
        );
    }
};

export default DetailFooter;