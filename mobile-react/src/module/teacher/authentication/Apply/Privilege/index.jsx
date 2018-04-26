import React from 'react';
import PageController from 'common/controller/PageController';

require('css-loader!./index.styl');

export default class Privilege extends PageController {
    
    render() {
        const props = this.props;
        return (
            <div className="privilege-view">
                <div className="desc-title">认证后的课堂会有以下特权</div>
                <div><span>1</span>.&nbsp;&nbsp;独有官方认证标识</div>
                <div><span>2</span>.&nbsp;&nbsp;有机会优先获取官方推广资源</div>
                {/* {
                    props.isOrg
                    ?
                    <div>
                        <div><span>3</span>.&nbsp;&nbsp;优先获得个性化包装，品牌微课专题策划的机会</div>
                    </div>
                    :
                    null
                } */}
                <div className="desc-title">申请须知</div>
                <div><span>1</span>.&nbsp;&nbsp;你已阅读<a className="protocol" href="/mweb/student/protocol">《微师平台用户协议》</a></div>
                <div><span>2</span>.&nbsp;&nbsp;微师会对你的个人信息进行保密</div>
                <div><span>3</span>.&nbsp;&nbsp;如需帮助或加急审核，请点击添加你的<a className="protocol" href="/mweb/student/custom">客服</a></div>
            </div>
        );
    }
}
