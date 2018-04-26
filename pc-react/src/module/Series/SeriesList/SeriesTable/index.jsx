/**
 * 系列课列表内容
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Table, Popconfirm } from 'antd';
import CommonController from 'common/controller/CommonController';
import TagImage from 'common/components/TagImage/index';
import service from 'common/util/ajaxService';
import CONFIG from 'common/config';
import URL from 'common/util/url';
import ajaxConfig from 'common/ajaxConfig';
require('css-loader!./index.styl');

const url = URL();

export default class SeriesTable extends CommonController {
    
    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            query: props.search,
            dataSource: [],
            pageNum: 1
        };
    }

    /**
     * @override
     */
    componentWillReceiveProps(nextProps) {
        // 输入搜索后，应返回第一页的内容
        if (nextProps.search !== this.state.query) {
            this.setState({
                query: nextProps.search,
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            });
            this.updateQuerySearch(1, nextProps.search);
        }
    }

    /**
     * @override
     */
    componentWillMount() {
        service
            .get('/pc/series/list', {
                classroomId: Number(url.params.classroomId),
                query: this.state.query || '',
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            })
            .then((res) => {
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.serieses,
                    ...res.pageDto
                });
            });
    }

    /**
     * 处理置顶
     * @param id 课程id
     */
    handleUpTop = (id) => {
        service
            .post('/pc/course/upTop', {
                courseId: id,
                courseType: CONFIG.COURSE_TYPE_NUM.SERIES_COURSE
            })
            .then(() => {
                this.setState({
                    query: ''
                });
                // 置顶后刷新，搜索框的内容不生效，直接看到结果
                this.updateQuerySearch(1, '');
            });
    }
    
    /**
     * 处理取消置顶
     * @param id 课程id
     */
    handleCancelTop = (id) => {
        service
            .post('/pc/course/upDown', {
                courseId: id,
                courseType: CONFIG.COURSE_TYPE_NUM.SERIES_COURSE
            })
            .then(() => {
                this.setState({
                    query: ''
                });
                // 取消置顶后刷新，搜索框的内容不生效，直接看到结果
                this.updateQuerySearch(1, '');
            });
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
            .get('/pc/series/list', {
                classroomId: Number(url.params.classroomId),
                query: query,
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            })
            .then((res) => {
                this.setState({
                    dataLoading: false,
                    dataSource: res.data.serieses,
                    ...res.pageDto
                });
            });
    }

    /**
     * 处理分页
     */
    handleTableChange = (pagination, filters, sorter) => {
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
            pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10,
            total: this.state.count
        };
    }

    /**
     * 列表配置
     */
    columns = () => {
        return [{
            dataIndex: 'cover',
            className: 'series-table-list-cover',
            render: (text, record) => {
                url.params.seriesId = record.seriesId;
                url.hash = '#/series/detail';
                return (
                    <div className="series-table-list-cover-image">
                        <a rel="noopener noreferrer" target="_blank" href={record.seriesUrl}>
                            {
                                record.seq !== 100 ? 
                                <TagImage url={record.coverUrl} tag={record.seq} className="series-table-list-cover-image" />
                                :
                                <img src={record.coverUrl} alt className="series-table-list-cover-image" />
                            }
                        </a>
                        <div className="series-table-list-name-price">
                            <a rel="noopener noreferrer" target="_blank" href={record.seriesUrl}>
                                <div className="series-table-list-name">
                                    {record.name}
                                </div>
                            </a>
                            <div className="single-table-list-staus">
                            {record.publishStatus === CONFIG.SERIES_SHOW.OFFLINE ?
                            <div><i className="icon-ic-prompt-red"></i>已下架</div>
                            :
                            <div></div>
                            }   
                            </div>
                            <div className="series-table-list-price">
                                {record.sellType === CONFIG.SELL_TYPE_NUM.FREE_COURSE ?
                                    <span className="series-table-list-price-free">免费</span>
                                    :
                                    <span className="series-table-list-price-paied">￥{record.price.toFixed(2)}</span>
                                }
                            </div>
                        </div>
                    </div>  
                );
            }
        }, {
            dataIndex: 'operation',
            width: '20%',
            className: 'series-table-list-operation',
            render: (text, record) => {
                url.params.seriesId = record.seriesId;
                url.hash = '#/series/detail';
                return (
                    <div className="series-table-list-operation-content">
                        {
                            record.seq === 100  
                            ?
                            <a onClick={() => { this.handleUpTop(record.seriesId); }}>置顶</a>
                            :
                            <a onClick={() => { this.handleCancelTop(record.seriesId); }}>取消置顶</a>
                        }
                         <Popconfirm 
                            placement="topRight"
                            title={record.publishStatus === CONFIG.SERIES_SHOW.ONLINE ? '确认要下架这个课程吗' : '确认要上架这个课程吗'}
                            onConfirm={
                                () => this.changeStatus(record)
                            }
                            okText="确定" 
                            cancelText="取消"
                            className="popconfirm"
                            overlayClassName="popconfirm-overlay"
                        >
                      {record.publishStatus === CONFIG.SERIES_SHOW.ONLINE ? (<a>下架</a>) : (<a>上架</a>)}
                        </Popconfirm>
                        <a href={url.toString()}>详情</a>
                    </div>
                );
            }
        }];
    }
     /**
     * 处理上下架课程
     * @param id 课程id
     */
    changeStatus = (data) => {
        let urlStr;
        if (data.publishStatus === CONFIG.SERIES_SHOW.ONLINE) {
            urlStr = ajaxConfig.SERIES.OFFLINE;
        } else {
            urlStr = ajaxConfig.SERIES.ONLINE;
        }
       service
           .post(urlStr, {
                seriesId: data.seriesId
           })
           .then((res) => {
            if (res && res.code === 200) {
                // message.success('下架成功', 3);
                this.updateQuerySearch(this.state.pageNum, this.state.query);
            }
        });
    }
    /**
     * @override
     */
    render() {
        return (
            <div className="series-table table">
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="series-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '没有相关课程' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.seriesId}
                    pagination={this.pagination()}
                />
            </div>
        );
    }
}