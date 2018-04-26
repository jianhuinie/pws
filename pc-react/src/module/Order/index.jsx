/**
 * 课堂收益
 * 
 * @author zhaoxiudan@baijiahulian.com 
 * 2018/1/15
 */

import React from 'react';
import { Breadcrumb, Table, Button } from 'antd';
import PageController from 'common/controller/PageController';
import CourseDatePicker from 'common/components/CourseDatePicker/index';
import service from 'common/util/ajaxService';
import URL from 'common/util/url';
import util from 'common/util/util';
import CONFIG from 'common/config';
import moment from 'moment';
require('css-loader!./index.styl');

const params = URL().params;

const DEFAULT_END = +new Date(moment().format('YYYY-MM-DD') + ' 23:59:59');
const DEFAULT_BEGIN = DEFAULT_END - 30 * 24 * 60 * 60 * 1000 + 1000;

export default class Order extends PageController {

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
     * @override
     */
    componentDidMount() {
        util.renderLeftSider();
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
            .get('/pc/finance/order/list', {
                classroomId: Number(params.classroomId),
                beginTime: this.query.beginTime,
                endTime: this.query.endTime,
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            })
            .then((res) => {
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.orders,
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
            title: '支付时间',
            dataIndex: 'payTime',
            width: '18%',
            render: (text, record) => (
                <span>{moment(record.payTime).format(CONFIG.DATE_TIME_FORMAT)}</span>
            )
        }, {
            title: '头像/昵称',
            dataIndex: 'person',
            width: '20%',
            render: (text, record) => (
                <div className="order-table-list-person">
                    <img src={record.url} alt />
                    <span>{record.nickName}</span>
                </div>
            )
        }, {
            title: '类型',
            dataIndex: 'courseType',
            width: '16%',
            render: (text, record) => (
                <span>{CONFIG.INCOME_COURSE_TYPE_STRING[record.courseType]}</span>
            )
        }, {
            title: '名称',
            dataIndex: 'name',
            width: '18%',
            render: (text, record) => (
                <span className="order-table-list-name">{record.courseName}</span>
            )
        }, {
            title: '订单金额',
            dataIndex: 'price',
            width: '12%',
            className: 'order-table-list-num',
            render: (text, record) => (
                <span>{record.price.toFixed(2)}</span>
            )
        }, {
            title: '实际收益',
            dataIndex: 'income',
            width: '16%',
            className: 'order-table-list-num',
            render: (text, record) => (
                <span>{record.income.toFixed(2)}</span>
            )
        }];
    }

    /**
     * @override
     */
    render() {
        const self = this;
        return (
            <div className="child-page">
                <Breadcrumb>
                    <Breadcrumb.Item>{params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>财务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className="table order-table">
                    <div className="order-table-operation">
                        <div className="order-table-operation-canlender">
                            <CourseDatePicker isRange={true} defaultBegin={DEFAULT_BEGIN} defaultEnd={DEFAULT_END} onStartChange={this.handleStartChange} onEndChange={this.handleEndChange} disabledDate={() => (false)} />
                            <Button className="order-table-operation-btn classic-btn white-btn" onClick={this.handleChangeTime}>查看</Button>
                        </div>
                        <a
                            // target="_blank"
                            href={`/pc/finance/export?classroomId=${params.classroomId}&type=${CONFIG.EXPORT_TYPE.ORDER}&courseType=${CONFIG.INCOME_COURSE_TYPE_NUM.ALL}&beginTime=${this.query.beginTime}&endTime=${this.query.endTime}`}>
                            <Button className="md-btn classic-btn white-btn">导出数据</Button>
                        </a>
                    </div>
                    <Table 
                        columns={this.columns()} 
                        dataSource={this.state.dataSource}
                        className="order-table-list"
                        locale={{ emptyText: this.state.dataLoading ? '' : '没有查询到相关内容' }}
                        onChange={this.handleTableChange}
                        rowKey={record => record.orderId}
                        pagination={this.pagination()}
                    />
                </div>
            </div>
        );
    }
}