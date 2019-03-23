/**
 * 课程详情audio展示
 * @author niejianhui
 */
import {PureComponent} from 'react';
import PlayVideoDialog from '~/component/PlayVideoDialog/index';

import './index.styl';

class Video extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showPlayVideo: false
        };
    }

    hidePlayVideo = () => {
        this.setState({
            showPlayVideo: false
        });
    }

    showVideoDialog = () => {
        this.setState({
            showPlayVideo: true
        });
    }


    render() {
        const {item, index, loggerId} = this.props;
        return (
            <div
                role="presentation"
                className="detail-video detail-item analysis-haoke-log analysis-haoke-log-scroll"
                data-index={index}
                data-event-id="27550037,27549990"
                data-logger-id={loggerId}
                data-video={item.url} onClick={this.showVideoDialog}
            >
                <img src={item.videoCoverUrl} alt="" />
                <img
                    className="play-img"
                    src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b5684983da9.png"
                    alt=""
                />
                <PlayVideoDialog
                    entityNumber={item.entityNumber}
                    showPlayVideo={this.state.showPlayVideo}
                    onCloseDialog={this.hidePlayVideo}
                />
            </div>
        );
    }
}

export default Video;
