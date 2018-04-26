import React from 'react';
import PageController from 'common/controller/PageController';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import ListItem from './ListItem/index';
import GiftDialog from 'module/components/GiftDialog/index';
import GuideDialog from 'module/components/GuideDialog/index';
import Operation from 'module/components/Operation/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');
export default class Center extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        document.title = '新人礼包';
        ajax.get(ajaxConfig.USER.GET_GIFT_COURSES).then((res) => {
            this.setState({
                courses: res.data.courses
            });
        });
        Util.sharePage();
    }

    render() {
        return (
            <div className="gift-detail">
                <img className="gift-detail-logo" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4ee43d05d6f.png" />
                <div className="gift-detail-desc">可在【首页】-【我的课程】中查看</div>
                <a href="/mweb/student/course"><button className="ws-btn-red gift-detail-button">马上学习</button></a>
                <div className="gift-detail-title">礼包课详情</div>
                <ul className="gift-detail-content">
                    {
                        this.state.courses.map((course) => {
                            return (
                                <li key={course.id + course.courseMode}>
                                    <ListItem {...course} />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
};
