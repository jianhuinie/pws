/**
 * 一对一筛选
 * @author huangshiming
 * @data 2017/04/12
 */

import React from 'react';
import { hashHistory } from 'react-router';
import Nav from './components/Nav/index';
import List from './components/List/index';
import HasMore from './components/HasMore/index';
import Empty from './components/Empty/index';
import PageController from 'spa/common/controller/PageController';

const $ = require('zepto');
// const url = require('util/url');
const UTIL = require('common/util');
const service = require('common/service');
const app = require('common/app');
const Loading = require('common/ui/Loading/index');
const setShare = require('common/share/initialize');
let load;
let ajaxFlag = true;
let urlObj;
require('css-loader!./index.styl');

export default class Search extends PageController {
    constructor(props) {
        urlObj = UTIL.getHashParams();
        super(props);
        this.state = {
            course: {
                list: [],
                selected: [0, 0, 0],
                selected_name: ''
            },
            lessonWayArray: [],
            sortWayArray: [],
            lessonWay: '不限',
            sortWay: '智能排序',
            choose: {
                sex: [],
                school_age: [],
                price_range: []
            },
            list: [],
            params: {
                subject_id: +urlObj.subject_id || 100,
                lng: urlObj.lng || null,
                lat: urlObj.lat || null,
                address: urlObj.addressName || null,
                lesson_way: 0,
                sort: 'all',
                sex: 0,
                school_age: 0,
                price_range: 0
            },
            hasMore: 0,
            current_page: 2,
            ajaxFlag: true,
            showEmptyContentFlag: 0
        };
        this.getList = this.getList.bind(this);
        this.getChooseItemForList = this.getChooseItemForList.bind(this);
        this.getMoreAjax = this.getMoreAjax.bind(this);
        document.title = '跟谁学优选1对1';
    }
    analysis() {
        this.pvOptions = {
            params: {
                subject_id: urlObj.subject_id
            }
        };
        super.analysis();
    }
    componentDidMount() {
        load = new Loading();
        this.getList(this.state.params, 'reload');
        setShare({
            title: '跟谁学『优选1对1』 - 名师个性化辅导',
            content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
            url: location.origin + '/webapp/#/one2one/best/se/detail'
        });
    }

    componentWillReceiveProps() {
        const self = this;
        const stateObj = self.state;
        stateObj.params = {
            subject_id: +urlObj.subject_id || 100,
            lng: urlObj.lng || null,
            lat: urlObj.lat || null,
            address: urlObj.address || null,
            lesson_way: 0,
            sort: 'all',
            sex: 0,
            school_age: 0,
            price_range: 0
        };
        self.setState(stateObj);
        self.getList(self.state.params, 'reload');
    }

    // getUrlParams() {
    //     const urlStr = url().hash.split('?')[1];
    //     const dataObj = {};

    //     if (urlStr) {
    //         const urlArr = urlStr.split('&');
    //         $.each(urlArr, function (key, value) {
    //             const tempArr = value.split('=');
    //             dataObj[tempArr[0]] = decodeURIComponent(tempArr[1]);
    //         });
    //     }
    //     return dataObj;
    // }

    getList(objects, type) {
        const objectParams = objects || {};
        if (ajaxFlag) {
                ajaxFlag = false;
                if (type === 'reload') {
                    load.show();
                }
                service
                .post('/preferredOneOnOne/search', objectParams)
                .then((res) => {
                    if (+res.code === 0) {
                        const data = res.data;
                        const filter = data.filter;
                        let emptyContentFlag = 0;
                        let list = [];
                        const self = this;
                        if (type === 'reload') {
                            list = data.teacher_list;
                            if (list.length === 0) {
                                emptyContentFlag = 1;
                            } else {
                                emptyContentFlag = 0;
                            }
                        } else {
                            Array.prototype.push.apply(self.state.list, data.teacher_list);
                            list = self.state.list;
                            emptyContentFlag = 0;
                        }
                        // 取lessonWay的值
                        const lessonWayArray = filter.lesson_way;
                        // 取sort的值
                        const sortWayArray = filter.sort;
                        // 取筛选的一些值
                        const approachObject = filter.approach;
                        // 筛选一些科目的值
                        const courseObject = filter.course;

                        // 筛选的condition
                        const condition = data.condition;

                        const lessonWayName = lessonWayArray.filter(function (item) {
                            if (item.value === +condition.lesson_way) {
                                return item;
                            }
                        });
                        self.setState({
                            lessonWayArray: lessonWayArray,
                            sortWayArray: sortWayArray,
                            choose: approachObject,
                            course: courseObject,
                            list: list,
                            lessonWay: lessonWayName[0].name,
                            hasMore: data.has_more,
                            current_page: +data.next_cursor - 1,
                            params: condition,
                            showEmptyContentFlag: emptyContentFlag 
                        });

                        sortWayArray.forEach(function (item) {
                            if (item.selected) {
                                self.setState({
                                    sortWay: item.name,
                                });
                            }
                        });

                        ajaxFlag = true;
                        if (type === 'reload') {
                            load.hide();
                            $(window).scrollTop(0);
                        }
                    }
            },
            () => {
                if (type === 'reload') {
                    load.hide();
                }
            });
        }
    }

    getChooseItemForList(objects) {
        const object = objects;
        const newSubject = {
            subject_id: objects.subject_id
        };
        $.extend(true, urlObj, newSubject);
        let hashValue = 'one2one/best/se/search?';
        $.each(urlObj, function (key, value) {
            hashValue += key + '=' + value + '&';
        });
        const len = hashValue.length;
        if (hashValue[len - 1] === '&') {
            hashValue = hashValue.substr(0, len - 1);
        }
        console.log(hashValue);
        // const hashValue = 'one2one/best/se/search?subject_id=' + objects.subject_id;
        $.extend(true, object, urlObj);
        hashHistory.push(hashValue);
        object.current_page = 1;
        this.getList(object, 'reload');
    }

    getMoreAjax(objects) {
        const object = this.state.params;
        object.current_page = objects.current_page;
        this.getList(object, 'reload-more');
    }

    render() {
        app.setPageTitle('跟谁学优选1对1');

        return (
            <div className="home">
                <Nav
                lessonWayName={this.state.lessonWay}
                sortWayName={this.state.sortWay}
                lessonWayArray={this.state.lessonWayArray}
                sortWayArray={this.state.sortWayArray}
                chooseObject={this.state.choose}
                courseObject={this.state.course}
                callback={this.getChooseItemForList}
                params={this.state.params}
                />

                <List
                    list={this.state.list}
                />

                <HasMore
                    hasMore={this.state.hasMore}
                    page={this.state.current_page}
                    callback={this.getMoreAjax}
                />

                <Empty
                    flag={this.state.showEmptyContentFlag}
                    page={this.state.current_page}
                />

            </div>
        );
    };
};

