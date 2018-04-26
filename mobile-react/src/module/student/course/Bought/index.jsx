import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import Empty from 'module/components/Empty/index';
import imageConfig from 'common/imgConfig';
import ListItem from './components/ListItem/index';
import LivingAnimation from 'common/components/LivingAnimation/index';
import DropLoad from 'gsx-design/component/DropLoad/index';
// import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class Bought extends PageController {

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
        document.title = '已购课程';
        this.getCourses();  
        this.dropLoad = new DropLoad({
            element: $('.has-buy-list'),
            callback: me.getCourses
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
    getCourses = () => {
        const me = this;
        let pageNum = this.state.pageNum;
        return ajax.get(ajaxConfig.COURSE.GET_HAVE_BUY_LIST, {
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
                    image={imageConfig.EMPTY.WILL_START}
                    emptyText="最近没有要学习的课程"
                    buttonText="去发现"
                    redirect="/mweb/discovery"
                />
            );
        }
        return (
            <div className="has-buy">
                <ul className="has-buy-list">
                {
                    this.state.courses.map((course) => {
                        return (
                            <li key={course.id + course.courseMode} className="has-buy-list-item">
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
