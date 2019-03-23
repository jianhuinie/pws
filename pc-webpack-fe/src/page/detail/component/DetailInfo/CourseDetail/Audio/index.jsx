/**
 * 课程详情audio展示
 * @author niejianhui
 */
import {PureComponent} from 'react';

import './index.styl';

class Audio extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {item, index, loggerId} = this.props;
        return (
            <div
                className="detail-audio detail-item analysis-haoke-log analysis-haoke-log-scroll"
                data-index={index}
                data-event-id="27550032,27549999"
                data-logger-id={loggerId}
                data-audio={item.url}
            >
                {/* <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b693e1e3815.png" />
                <span className="icon icon-recording"></span>
                <img className="icon play-gif" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b69204a2241.gif" />
                <div className="view-audio-wrapper"></div> */}
                <audio
                    src={item.url}
                    controls="controls"
                    muted
                >
                </audio>
            </div>
        );
    }
}

export default Audio;
