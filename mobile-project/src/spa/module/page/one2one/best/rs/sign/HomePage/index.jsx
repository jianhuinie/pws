/**
 * 1对1优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import { hashHistory } from 'react-router';
import Header from './components/Header/index';
import Protocol from './components/Protocol/index';
import Footer from './components/Footer/index';
// import analysis from 'spa/common/util/analysis';
import PageController from 'spa/common/controller/PageController';

export default class HomePage extends PageController {
    constructor(props) {
        super(props);
        // analysis.pgv();
        this.signSuccHandler = this.signSuccHandler.bind(this);
    };
    signSuccHandler() {
        // 跳转到成功页
        hashHistory.push('one2one/best/rs/sign/result');
        // this.context.router.push('#/sign/result');
    }
    render() {
        return (
            <div className="home">
                <Header />
                <Protocol />
                <Footer callback={this.signSuccHandler} />
            </div>
        );
    }
};
