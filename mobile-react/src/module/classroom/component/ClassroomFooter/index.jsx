/**
 * 课堂页面底部
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class ClassroomFooter extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    showPublic = () => {
        // 显示公众号二维码
        const self = this;
        self.props.showPublic();
    }

    jumpCenter = () => {
        // 跳转到个人中心
        location.href = '/mweb/student/home';
    }

    render() {
        const self = this;

        return (
            <div className="class-room-footer">
                <div className="footer-item left" onClick={self.showPublic}>
                    <i className="icon-room-qrcode"></i>
                    <div className="title">公众号</div>
                </div>
                <div className="footer-item right" onClick={self.jumpCenter}>
                    <i className="icon-person-center"></i>
                    <div className="title">个人中心</div>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
};

export default ClassroomFooter;