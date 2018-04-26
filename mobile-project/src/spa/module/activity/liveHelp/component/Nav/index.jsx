import React from 'react';
const $ = require('zepto');
const fixTab = require('common/fixTab/fixTab');
let headerHeight;
require('css-loader!./index.styl');

class NavContainer extends React.Component {

    constructor(props) {
        super(props);
        this.gotoRequest = this.gotoRequest.bind(this);
        this.gotoProcess = this.gotoProcess.bind(this);
        this.gotoRule = this.gotoRule.bind(this);
    }
    componentDidMount() {
        headerHeight = $('.livehelp-header-img').height();
        fixTab($('.livehelp-nav')[0], false);
    }

    gotoRequest() {
        const requestHeight = $('.livehelp-box-device-request').position().top;
        $(window).scrollTop(requestHeight - headerHeight);
    }

    gotoProcess() {
        const processHeight = $('.livehelp-box-main-process').position().top;
        $(window).scrollTop(processHeight - headerHeight);
    }

    gotoRule() {
        $(window).scrollTop(headerHeight);
    }

    render() {
        return (
            <div className="livehelp-nav">
                <div 
                    className="item normal"
                    onClick={this.gotoRule}
                >
                    直播须知
                </div>
                <div 
                    className="item normal"
                    onClick={this.gotoProcess}
                >
                    检测流程
                </div>
                <div 
                    className="item"
                    onClick={this.gotoRequest}
                >
                    硬件要求
                </div>
            </div>
        );
    }
};

export default NavContainer;