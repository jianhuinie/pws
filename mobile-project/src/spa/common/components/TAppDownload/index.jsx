/**
 * 一对一优选签约-老师app下载
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import AppIcon from '../AppIcon/index';
require('css-loader!./index.styl');
const app = require('common/app');

class TAppDownload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: ''
        };
    }
    componentWillMount() {
        if (app.isTeacherApp()) {
            this.setState({
                hidden: 'hidden'
            });
        }
    }
    render() {
        return (
            <div className={`teacher-download-bottom ${this.state.hidden}`}>
                <AppIcon containerClass="t-icon" />
                <div className="intro">
                    <div className="title">跟谁学APP老师版</div>
                    <div className="content">60万老师新时代招生授课首选</div>
                </div>
                <a href="https://m.genshuixue.com/app/dw?t=t&ct=">
                    <div className="download">
                        点击下载
                    </div>
                </a>
            </div>
        );
    }
};

export default TAppDownload;