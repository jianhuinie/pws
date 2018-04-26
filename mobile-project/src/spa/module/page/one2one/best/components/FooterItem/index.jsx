/**
 * 页面底部
 */

import React from 'react';
const open400TelDialog = require('common/openAppDialog/open400TelDialog');
// const backTopButton = require('common/backTopButton');
require('css-loader!./index.styl');

class FooterItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFooter: 0,
            title: props.title || '预约名师1对1',
            classEle: props.classEle || ''
        };
        this.scrollTop = this.scrollTop.bind(this);
        this.bindBottomCall = this.bindBottomCall.bind(this);
    }

    componentDidMount() {
        const self = this;
        // backTopButton.init();
        if (self.state.classEle) {
            $(window).scroll(function () {
                const classNameStr = self.state.classEle;
                const topBtnOffset = $('.' + classNameStr).offset();
                const scrollTop = $(window).scrollTop();
                const baseWidth = 375;
                const realWidth = $(window).width();
                const offsetHeight = Math.ceil(48 * realWidth / baseWidth);
                if (topBtnOffset) {
                    if (scrollTop > topBtnOffset.top + offsetHeight) {
                        self.setState({
                            showFooter: 1
                        });
                    } else {
                        self.setState({
                            showFooter: 0
                        });
                    }
                }
            });
        }
    }

    bindBottomCall() {
        open400TelDialog.makePhoneCall('4000910910');
    }

    scrollTop() {
        $(window).scrollTop(0);
    }

    render() {
        const self = this;
        
        return (
            <div className={self.state.showFooter ? 'footer-item-container' : 'footer-item-container hide'}>
                <div className="footer no-fixed fixed-footer bottom">
                    <div className="phone consult center analysis-habo-log" data-tel="4000910910" onClick={this.bindBottomCall}>
                        <i className="icon-right-phone"></i>
                        <p className="phone-title">免费咨询</p>
                    </div>
                    <div className="free center" onClick={this.scrollTop}>
                        {self.state.title}
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
};

export default FooterItem;