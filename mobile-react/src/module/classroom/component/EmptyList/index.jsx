/**
 * 课堂页面空态
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class FollowClassroom extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    
    render() {
        const self = this;
        const isShow = self.props.show;
        
        return (
            <div className={isShow ? 'classroom-empty' : 'classroom-empty hide'}>
                <div className="classroom-empty-icon">
                    <i className="icon-ic-kongtai"></i>
                </div>
                <div className="classroom-empty-text">当前课堂暂无内容</div>
                <div className="classroom-empty-text">点击右下方“操作按钮”，进入课堂管理创建课堂</div>
            </div>
        );
    }
};

export default FollowClassroom;