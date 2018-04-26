/**
 * 单次课选择视频列表
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

export default class SingleSelectVideoTable extends CommonController {

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            query: undefined,
            dataSource: [],
            pageNum: 1,
            selectedRowKeys: [],
            selectedRows: []
        };
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/video/getList', {
                classroomId: Number(params.classroomId),
                query: this.state.query,
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_4
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.videos,
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
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_4,
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
            .get('/pc/video/getList', {
                classroomId: Number(params.classroomId),
                query: query,
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_4
            })
            .then((res) => {
                console.log(res);
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.videos,
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
            pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_4,
            total: this.state.count
        };
    }

    /**
     * table中的选择
     */
    selection = () => {
        return {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleSelectChange
        };
    }

    /**
     * 处理选择
     */
    handleSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows
        });
    }

    /**
     * 列表配置
     */
    columns = () => {
        return [{
            title: '视频ID',
            dataIndex: 'videoId',
            width: '10%',
            render: (text, record) => (
                <span>{record.videoId}</span>
            )
        }, {
            title: '视频名称',
            dataIndex: 'name',
            width: '30%',
            render: (text, record) => (
                <div className="single-select-video-table-list-name">{record.name}</div>
            )
        }, {
            title: '视频状态',
            dataIndex: 'videoStatus',
            className: 'single-select-video-table-list-video-status',
            width: '15%',
            render: (text, record) => {
                switch (record.tranStatus) {
                    case CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED: {
                        return (
                            <span>{CONFIG.VIDEO_UPLOAD_STATUS_STRING[CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED]}</span>
                        );
                    }
                    case CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING: {
                        return (
                            <span className="single-select-video-table-list-video-status-red">{CONFIG.VIDEO_UPLOAD_STATUS_STRING[CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING]}</span>
                        );
                    }
                    case CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_SUCCESS: {
                        return (
                            <span>{CONFIG.VIDEO_UPLOAD_STATUS_STRING[CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_SUCCESS]}</span>
                        );
                    }
                }
            }
        }, {
            title: '视频时长',
            dataIndex: 'time',
            width: '20%',
            className: 'single-select-video-table-list-video-time',
            render: (text, record) => {
                let length = record.length;
                const hour = Math.floor(length / 3600);
                length -= hour * 3600;
                const min = Math.floor(length / 60);
                length -= min * 60;
                return (hour > 0 ? (hour + '小时') : '') + (min > 0 ? (min + '分') : '') + (length > 0 ? length + '秒' : '');
            }
        }, {
            title: '上传人',
            dataIndex: 'operator',
            width: '10%',
            className: 'single-select-video-table-list-operator',
            render: (text, record) => {
                return (
                    <span>{record.operator}</span>
                );
            }
        }, {
            title: '上传时间',
            dataIndex: 'createTime',
            width: '15%',
            className: 'single-select-video-table-list-create-time',
            render: (text, record) => {
                return (moment(record.createTime).format(CONFIG.DATE_TIME_FORMAT));
            }
        }];
    }

    /**
     * @override
     */
    render() {
        return (
            <div className="single-select-video-table table">
                <CourseSearch onCourseSearch={this.handleSearch} placeholder="输入关键词" />
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="single-select-video-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '暂无视频' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.videoId}
                    pagination={this.pagination()}
                    rowSelection={this.selection()}
                />
                <div className="single-select-video-table-operation">
                    <Button 
                        className="md-btn classic-btn white-btn" 
                        onClick={() => { this.props.onVideoSelect(); }}>
                        取消
                    </Button>
                    <Button 
                        htmlType="submit" 
                        className={this.state.selectedRowKeys.length === 0 ? 'md-btn classic-btn grey-btn' : 'md-btn classic-btn pink-btn'} 
                        disabled={this.state.selectedRowKeys.length === 0 ? true : false}
                        onClick={() => {
                            this.props.onVideoSelect(this.state.selectedRowKeys, this.state.selectedRows);
                        }}
                    >
                        确定
                    </Button>
                </div>
            </div>
        );
    }
}