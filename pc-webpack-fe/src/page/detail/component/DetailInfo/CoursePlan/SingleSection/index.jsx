/**
 * 单一课节
 * @author niejianhui
 */
import {PureComponent} from 'react';
import http from '~/service/http';
import constant from '~/service/constant';
import './index.styl';

class SingleSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            loggerId: props.loggerId
        };
    }

    openwin = url => {
        $('body').append($('<a href="' + url + '" target="_blank" id="open-win"></a>'));
        document.getElementById('open-win').click();
        $('#open-win').remove();
    }

    // 跳转到播放页
    toPlayPage = audition => {
        // const dataset = e.currentTarget.dataset;
        // const audition = +dataset.audition;
        if (audition) {
            const {item} = this.props;
            http
                .get(constant.CLASSROOM.BUTTONURL, {
                    courseType: 15,
                    cellClazzLessonNumber: item.number,
                    type: 6
                })
                .then(res => {
                    location.href = res.data.url.pc;
                });
        }
    }

    render() {
        const {index, loggerId} = this.state;
        const {item} = this.props;
        const typesMap = {
            1: '直播',
            2: '视频'
        };
        return (
            <div
                role="presentation"
                className="single-section"
                // data-audition={item.audition}
                data-lesson-number={item.cellCourseLessonNumber}
                // data-index={index}
                data-logger-id={loggerId}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => this.toPlayPage(item.audition)}
            >
                <div className="section-index">{+index + 1}</div>
                <div>
                    <div className="section-name">{item.name}</div>
                    <div>
                        {typesMap[item.entityType]} &nbsp;|&nbsp;
                        {item.time} &nbsp;|&nbsp;
                        {item.masterTeacherName}
                    </div>
                </div>
                <div className={'status-name' + (item.audition ? ' audition' : '')}>{item.statusName}</div>
            </div>
        );
    }
}

export default SingleSection;
