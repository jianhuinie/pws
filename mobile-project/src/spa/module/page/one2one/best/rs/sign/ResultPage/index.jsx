/**
 * 1对1优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
// import { browserHistory } from 'react-router';
import TAppDownload from 'spa/common/components/TAppDownload/index';
import SuccInfo from './components/SuccInfo/index';
import PageController from 'spa/common/controller/PageController';

export default class SignResult extends PageController {
    render() {
        return (
            <div className="sign-result">
                <SuccInfo />
                <TAppDownload />
            </div>
        );
    }
};
