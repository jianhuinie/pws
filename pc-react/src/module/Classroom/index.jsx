
/**
 * 首页
 * 
 * @author zhouchangfei@baijiahulian.com
 * 2018/1/15
 */

import React from 'react';
import service from 'common/util/ajaxService';
import { Button } from 'antd';
import URL from 'common/util/url';
require('css-loader!./index.styl');


export default class Classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * 判断课堂是否存在  
     */
    componentWillMount() {
        service
            .get('/pc/classroom/check')
            .then((res) => {
                const data = res.data;
                this.setState({
                    qrcodeUrl: data.qrcodeUrl,
                    hasClassroom: data.hasClassroom
                });
                this.getClassroom(data.hasClassroom);  
            });
    }
    
    /**
     * 若课堂存在，获取课堂信息
     * @param {*} hasClassroom 
     */
    getClassroom = (hasClassroom) => {
        if (hasClassroom) {
            service
                .get('/pc/classroom/get')
                .then((res) => {
                    const data = res.data;
                    this.setState({ 
                        intro: data.intro,
                        name: data.name,
                        classroomId: data.classId
                    });
                });
        }
    }

    /**
     * @override
     */
    render() {
        const me = this;
        const url = URL();
        url.params.classroomId = me.state.classroomId;
        url.params.name = me.state.name;
        url.hash = '#/course';

        if (!me.state.hasClassroom) {
            return (
                <div className="child-page">
                    <div className="create-classroom">
                        <div className="create-classroom-content">
                            <img className="create-classroom-content-qrcode" src={me.state.qrcodeUrl} />
                            <div className="create-classroom-content-describe">还未创建，扫码创建课堂</div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="child-page">
                <div className="classroom">
                    <div className="classroom-title">选择课堂</div>
                    <div className="classroom-content">
                        <div className="classroom-content-name">{me.state.name}</div>
                        <div className="classroom-content-intro">{me.state.intro}</div>
                        <Button className="md-btn classic-btn pink-btn"><a href={url.toString()}>管理</a></Button>
                    </div>
                </div>
            </div>
        );    
    }
}