/**
 * 一对一优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import { hashHistory } from 'react-router';
import Header from './components/Header/index';
import Rights from './components/Rights/index';
import Advantage from './components/Advantage/index';
import Flow from './components/Flow/index';
import Dialog from './components/Dialog/index';
import Button from '../../../components/Button/index';
import PageController from 'spa/common/controller/PageController';

const $ = require('zepto');
const ui = require('common/ui');
const app = require('common/app');
require('css-loader!./index.styl');

export default class HomePage extends PageController {
    constructor(props) {
        super(props);
        this.signHandler = this.signHandler.bind(this);
        this.onDialogCloseHandler = this.onDialogCloseHandler.bind(this);
        this.state = {
            bottomBtnClassName: 'sign-bottom-btn-hidden',
            isShowDialog: false
        };
    };
    componentDidMount() {
        const me = this;
        $(window).scroll(function () {
            const topBtnOffset = $('.sign-top-btn').offset();
            const scrollTop = $(window).scrollTop();
            if (scrollTop > topBtnOffset.top + 48) {
                me.setState({
                    bottomBtnClassName: 'sign-bottom-btn'
                    // isShowDialog: false
                });
            } else {
                me.setState({
                    bottomBtnClassName: 'sign-bottom-btn-hidden'
                    // isShowDialog: false
                });
            }
        });
    }
    // type: ok/cancel
    onDialogCloseHandler(type) {
        // 关闭
        if (type === 'ok') {
            hashHistory.push('one2one/best/rs/recruit/success');
        }
        this.setState({
            isShowDialog: false
        });
    }
    signHandler() {
        const isNoValid = this.props.params.isNoValid;
        if (isNoValid === '1') {
            // 未生效
            ui.confirm({
                content: '仅通过跟谁学认证的老师才能报名，快去老师端APP认证吧',
                button_ok: '去认证',
                button_cancel: '我知道了'
            }).done(() => {
                app.wakeUpApp('', 't');
            });
            return;
        }
        const state = this.state;
        state.isShowDialog = true;
        this.setState(state);
    }
    render() {
        return (
            <div className="recruit-home-page">
                <Header />
                <div className="body">
                    <div>
                        <div className="desc">
                            <span className="key">优选1对1</span>专注于为学生提供优质1对1教学服务，
                            专属助教为您连接学生，并提供上课过程中的辅助服务，让您摆脱招生束缚，专注于教学。
                        </div>
                        <div className="total-title">首批招募仅<span className="num">1000</span>个名额，招满为止</div>
                        <Button
                            title="立即报名"
                            callback={this.signHandler}
                            containerClass="sign-top-btn"
                        />
                        <div>
                            <i className="icon-down-o icon-angle-down"></i>
                        </div>
                    </div>
                    <Rights />
                    <Advantage />
                    <Flow />
                    <Button
                        title="立即报名"
                        callback={this.signHandler}
                        containerClass={this.state.bottomBtnClassName}
                    />
                </div>
                <Dialog
                    isShowDialog={this.state.isShowDialog}
                    onCloseHandler={this.onDialogCloseHandler}
                />
            </div>
        );
    }
};
