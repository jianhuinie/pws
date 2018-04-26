/**
 * 系列课选择单次课的可选择列表
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Table, Button } from 'antd';
import CommonController from 'common/controller/CommonController';
import CourseSearch from 'common/components/CourseSearch/index';
import service from 'common/util/ajaxService';
import CONFIG from 'common/config';
import URL from 'common/util/url';
import moment from 'moment';
require('css-loader!./index.styl');

const params = URL().params;

export default class SeriesSelectSingleTable extends CommonController {

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            query: undefined,
            dataSource: [],
            pageNum: 1,
            selectedRowKeys: []
        };
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/course/list', {
                classroomId: Number(params.classroomId),
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_3
            })
            .then((res) => {
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.courses,
                    ...res.pageDto
                });
            });
    }

    /**
     * @override
     */
    componentWillReceiveProps(nextProps) {
        // 重新打开modal
        if (nextProps.forceUpdate) {
            this.setState({
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_3,
                selectedRowKeys: [],
                query: undefined
            });
            this.updateQuerySearch(1, undefined);
        }
    }

    /**
     * 处理搜索框内容
     */
    handleSearch = (query) => {
        this.setState({
            query: query
        });
        this.updateQuerySearch(1, query);
    }

    /**
     * 用于重新更新页面
     * @param pageNum  请求页数
     * @param pageSize  请求页数显示的条数
     * @param query  搜索内容
     */
    updateQuerySearch = (pageNum, query) => {
        this.setState({
            dataLoading: true
        });
        service
            .get('/pc/course/list', {
                classroomId: Number(params.classroomId),
                query: query || '',
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_3
            })
            .then((res) => {
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.courses,
                    ...res.pageDto
                });
                // 已经强制刷新过
                if (this.props.forceUpdate) {
                    this.props.onCancelForceUpdate();
                }
            });
    }

    /**
     * 处理分页
     */
    handleTableChange = (pagination) => {
        this.updateQuerySearch(pagination.current, this.state.query);
    }

    /**
     * table 分页的props
     */
    pagination = () => {
        return {
            hideOnSinglePage: true,
            className: 'table-pagination',
            current: this.state.pageNum,
            pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_3,
            total: this.state.count
        };
    }

    /**
     * table中的选择
     */
    selection = () => {
        return {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleSelectChange
        };
    }

    /**
     * 处理选择
     */
    handleSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    }

    /**
     * 列表配置
     */
    columns = () => {
        return [{
            dataIndex: 'cover',
            title: '封面',
            width: '13%',
            className: 'series-select-single-table-list-cover',
            render: (text, record) => (
                <img src={record.coverUrl} alt className="series-select-single-table-list-cover-image" />
            )
        }, {
            dataIndex: 'name',
            title: '课程名称',
            width: '38%',
            className: 'series-select-single-table-list-name',
            render: (text, record) => (
                <span>{record.name}</span>
            )
        }, {
            dataIndex: 'type',
            title: '课程类型',
            width: '17%',
            className: 'series-select-single-table-list-type',
            render: (text, record) => (
                <span>{CONFIG.PLAY_TYPE_STRING[record.courseType]}</span>
            )
        }, {
            dataIndex: 'begin',
            title: '开讲时间',
            width: '32%',
            className: 'series-select-single-table-list-begin',
            render: (text, record) => (
                <span>{moment(record.beginTime).format(CONFIG.DATE_TIME_FORMAT)}</span>
            )
        }];
    }

    /**
     * 保存选择的课程
     */
    handleSave = () => {
        service
            .post('/pc/series/addCourse', {
                seriesId: params.seriesId,
                courseIds: this.state.selectedRowKeys
            })
            .then((res) => {
                // 如果正常返回
                if (res) {
                    this.props.onUpdate(true);
                }
            });
    }

    /**
     * @override
     */
    render() {
        return (
            <div className="series-select-single-table table">
                <CourseSearch onCourseSearch={this.handleSearch} placeholder="输入课程名称" />
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="series-select-single-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '没有相关课程' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.courseId}
                    pagination={this.pagination()}
                    rowSelection={this.selection()}
                />
                <div className="series-select-single-table-operation">
                    <Button className="md-btn classic-btn white-btn" onClick={() => { this.props.onUpdate(false); }}>取消</Button>
                    <Button htmlType="submit" className="md-btn classic-btn pink-btn" onClick={this.handleSave}>确定</Button>
                </div>
            </div>
        );
    }
}