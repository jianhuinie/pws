/**
 * 课堂收益的列表
 *
 * zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import CommonController from 'common/controller/CommonController';
import { Table, Button } from 'antd';
import Selection from 'common/components/Selection/index';
import service from 'common/util/ajaxService';
import CONFIG from 'common/config';
import URL from 'common/util/url';
require('css-loader!./index.styl');

const params = URL().params;

export default class IncomeTable extends CommonController {

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            courseType: 0,
            dataSource: [],
            pageNum: 1
        };
    }

    /**
     * @override
     */
    componentWillMount() { 
        this.updateQuerySearch(1, this.state.courseType);
    }

    /**
     * 用于重新更新页面
     * @param pageNum  请求页数
     * @param courseType 课程类型
     */
    updateQuerySearch = (pageNum, courseType) => {
        this.setState({
            dataLoading: true
        });
        service
            .get('/pc/finance/classroom/list', {
                classroomId: Number(params.classroomId),
                courseType: courseType,
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
        this.updateQuerySearch(pagination.current, this.state.courseType);
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
     * 处理选择课程类型
     */
    handleSelectionChange = (value) => {
        this.setState({
            courseType: value
        });
        this.updateQuerySearch(1, value);
    }

    /**
     * 表格列配置
     */
    columns = () => {
        return [{
            title: '标题',
            dataIndex: 'name',
            width: '26%',
            render: (text, record) => (
                <span>{record.courseName}</span>
            )   
        }, {
            title: '单价(元)',
            dataIndex: 'price',
            width: '14%',
            className: 'income-table-list-num',
            render: (text, record) => (
                <span>{record.price.toFixed(2)}</span>
            )
        }, {
            title: '付费人数(个)',
            dataIndex: 'payCnt',
            width: '20%',
            className: 'income-table-list-num',
            render: (text, record) => (
                <span>{record.payCnt}</span>
            )
        }, {
            title: '收入(元)',
            dataIndex: 'income',
            width: '20%',
            className: 'income-table-list-num',
            render: (text, record) => (
                <span>{record.income.toFixed(2)}</span>
            )
        }, {
            title: '净收益(元)',
            dataIndex: 'netIncome',
            width: '20%',
            className: 'income-table-list-num',
            render: (text, record) => (
                <span>{record.netIncome.toFixed(2)}</span>
            )
        }];
    }

    /**
     * @override
     */
    render() {
        const courseTypeSelectOption = [{
            id: CONFIG.INCOME_COURSE_TYPE_NUM.ALL,
            name: CONFIG.INCOME_COURSE_TYPE_STRING[CONFIG.INCOME_COURSE_TYPE_NUM.ALL]
        }, {
            id: CONFIG.INCOME_COURSE_TYPE_NUM.LIVE,
            name: CONFIG.INCOME_COURSE_TYPE_STRING[CONFIG.INCOME_COURSE_TYPE_NUM.LIVE]
        }, {
            id: CONFIG.INCOME_COURSE_TYPE_NUM.VIDEO,
            name: CONFIG.INCOME_COURSE_TYPE_STRING[CONFIG.INCOME_COURSE_TYPE_NUM.VIDEO]
        }, {
            id: CONFIG.INCOME_COURSE_TYPE_NUM.SERIES,
            name: CONFIG.INCOME_COURSE_TYPE_STRING[CONFIG.INCOME_COURSE_TYPE_NUM.SERIES]
        }];
        return (
            <div className="income-table table">
                <div className="income-table-operation">
                    <Selection onSelectionChange={this.handleSelectionChange} defaultValue={courseTypeSelectOption[0].id} options={courseTypeSelectOption} />
                    <a
                        // target="_blank"
                        href={`/pc/finance/export?classroomId=${params.classroomId}&type=${CONFIG.EXPORT_TYPE.INCOME}&courseType=${this.state.courseType}`}
                    >
                        <Button className="md-btn classic-btn white-btn">导出数据</Button>
                    </a>
                </div>
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="income-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '暂无收入' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.id}
                    pagination={this.pagination()}
                />
            </div>
        );
    }

}
