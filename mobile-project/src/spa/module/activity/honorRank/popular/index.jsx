/**
 * 运营活动-人气排行榜
 * @author huangshiming
 * @date 2017/05/05
 */

import React from 'react';
import ItemList from 'spa/module/activity/honorRank/component/ItemList/index';
import MyItem from 'spa/module/activity/honorRank/component/myCard/index';
import HasMore from 'spa/module/activity/honorRank/component/HasMore/index';
import PageController from 'spa/common/controller/PageController';

const $ = require('zepto');
const lazyLoadImage = require('common/lazyLoadImage');
const app = require('common/app');
const service = require('common/service');
const Loading = require('common/ui/Loading/index');
let load;
let ajaxFlag = true;
require('css-loader!./index.styl');

class PopularContainer extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            myItem: {},
            hasMore: 0,
            nextPage: 2
        };
        this.getList = this.getList.bind(this);
        this.getMoreList = this.getMoreList.bind(this);
    }

    componentDidMount() {
        const self = this;
        load = new Loading();
        lazyLoadImage.init();
        self.getList({}, 'reload');
    }

    getList(objects = {}, type) {
        const self = this;
        if (ajaxFlag) {
            ajaxFlag = false;
            if (type === 'reload') {
                load.show();
            }
            const params = {};
            if (objects.page) {
                params.page = objects.page;
            }
            service
            .get('/invite-card-activity/popular-lesson-rank', 
            params)
            .then((res) => {
                if (+res.code === 0) {
                    const data = res.data;
                    let list = [];
                    if (type === 'reload') {
                        list = data.items;
                    } else {
                        Array.prototype.push.apply(self.state.items, data.items);
                        list = self.state.items;
                    }
                    let currentCourse = {};
                    currentCourse = data.current.course;
                    if (!currentCourse) {
                        currentCourse = {};
                    }
                    let currentRank = {};
                    currentRank = data.current.rank;
                    if (!currentRank) {
                        currentRank = {};
                    }
                    const pager = data.pager;
                    const myItem = {
                        img: currentCourse.imgurl,
                        name: currentCourse.name,
                        order: currentRank.rank_order,
                        invite_count: currentRank.invite_count
                    };

                    self.setState({
                        items: list,
                        myItem: myItem,
                        hasMore: pager.has_more ? 1 : 0,
                        nextPage: pager.next_page
                    });

                    const boxList = $('.popular-box');
                    if (type === 'reload') {
                        const paddingBottom = window.innerHeight - boxList.height();
                        if (paddingBottom > 0) {
                            boxList.css({
                                'padding-bottom': paddingBottom + 'px'
                            });
                        }
                    }

                    load.hide();
                }
                ajaxFlag = true;
            });
        }
    }

    getMoreList(data) {
        this.getList(data, 'loadMore');
    }

    render() {
        app.setPageTitle('人气好课榜');
        const type = 'popular';
        return (
            <div className="popular-box">
                <img 
                    className="title-avatar" 
                    data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590c10e2ef82a.png"
                />
                <ItemList
                    list={this.state.items}
                    type={type}
                />

                <HasMore
                    hasMore={this.state.hasMore}
                    page={this.state.nextPage}
                    callback={this.getMoreList}
                />

                <MyItem
                    item={this.state.myItem}
                    type={type}
                    key={type + this.state.myItem.order}
                />
            </div>
        );
    }  
};

export default PopularContainer;