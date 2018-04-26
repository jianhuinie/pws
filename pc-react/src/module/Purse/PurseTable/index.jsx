/**
 * 课堂收益列表
 * 
 * @author zhaoxiudan@baijiahulian.com 
 * 2018/1/15
 */

import React from 'react';
import { Table, Button } from 'antd';
import PageController from 'common/controller/PageController';
import CourseDatePicker from 'common/components/CourseDatePicker/index';
import service from 'common/util/ajaxService';
import URL from 'common/util/url';
import CONFIG from 'common/config';
import moment from 'moment';
require('css-loader!./index.styl');

const params = URL().params;
const DEFAULT_END = +new Date(moment().format('YYYY-MM-DD') + ' 23:59:59');
const DEFAULT_BEGIN = DEFAULT_END - 30 * 24 * 60 * 60 * 1000 + 1000;

export default class Purse extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            dataSource: [],
            pageNum: 1
        };
        this.query = {
            beginTime: DEFAULT_BEGIN,
            endTime: DEFAULT_END
        };
    }

    /**
     * @override
     */
    componentWillMount() {
        this.updateQuerySearch(1);
    }

    /**
     * 用于重新更新页面
     * @param pageNum  请求页数
     * @param pageSize  请求页数显示的条数
     * @param query  搜索内容
     */
    updateQuerySearch = (pageNum) => {
        this.setState({
            dataLoading: true
        });
        service
            .get('/pc/finance/wallet/list', {
                beginTime: this.query.beginTime,
                endTime: this.query.endTime,
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            })
            .then((res) => {
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.details,
                    ...res.pageDto
                });
            });
    }

    /**
     * 处理分页
     */
    handleTableChange = (pagination) => {
        this.updateQuerySearch(pagination.current);
    }

    /**
     * table 分页的props
     */
    pagination = () => {
        return {
            hideOnSinglePage: true,
            className: 'table-pagination',
            current: this.state.pageNum,
            pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10,
            total: this.state.count
        };
    }

    /**
     * 日期开始时间变化
     */
    handleStartChange = (value) => {
        this.setState({
            beginTime: value
        });
        this.query.beginTime = value;
    }

    /**
     * 日期结束时间变化
     */
    handleEndChange = (value) => {
        this.setState({
            endTime: value
        });
        this.query.endTime = value;
    }

    /**
     * 处理筛选时间的变化
     */
    handleChangeTime = () => {
        this.updateQuerySearch(1);
    }

     /**
     * 表格列配置
     */
    columns = () => { 
        return [{
            title: '时间',
            dataIndex: 'time',
            width: '20%',
            render: (text, record) => (
                <span>{moment(record.time).format(CONFIG.DATE_TIME_FORMAT)}</span>
            )
        }, {
            title: '类型',
            dataIndex: 'type',
            width: '15%',
            className: 'purse-table-list-type',
            render: (text, record) => (
                <span>{CONFIG.INCOME_COURSE_TYPE_STRING[record.type]}</span>
            )
        }, {
            title: '流水变动(元)',
            dataIndex: 'price',
            width: '20%',
            className: 'purse-table-list-num',
            render: (text, record) => (
                <span>{
                    CONFIG.INCOME_COURSE_TYPE_NUM.WITHDRAW === record.type || CONFIG.INCOME_COURSE_TYPE_NUM.PAIED === record.type
                    ?
                    '-' + record.price.toFixed(2).toString()
                    :
                    '+' + record.price.toFixed(2).toString()
                }</span>
            )
        }, {
            title: '说明',
            dataIndex: 'remark',
            width: '45%',
            className: 'purse-table-list-remark',
            render: (text, record) => (
                <span>{record.remark}</span>
            )
        }];
    }

    /**
     * @override
     */
    render() {
        return (
            <div className="table purse-table">
                <div className="purse-table-operation">
                    <div className="purse-table-operation-canlender">   
                        <CourseDatePicker 
                            isRange={true} 
                            defaultBegin={DEFAULT_BEGIN}
                            defaultEnd={DEFAULT_END}
                            onStartChange={this.handleStartChange} 
                            onEndChange={this.handleEndChange} 
                            disabledDate={() => (false)}
                        />
                        <Button className="purse-table-operation-btn classic-btn white-btn" onClick={this.handleChangeTime}>查看</Button>
                    </div>
                    <a 
                        // target="_blank"
                        href={`/pc/finance/export?classroomId=${params.classroomId}&type=${CONFIG.EXPORT_TYPE.PURSE}&courseType=${CONFIG.INCOME_COURSE_TYPE_NUM.ALL}&beginTime=${this.query.beginTime}&endTime=${this.query.endTime}`}>
                        <Button className="md-btn classic-btn white-btn">导出数据</Button>
                    </a>
                </div>
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="purse-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '暂无明细' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.purchaseId}
                    pagination={this.pagination()}
                />
            </div>
        );
    }
}