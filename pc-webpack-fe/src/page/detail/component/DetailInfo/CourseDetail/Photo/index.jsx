/**
 * 图文详情photo展示
 */
import React from 'react';

import './index.styl';

export default function Photo(props) {
    const {item, index, loggerId} = props;
    return (
        <div
            className="detail-photo detail-item analysis-haoke-log-scroll"
            data-index={index}
            data-event-id="27549982"
            data-logger-id={loggerId}
        >
            {
                item.referUrl ? (
                    <a href={item.referUrl} target="_blank">
                        <img src={item.url} alt="" />
                    </a>
                ) : (
                    <img src={item.url} alt="" />
                )
            }
        </div>
    );
}
