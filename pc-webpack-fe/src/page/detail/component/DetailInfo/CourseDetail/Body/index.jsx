/**
 * 图文详情body展示
 */
import React from 'react';

import './index.styl';

export default function Body(props) {
    const {item, index, loggerId} = props;
    // 正常样式不应该写在这里的  但是。。。实在太多了
    const style = {
        color: item.color,
        fontSize: item.fontSize,
        fontWeight: item.fontWeight,
        textAlign: item.textAlign
    };
    const str = props.item.content.replace(/↵/g, <br />);
    return (
        <div
            className="detail-body detail-item analysis-haoke-log-scroll"
            data-index={index}
            data-event-id="27549937"
            data-logger-id={loggerId}
            style={style}
        >
            {str}
        </div>
    );
}
