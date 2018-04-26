import React from 'react';
import LiveHeader from 'spa/module/activity/liveHelp/component/Header/index';
import Nav from 'spa/module/activity/liveHelp/component/Nav/index';
import LiveRule from 'spa/module/activity/liveHelp/component/LiveRule/index';
import Process from 'spa/module/activity/liveHelp/component/Process/index';
import DeviceRequest from 'spa/module/activity/liveHelp/component/DeviceRequest/index';
import Bottom from 'spa/module/activity/liveHelp/component/Bottom/index';
import PageController from 'spa/common/controller/PageController';

const lazyLoadImage = require('common/lazyLoadImage');
const app = require('common/app');

class liveHelpContainer extends PageController {

    componentDidMount() {
        lazyLoadImage.init();
    }
    render() {
        app.setPageTitle('跟谁学直播助手使用指南');
        return (
            <div className="livehelp-main-box">
                <LiveHeader />
                <Nav />
                <LiveRule />
                <Process />
                <DeviceRequest />
                <Bottom />
            </div>
        );
    }
};

export default liveHelpContainer;