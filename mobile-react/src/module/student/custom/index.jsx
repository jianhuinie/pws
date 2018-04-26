import React from 'react';
import { hashHistory } from 'react-router';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import Util from 'common/util/util';
require('css-loader!./index.styl');
export default class Custom extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            qrcodeUrl: ''
        };
    }

    componentDidMount() {
        document.title = '联系客服';
        ajax.get(ajaxConfig.CLASSROOM.GET_CUSTOM_INFO).then((res) => {
            this.setState({
                qrcodeUrl: res.data.qrcodeUrl
            });
        });
        Util.sharePage();
    }

    /**
     * 返回
     */
    goBack = () => {
        hashHistory.goBack();
    }

    render() {
        return (
            <div className="contact-custom">
                <div className="contact-custom-qrcode">
                    <img src={this.state.qrcodeUrl} /> 
                </div>
                <div className="contact-custom-title">联系客服</div>
                <div className="contact-custom-desc">
                    长按扫码添加客服，添加时请备注咨询事项。
                </div>
                <button className="ws-btn-red contact-custom-back" onClick={this.goBack}>返回</button>
                <a href="/mweb/discovery">
                    <button className="ws-btn-default contact-custom-home">回到首页</button>
                </a>
            </div>
        );
    }
};
