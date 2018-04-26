/**
 * 1对1优选签约-结果页-成功提示信息
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import ResultTips from 'spa/common/components/ResultTips/index';
require('css-loader!./index.styl');

function SuccInfo() {
    return (
        <div className="sign-result-success">
            <ResultTips title="恭喜您，已签约成功" />
            <p className="intro">您已成为优选1对1签约老师，1对1页面已升级，您可以去PC网页查看并补充信息哦</p>
        </div>
    );
}

export default SuccInfo;