/**
 * 老师端推送课程列表
 * @author zhainingning
 */
import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import habo from 'habo';
import {withRouter} from 'next/router';
import {getPushCourseList} from '~/service/livePush';
import CourseItem from '../components/CourseItem';

import PushCourse from '../pushCourse';
import Icon from '~/components/Icon';

import './index.styl';

// const interMod = mod => mod.default || mod;

class TeacherLivePushCourseList extends PureComponent {

    static propTypes = {
        courseNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        json: PropTypes.shape({
            code: PropTypes.number.isRequired,
            data: PropTypes.object
        }).isRequired
    }

    static async getInitialProps({query: {courseNumber}}) {
        if (!courseNumber) {
            return {};
        }
        const {code, loggerId, data, msg, path, ts} = await getPushCourseList({number: courseNumber});
        return {json: {code, loggerId, data, msg, path, ts}, courseNumber};
    }

    constructor(props) {
        super(props);
        const {courseNumber, json} = this.props;
        let state = {
            courseNumber: courseNumber | 0,
            courseList: [],
            requestSuccess: true
        };
        if (json) {
            const {
                code,
                data,
            } = json;
            if (code === 0) {
                const {recommendCourses} = data;
                state = {
                    ...state,
                    courseList: recommendCourses,
                    requestSuccess: !!recommendCourses.length,
                };
            }
        }

        this.state = state;
    }

    componentDidMount() {
        // top.postMessage({
        //     cmd: 1,
        //     from: 'haoke',
        //     type: 'recommendCourse',
        //     data: {
        //     }
        // }, '*');

        this.load();
        this.setHaboConfig();
    }

    // 关闭弹窗
    onCancel = () => {
        top.postMessage({
            cmd: 2,
            from: 'haoke',
            type: 'recommendCourse',
            data: {
            }
        }, '*');
    }


    onPush = number => {
        this.setState({
            pushCourse: true,
            selectCourseNumber: number
        });
    }

    goBack = () => {
        this.setState({
            pushCourse: false
        }, () => {
            this.load();
        });
    }

    async load() {
        if (!process.browser) {
            return;
        }

        let {
            json,
            courseNumber
        } = this.props;
        console.log(json);
        if (!json || json.code !== 0) {
            json = await getPushCourseList({number: courseNumber});
            const {recommendCourses} = json.data || {};
            if (json.code === 0) {
                this.setState({
                    courseList: recommendCourses,
                    requestSuccess: !!recommendCourses.length,
                });
            }
        }
    }

    // 设置habo上报perf config
    setHaboConfig = () => {
        habo.perf.setConfig({
            path() {
                return window.location.pathname.replace(/\/(\d+)$/g, '');
            }
        });
    }

    render() {
        // const self = this;
        const {courseList, courseNumber, requestSuccess, pushCourse, selectCourseNumber} = this.state;
        const courseListComponent = courseList.map((item, index) => {
            return (
                <CourseItem
                    item={item}
                    key={item.number}
                    index={index}
                    listCourseNumber={courseNumber}
                    onPush={this.onPush}
                />
            );
        });

        return (
            <div>
                {
                    pushCourse ? (
                        <PushCourse
                            onGoBack={this.goBack}
                            selectCourseNumber={selectCourseNumber}
                        />
                    ) : (
                        <div className="teacher-course-list">

                            <Head>
                                <title>
                                    {'课程推荐列表'}
                                </title>
                            </Head>
                            <div className="view-title">
                                <p>
                                    <span>课程推荐</span>
                                    <Icon type="guanbi" onClick={this.onCancel} />
                                </p>
                            </div>
                            <div className="view-content">
                                {requestSuccess ? (
                                    <div className="course-ul">
                                        {courseListComponent}
                                    </div>
                                ) : (
                                    <div>
                                        <p>暂无推荐课程</p>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    )
                }


            </div>
        );
    }
}

export default withRouter(TeacherLivePushCourseList);
