/**
 * 课程详细信息
 * @author niejianhui
 */
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import MasterTeachers from './MasterTeachers/index';
import CourseTabs from './CourseTabs/index';
import CourseDetail from './CourseDetail/index';
import CourseComments from './CourseComments/index';
import CoursePlan from './CoursePlan/index';
// import EventProxy from '~/util/eventProxy';
import util from '~/util/util';
// import config from '../config';

import './index.styl';

class DetailInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // loggerId: props.loggerId,
            // topClazz: {},
            // masterTeachers: [],

        };
    }

    jumpToDetail = scheme => {
        util.skipScheme(scheme, true);
    }


    render() {
        const {
            config,
            activeModule,
            hasAudition,
            onClickTab,
            cellClass: {
                classInfo,
                sidebarCourses,
                teacherInfo, loggerId
            }
        } = this.props;
        const {clazz} = classInfo || {};
        const {topClazz} = sidebarCourses;
        const {masterTeachers} = teacherInfo;
        const {intros, playbackDeadlineSeconds, chapterMode, number, chapters} = clazz || {};
        if (!number) {
            return (<div className="clazz-detail-info" />);
        }
        return (
            <div className="clazz-detail-info">
                <CourseTabs
                    config={config}
                    onClickTab={onClickTab}
                    activeModule={activeModule}
                    hasAudition={hasAudition}
                />
                {
                    topClazz && topClazz.number && (
                        <div
                            className="top-clazz"
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={() => this.jumpToDetail(topClazz.scheme)}
                            role="presentation"
                        >
                            <div className="main-info">
                                <div>
                                    {topClazz.name}
                                </div>
                                {
                                    topClazz.recommendType === 4 ? (
                                        <div className="union-info">
                                            {topClazz.linkCount}
                                            门课程联报
                                        </div>
                                    ) : (
                                        <div className="plan">
                                            {topClazz.arrangement}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                <CourseDetail introItems={intros} overTime={playbackDeadlineSeconds} loggerId={loggerId} />
                <MasterTeachers masterTeachers={masterTeachers} loggerId={loggerId} />
                <CoursePlan clazz={clazz} chapters={chapters} chapterMode={chapterMode} loggerId={loggerId} />
                <CourseComments number={number} chapterMode={chapterMode} loggerId={loggerId} />
            </div>
        );
    }
}

export default connect(s => s)(DetailInfo);
