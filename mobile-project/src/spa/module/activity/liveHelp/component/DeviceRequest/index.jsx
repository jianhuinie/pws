import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class DeviceRequestContainer extends React.Component {

    componentDidMount() {
        lazyLoadImage.init();
    }

    render () {
        return (
            <div className="livehelp-box-main livehelp-box-device-request">
                <div className="livehelp-rule-title">
                    硬件要求
                </div>
                <div className="livehelp-rule-line">
                </div>

                <div className="livehelp-rule-box-sub">
                    <div className="livehelp-rule-box-sub-title livehelp-device-box-sub-title">
                        直播助手对网络的要求
                    </div>

                    <div className="livehelp-rule-box-sub-content">
                        优先使用有线网，建议使用联通或电信2M带宽及以上独享网络。低于2M的网络，会影响上课品质。跟谁学直播助手是您在电脑端上完成在线课程的学习工具。
                    </div>


                    <div className="livehelp-rule-box-sub-title">
                        直播助手对电脑的配置要求
                    </div>

                    <div className="livehelp-rule-box-sub-content">
                        为确保直播助手能正常运行，保证直播课上课品质，您的电脑需满足以下最低系统需求。
                    </div>
                </div>

                <img 
                    className="livehelp-rule-pic livehelp-request-pic-one" 
                    data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154fcba669c.png"    
                />
            </div>
        );
    }
};

export default DeviceRequestContainer;