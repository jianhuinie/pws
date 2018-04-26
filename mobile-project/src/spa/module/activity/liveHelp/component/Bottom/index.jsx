import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
const app = require('common/app');
require('css-loader!./index.styl');

class BottomContainer extends React.Component {

    constructor(props) {
        super(props);
        this.playNumber = this.playNumber.bind(this);
    };

    componentDidMount() {
        lazyLoadImage.init();
    }

    playNumber() {
        if (app.isApp()) {
            app.send('toMakePhoneCall', {
                phone_number: ' 4000-910-910'
            });
        } else {
            location.href = 'tel://4000-910-910';
        }
    }

    render () {
        return (
            <div className="livehelp-bottom">
                <div className="livehelp-bottom-main">
                    <i className="icon-heart livehelp-bottom-heart"></i>
                    <span className="livehelp-bottom-sub">
                        感谢您的使用
                    </span>
                </div>

                <div className="livehelp-bottom-sub">
                    <span className="livehelp-bottom-sub-text">
                        服务热线：
                    </span>

                    <span 
                        className="livehelp-bottom-sub-number"
                        onClick={this.playNumber}
                    >
                        4000-910-910
                    </span>
                </div>

                <div className="livehelp-bottom-sub-fuwu">
                    Copyright © 2014 - 2017 北京百家互联科技有限公司版权所有. 
                </div>
            </div>
        );
    }
};

export default BottomContainer;