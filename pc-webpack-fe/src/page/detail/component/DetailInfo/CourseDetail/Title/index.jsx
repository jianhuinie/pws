/**
 * 图文详情title展示
 */
// import {PureComponent} from 'react';

import './index.styl';

export default function Title(props) {
    const {item, index, loggerId} = props;
    return (
        <div
            className="detail-title detail-item analysis-haoke-log-scroll"
            data-index={index}
            data-event-id="27549115"
            data-logger-id={loggerId}
        >
            {item.content}
        </div>
    );
}
