import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import Empty from 'module/components/Empty/index';
import imageConfig from 'common/imgConfig';
import ListItem from './components/ListItem/index';
import DropLoad from 'gsx-design/component/DropLoad/index';
// import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class All extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            isShowDialog: false,
            isShowNoMore: false,
            pageNum: 1,
            loading: true
        };
    }

    componentDidMount() {
        const me = this;
        document.title = '全部课程';
        this.getPurchaseRecord();  
        this.dropLoad = new DropLoad({
            element: $('.all-course-list'),
            callback: me.getPurchaseRecord
        });
        // Util.sharePage();
    }

    componentWillUnmount() {
        if (this.dropLoad) {
            this.dropLoad.dispose();
            this.dropLoad = null;
        }
    }

    /**
     * 获取购买记录
     */
    getPurchaseRecord = () => {
        const me = this;
        let pageNum = this.state.pageNum;
        return ajax.get(ajaxConfig.COURSE.GET_RECENT_LEARN_LIST, {
            pageNum: pageNum
        }).then((res) => {
            const courses = res.data.courses;
            const noMore = courses.length < 10;
            const isShowNoMore = pageNum > 1 && noMore;
            if (noMore) {
                me.dropLoad.dispose();
                me.dropLoad = null;
            }
            this.setState({
                loading: false,
                pageNum: ++pageNum,
                isShowNoMore: isShowNoMore,
                courses: this.state.courses.concat(courses)
            });
        });
    }

    render() {
        if (!this.state.loading && !this.state.courses.length) {
            return (
                <Empty
                    image={imageConfig.EMPTY.RECENT_LEARN}
                    emptyText="最近没有要学习的课程"
                    buttonText="去发现"
                    redirect="/mweb/discovery"
                />
            );
        }
        return (
            <div className="all-course">
                <ul className="all-course-list">
                {
                    this.state.courses.map((course) => {
                        return (
                            <li key={course.id + course.courseMode} className="all-course-list-item">
                                <ListItem {...course} />
                            </li>
                        );
                    })
                } 
                </ul>
                {
                    this.state.isShowNoMore 
                        ?
                            <div className="no-more">没有更多内容了</div>
                        :
                            null
                }
            </div>
        );
    }
};
