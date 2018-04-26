/**
 * 一对一优选签约-结果页-成功提示信息
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
import ResultTips from '../ResultTips/index';
require('css-loader!./index.styl');

function FailTips({ title }) {
    return (
        <ResultTips
            containerClass="fail-tips"
            title={title}
            iconClass="icon-icon-warning"
        />
    );
}

FailTips.propTypes = {
    title: PropTypes.string.isRequired
};

export default FailTips;