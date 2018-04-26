/**
 * K12&留学页面视频模板
 * @file leon
 */
import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class VideoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCover: 1
        };
        this.hideCover = this.hideCover.bind(this);
    }

    componentDidMount() {
        lazyLoadImage.init();
    }

    hideCover() {
        const self = this;

        self.setState({
            showCover: 0
        });

        document.domain = 'genshuixue.com';
        // document.domain = '172.24.24.79';
        try {
            const playFrame = $('#player-frame')[0];
            const videoPlayer = playFrame.contentWindow.document.getElementsByTagName('video');
            if (videoPlayer[0].readyState === 4) {
                self.playVideo(videoPlayer);
            } else {
                videoPlayer[0].load();
                videoPlayer[0].oncanplay = function () {
                    self.playVideo(videoPlayer);
                };
            }
        } catch (e) {
            console.log('error');
        }
    }
    
    playVideo(videoPlayer) {
        videoPlayer[0].play();
        $(videoPlayer).attr('autoplay', 'autoplay');
    }

    render() {
        const self = this;
        const data = self.props.item;

        return (
            <div className="video-item">
                <div id="fixed-top">
                    <div id="video-wrap">
                        <div id="video-image-panel" className={self.state.showCover ? '' : 'hide'}>
                            <img className="preface" width="100%" height="100%" data-src={data.cover_img} />
                            <i className="play-icon icon-ic_play" onClick={self.hideCover}></i>
                        </div>
                        <div id="video-container">
                            <iframe className={self.state.showCover ? 'hide' : ''} id="player-frame" src={data.video_url}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default VideoItem;