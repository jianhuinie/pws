/**
 * 结果提示信息，默认成功提示信息
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

function ResultTips({ containerClass, title, iconClass }) {
    return (
        <div className={containerClass}>
            <p>
                <i className={`icon ${iconClass}`} />
            </p>
            <p className="tips">{title}</p>
        </div>
    );
}

ResultTips.propTypes = {
    containerClass: PropTypes.string,
    // app类型：0-学生，1-老师，2-机构
    title: PropTypes.string.isRequired,
    iconClass: PropTypes.string
};
ResultTips.defaultProps = {
    containerClass: 'success-tips',
    iconClass: 'icon-ic-success'
};

export default ResultTips;