import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class LiveRuleContainer extends React.Component {

    componentDidMount() {
        lazyLoadImage.init();
    }

    render() {
        return (
            <div className="livehelp-box-main livehelp-box-main-rule">
                <div className="livehelp-rule-title">
                    直播须知
                </div>
                <div className="livehelp-rule-line">
                </div>

                <div className="livehelp-rule-box-sub">
                    <div className="livehelp-rule-box-sub-title">
                        跟谁学直播助手是做什么的？
                    </div>

                    <div className="livehelp-rule-box-sub-content">
                        跟谁学直播助手是您在电脑上完成在线课程的学习工具。
                    </div>


                    <div className="livehelp-rule-box-sub-title">
                        使用直播助手需要什么设备？
                    </div>

                    <div className="livehelp-rule-box-sub-content">
                        您需要一台笔记本电脑 或 一台台式电脑 +带麦克风的耳机+ 摄像头。
                    </div>

                    <div className="livehelp-rule-box-sub-title">
                        直播助手在哪里下载？
                    </div>

                    <div className="livehelp-rule-box-sub-content">
                        通过电脑端访问跟谁学官网 www.genshuixue.com , 在官网首页上即可下载直播助手客户端。
                    </div>
                </div>

                <img 
                    className="livehelp-rule-pic livehelp-big-one-pic" 
                    data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154b560ea4d.png"    
                />

                <div className="livehelp-rule-box-sub">
                    <div className="livehelp-rule-box-sub-title">
                        直播助手如何安装？
                    </div>
                    <div className="livehelp-rule-box-sub-content-2">
                        <span className="livehelp-rule-box-sub-circle"></span>
                        Windows版直播助手，双击下载的压缩文件gsxliveclient.zip 解压。若没有解压工具，可通过百度搜索“解压软件”即可下载并安装。通过解压工具解压后，再点击直播助手文件，按照安装流程操作即可。
                    </div>
                    <div className="livehelp-rule-box-sub-content-2">
                        <span className="livehelp-rule-box-sub-circle"></span>
                        Mac版直播助手，双击 gsxclientmac.dmg 文件后，按照安装流程操作即可。
                    </div>
                </div>

                <img 
                    className="livehelp-rule-pic livehelp-big-two-pic" 
                    data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154c00e59d7.png"    
                />
            </div>
        );
    }
};

export default LiveRuleContainer;