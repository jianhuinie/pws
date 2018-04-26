import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import Empty from 'module/components/Empty/index';
import imageConfig from 'common/imgConfig';
import RecordItem from './components/RecordItem/index';
import DropLoad from 'gsx-design/component/DropLoad/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class Follow extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            isShowDialog: false,
            isShowNoMore: false, // 仅当超过一屏时才会显示
            pageNum: 1,
            loading: true
        };
    }

    componentDidMount() {
        const me = this;
        document.title = '购买记录';
        this.getPurchaseRecord();  
        this.dropLoad = new DropLoad({
            element: $('.purchase-record-list'),
            callback: me.getPurchaseRecord
        });
        Util.sharePage();
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
        return ajax.get(ajaxConfig.USER.GET_PURCHASE_RECORD, {
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
                    image={imageConfig.EMPTY.PURCHASE_RECORD}
                    emptyText="你还没有购买课程哦"
                    buttonText="马上选课"
                    redirect="/mweb/discovery"
                />
            );
        }
        return (
            <div className="purchase-record">
                <ul className="purchase-record-list">
                {
                    this.state.courses.map((course) => {
                        return (
                            <li key={course.id + course.courseMode} className="purchase-record-list-item">
                                <RecordItem {...course} />
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
