/**
 * 顶导
 * @author niejianhui
 */
import React from 'react';
import util from '~/util/util';
import EventProxy from '~/util/eventProxy';
import CropImage from '~/component/CropImage/index';
// import Search from '~/component/Search/index';
import ajaxConfig from '~/service/constant';
import ajaxService from '~/service/http';
import habo from 'habo';
import './index.styl';

export default class TopBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            courseList: []
        };
    }

    componentDidMount() {
        EventProxy.one('getUserInfo', data => {
            this.setState({
                userInfo: data
            });
            if (data.user_name) {
                const todayDate = util.getToday().value;
                ajaxService
                    .get(ajaxConfig.CLASSROOM.TIMETABLE, {
                        startTime: todayDate,
                        endTime: todayDate
                    })
                    .then(res => {
                        let courseList = res.data[0].schdules;
                        if (courseList.length > 2) {
                            courseList = courseList.splice(0, 2);
                        }
                        this.setState({
                            courseList
                        });
                    });
            }
        });
    }

    toTimeTable = () => {
        location.href = '/pcweb/#/student/manage/cellCourse/MyCourseTable';
    }

    //  退出登录
    handleLogout = () => {
        ajaxService
            .get(ajaxConfig.CLIENTLOGIN.LOGOUT, {
                appType: 6
            })
            .then(() => {
                const href = location.href;
                if (href.indexOf('/pcweb/#/detail/cellClass/') > -1
                    || href.indexOf('/pcweb/#/detail/comboCourse/') > -1
                ) {
                    location.reload();
                } else {
                    location.href = '/';
                }
            });
    };

    render() {
        const {userInfo, courseList} = this.state;
        // 状态对应文案
        const statusMap = {
            ING: '正在直播',
            BEFORE: '未开始',
            AFTER: '已结束'
        };
        let myCourseTable;
        if (userInfo.user_name) {
            myCourseTable = (
                <div>
                    {
                        courseList.length
                            ? (courseList.map(course => {
                                const {beginTime, endTime} = course;
                                return (
                                    <div
                                        className="course analysis-haoke-log"
                                        key={course.id}
                                        data-event-id="25041559"
                                        // onClick={this.toTimeTable}
                                    >
                                        <div className="course-content">
                                            <div>
                                                <span className="course-name">{course.courseName}</span>
                                            </div>
                                            <div>
                                                <span className="course-date">{util.getMdDate(beginTime)}</span>
                                                <span className="course-time">
                                                    {util.replaceSpace(beginTime).slice(-8, -3)}
                                                    {endTime ? ' -' + util.replaceSpace(endTime).slice(-8, -3) : ''}
                                                </span>
                                                {
                                                    course.lessonWay === 32
                                                        ? <span className="course-way">观看视频</span>
                                                        : (
                                                            <span className={'course-way'
                                                            + (util.courseIsLiving(beginTime, endTime) === 'ING'
                                                                ? ''
                                                                : ' not-ing')}
                                                            >
                                                                {
                                                                    statusMap[util.courseIsLiving(beginTime, endTime)]
                                                                }
                                                            </span>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            )
                            : <div className="empty-courses">最近24小时内暂无课程</div>
                    }
                    <div className="action">
                        <a
                            rel="nofollow"
                            className="btn-primary"
                            href="/pcweb/#/student/manage/cellCourse/MyCourseTable"
                        >
                            查看全部
                        </a>
                    </div>
                </div>
            );
        } else {
            myCourseTable = (
                <div>
                    <a
                        rel="nofollow"
                        href="/static/login?next=https%3A%2F%2Fwww.genshuixue.com%2F"
                        className="analysis-haoke-log"
                        data-event-id="15623490"
                    >
                        登录
                    </a>
                    <span className="text-info">查看我的课表</span>
                </div>
            );
        }
        return (
            <div className="top-banner">
                <div className="wrapper">
                    <a className="logo" href="/">
                        <img className="logo-img" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/08/5b84fcc533627.png" alt="" />
                    </a>
                    <span className="set-border"></span>
                    <div className="top-navigators">
                        <div className="item">
                            <a href="/">首页</a>
                        </div>
                        <div className="item">
                            <a href="/static/app">APP下载</a>
                        </div>
                        <div className="item">
                            <a href="/static/liveclient">直播助手</a>
                        </div>
                        {/* <Search /> */}
                        {
                            userInfo.user_name ? (
                                <span className="user-info">
                                    <CropImage domClass="user-avatar" width={40} height={40} />
                                    {/* imgSrc={userInfo.avatar} */}
                                    <span className="sub-menu">
                                        <a href="/pcweb/#/student/manage/cellCourse/MyCourse">我的课程</a>
                                        <a href="/pcweb/#/student/manage/orderList">我的订单</a>
                                        {/* <a
                                            className="analysis-haoke-log"
                                            onClick={this.handleLogout}
                                            data-event-id="15623432"
                                        >
                                            退出登录
                                        </a> */}
                                    </span>
                                </span>
                            ) : (
                                <span className="not-login">
                                    <a
                                        className="login-link"
                                        rel="nofollow"
                                        href="/static/login?next=https%3A%2F%2Fwww.genshuixue.com%2F"
                                    >
                                登录
                                    </a>
                                &nbsp;/&nbsp;
                                    <a
                                        className="register-link analysis-haoke-log"
                                        rel="nofollow"
                                        href="/static/register?user_type=2"
                                        data-event-id="15623499"
                                    >
                                注册
                                    </a>
                                </span>
                            )
                        }
                        <div className="rig-tel">
                            <i className="icon-phone-orange icon-tl"></i>
                            <span>
                                <span className="rig-tel-num">4000-910-910</span><br />
                                <span className="rig-tel-time">每天9:00-21:00</span>
                            </span>
                        </div>
                        <span className="item my-course">
                            <div className="line">|</div>
                            <a target="_blank" href="/pcweb/#/student/manage/cellCourse/MyCourseTable">
                                我的课表
                                <i className="icon-caret-down"></i>
                            </a>
                            <div className="sub-menu">
                                {myCourseTable}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
