/**
 * 课程信息
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import TeacherCarousel from '~/component/TeacherCarousel/index';
import CropImage from '~/component/CropImage/index';
import config from '~/page/detail/config';
import {Tooltip} from 'antd';
import BottomInfo from './bottomInfo/index';
import './index.styl';

class CourseInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            cellClass: {
                classInfo: {clazz},
                teacherInfo,
                bottomInfo
            }
        } = this.props;
        const serviceComponent = config.map(item => {
            let html = '';
            if (clazz.services & item.key) {
                html = (
                    <Tooltip
                        placement="bottom"
                        key={item.key}
                        title={item.content}
                    >
                        <span>
                            {item.title}
                        </span>
                    </Tooltip>
                );
            }
            return html;
        });
        return (
            <div className="course-info">
                <div className="wrapper">
                    <CropImage domClass="cover-img" width={605} height={340} ImgSrc={clazz.coverUrl} />
                    <div className="detail-info-box">
                        <div className="title">
                            {clazz.name}
                        </div>
                        <div className="plan">
                            <span>课程安排：</span>
                            <span className="detail">
                                共
                                {clazz.lessonCount}
                                节课
                            </span>
                        </div>
                        <div className="services">
                            <span>课程服务：</span>
                            <div className="detail label-service">
                                {serviceComponent}
                            </div>
                        </div>
                        <div className="teachers">
                            {
                                teacherInfo.masterTeachers
                                    && (
                                        <TeacherCarousel
                                            masterTeachers={teacherInfo.masterTeachers}
                                            assistantTeachers={teacherInfo.salesTeacher}
                                            showNumber={4}
                                        />
                                    )
                            }
                        </div>
                        {
                            bottomInfo.scheme && <BottomInfo bottomInfo={bottomInfo} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(s => s)(CourseInfo);
