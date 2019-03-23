/**
 * 报名须知
 * @author niejianhui
 */
import React from 'react';
import {Tooltip} from 'antd';
import config from './config';

import './index.styl';

export default function EnrollTips() {
    return (
        <div className="enroll-tips">
            <div className="title">报名须知</div>
            {
                config.TIPS.map(item => (
                    <Tooltip
                        placement="left"
                        key={item.name}
                        title={item.tooltip}
                    >
                        <div className="tip">
                            <span></span>
                            {item.name}
                        </div>
                    </Tooltip>
                ))
            }
        </div>
    );
}
