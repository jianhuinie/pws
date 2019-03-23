/**
 * 视频播放弹窗
 * @author niejianhui
 */

import {PureComponent} from 'react';
import {Modal} from 'antd';

import './index.styl';

class PlayVideoDialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const self = this;
        return (
            <Modal
                visible={self.props.showPlayVideo}
                onCancel={self.props.onCloseDialog}
                footer={null}
                wrapClassName="play-video-dialog"
                width={725}
            >
                <iframe src={'/video/haokeView/' + self.props.entityNumber} title="video" />
            </Modal>
        );
    }
}
export default PlayVideoDialog;
