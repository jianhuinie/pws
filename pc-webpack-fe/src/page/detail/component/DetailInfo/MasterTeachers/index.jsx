/**
 * 主讲老师
 * @author niejianhui
 */
import React from 'react';
import CropImage from '~/component/CropImage/index';
import './index.styl';

export default function MasterTeachers(props) {
    const {masterTeachers, loggerId} = props;
    return (
        <div className="module" id="master-teachers">
            <div className="module-name">
                <span></span>
                主讲老师
                <div className="count">
                    {masterTeachers && masterTeachers.length}
                    位
                </div>
            </div>
            {
                masterTeachers && masterTeachers.map((teacher, index) => (
                    <div
                        className="master-teacher analysis-haoke-log-scroll"
                        data-index={index}
                        data-event-id="27555046"
                        data-logger-id={loggerId}
                        key={teacher.number}
                    >
                        <CropImage width={40} height={40} ImgSrc={teacher.avatarUrl} />
                        <div className="teacher-detail">
                            <div className="name">
                                {teacher.displayName}
                            </div>
                            <div className="intro">
                                {teacher.shortIntroduce}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
