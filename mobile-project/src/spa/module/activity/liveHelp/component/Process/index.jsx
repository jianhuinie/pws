import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class ProcessContainer extends React.Component {

    componentDidMount() {
        lazyLoadImage.init();
    }

    render () {
        return (
            <div className="livehelp-box-main livehelp-box-main-process">
                <div className="livehelp-rule-title">
                    检测流程
                </div>
                <div className="livehelp-rule-line">
                </div>
                <div className="livehelp-process">
                    <div className="livehelp-process-content">
                        1. 打开直播助手登录学生账号，若不记得密码可以通过“手机动态码登录”，若没有注册可以登录官网注册。
                    </div>
                    <img 
                        className="livehelp-rule-pic livehelp-process-pic-one" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154cfb356e2.png"
                    />
                </div>

                <div className="livehelp-process">
                    <div className="livehelp-process-content">
                        2. 进入直播助手，点击体验教室（仅限老师端）或某门正在直播的课程 “进入课堂” 按钮。
                    </div>
                    <img 
                        className="livehelp-rule-pic livehelp-process-pic-two" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154e0a8ddcb.png"
                    />
                </div>

                <div className="livehelp-process">
                    <div className="livehelp-process-content">
                        3. 点击左下角的“设备检测”按钮开始音视频设备检测。
                    </div>
                    <img 
                        className="livehelp-rule-pic" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154e462fb7a.png"
                    />
                </div>

                <div className="livehelp-process">
                    <div className="livehelp-process-title">
                        4. 检测扬声器
                    </div>
                    <div className="livehelp-process-content-2">
                        系统会播放一段音乐，如果可以听到，说明扬声器工作正常；如果听不到，请按照界面提示进行操作或求助技术支持。
                    </div>
                    <img 
                        className="livehelp-rule-pic livehelp-process-pic-three" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154e9f017b8.png"
                    />
                </div>

                <div className="livehelp-process">
                    <div className="livehelp-process-title">
                        5. 检测麦克风
                    </div>
                    <div className="livehelp-process-content-2">
                        请对着麦克风讲话，当听到自己的回声或界面提示成功检测到声音输入，说明麦克风工作正常；如果提示未检测到声音输入，请按照界面提示进行操作或求助技术支持。
                    </div>
                    <img 
                        className="livehelp-rule-pic livehelp-process-pic-four" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154ed1975b6.png"
                    />
                </div>

                <div className="livehelp-process">
                    <div className="livehelp-process-title">
                        6. 检测摄像头
                    </div>
                    <div className="livehelp-process-content-2">
                        此时直播助手会打开摄像头，如果可以看到画面无异常，说明摄像头工作正常；如果显示黑屏，请检查摄像头连接驱动；如果提示被占用，请关闭正在使用摄像头的软件，重新进行检测，或请按照界面提示进行操作或求助技术支持。
                    </div>
                    <img 
                        className="livehelp-rule-pic livehelp-process-pic-five" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154f0c4b8b4.png"
                    />
                </div>

                <div className="livehelp-process">
                    <div className="livehelp-process-title">
                        检测遇到问题怎么办？
                    </div>
                    <div className="livehelp-process-content-2">
                        当您使用直播助手遇到问题时，请点击直播助手教室右下角"求助"按钮，我们的技术支持人员将与您连线远程协助。
                    </div>
                    <img 
                        className="livehelp-rule-pic" 
                        data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/59154f3ca2816.png"
                    />
                </div>
            </div>
        );
    }
};

export default ProcessContainer;