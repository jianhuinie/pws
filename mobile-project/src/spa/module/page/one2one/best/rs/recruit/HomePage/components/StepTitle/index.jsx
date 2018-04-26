/**
 * 一对一优选签约-协议
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
require('css-loader!./index.styl');

function StepTitle({ title, title2 }) {
    return (
        <div className="recruit-home-step-title">
            <div className="title">
                <p>{title}</p>
                <p>{title2}</p>
            </div>
            <div>
                <i className="icon icon-caret-down"></i>
            </div>
        </div>
    );
}

export default StepTitle;