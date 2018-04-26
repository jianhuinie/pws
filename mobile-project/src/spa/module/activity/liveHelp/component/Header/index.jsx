import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class HeaderContainer extends React.Component {

    componentDidMount() {
        lazyLoadImage.init();
    }

    render () {
        return (
            <div className="livehelp-header">
                <img className="livehelp-header-img" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59152fe16369a.png" />
                <img className="livehelp-logo" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/5915305560f44.png" />
                <div className="livehelp-text-title">
                    <div className="livehelp-text-title-main">
                        跟谁学直播助手
                    </div>

                    <div className="livehelp-text-title-sub">
                        使用指南
                    </div>
                </div>
            </div>
        );
    }
};

export default HeaderContainer;