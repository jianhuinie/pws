/**
 * 老师信息
 * @author niejianhui
 */
import React from 'react';
import CONFIG from '~/component/config';
import CropImage from '~/component/CropImage/index';
import './index.styl';

const DEFAULT_HEAD_URL = CONFIG.DEFAULT_HEAD_URL;
export default function TeacherItem(props) {
    const {teacher, showMore, text} = props;
    const teacherName = showMore
        ? `${teacher.displayName}等`
        : teacher.displayName;
    return (
        <div className="teacher-item">
            <div className={showMore ? 'img-wrapper' : ''}>
                <CropImage width={36} height={36} imgSrc={teacher.avatarUrl || teacher.avatar} />
                <div className={showMore ? 'child-img' : 'hide'}>
                    <img src={DEFAULT_HEAD_URL} alt="" />
                </div>
            </div>
            <div>
                <div>
                    {teacherName && teacherName.length > 4
                        ? `${teacherName.slice(0, 4)}...`
                        : teacherName}
                </div>
                <div className="text">
                    {teacher.text ? teacher.text : text}
                </div>
            </div>
        </div>
    );
}
