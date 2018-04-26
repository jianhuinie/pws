/**
 * 系列课中的单次课列表显示
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Table, Popconfirm, Tooltip, message, Popover, Input, Button } from 'antd';
import CommonController from 'common/controller/CommonController';
import SelectModal from 'common/components/SelectModal/index';
import TagImage from 'common/components/TagImage/index';
import service from 'common/util/ajaxService';
import CONFIG from 'common/config';
import URL from 'common/util/url';
import moment from 'moment';
require('css-loader!./index.styl');

const url = URL();

export default class SeriesSingleTable extends CommonController {

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            query: props.search,
            dataSource: [],
            pageNum: 1,
            showModal: false,
            links: []
        };
    }

    /**
     * @override
     */
    componentWillReceiveProps(nextProps) {
        // 输入搜索后，应返回第一页的内容
        if (nextProps.forceUpdate || nextProps.search !== this.state.query) {
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
            .get('/pc/series/getCourseList', {
                seriesId: url.params.seriesId,
                query: this.state.query || '',
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
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
     * 处理置顶
     * @param id 课程id
     */
    handleUpTop = (id) => {
        service
            .post('/pc/course/upTop', {
                courseId: id,
                courseType: CONFIG.COURSE_TYPE_NUM.SINGLE_COURSE
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
                courseType: CONFIG.COURSE_TYPE_NUM.SINGLE_COURSE
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
            .get('/pc/series/getCourseList', {
                seriesId: url.params.seriesId,
                query: query,
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            })
            .then((res) => {
                if (res && res.code === 200) {
                    if (res.data.courses.length === 0 && this.state.pageNum > 1) {
                        this.updateQuerySearch(this.state.pageNum - 1, this.state.query);
                    } else {
                        this.setState({
                            dataLoading: false,
                            dataSource: res.data.courses,
                            ...res.pageDto
                        });
                    }
                } 
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
            title: '封面',
            width: '13%',
            className: 'series-single-table-list-cover',
            render: (text, record) => (
                <div className="series-single-table-list-cover-image">
                    {
                        record.seq !== 100 ? 
                        <TagImage url={record.coverUrl} tag={record.seq} />
                        :
                        <img src={record.coverUrl} alt />
                    }
                </div>
            )
        }, {
            dataIndex: 'name',
            title: '课程名称',
            width: '16%',
            className: 'series-single-table-list-name',
            render: (text, record) => (
                <span>{record.name}</span>
            )
        }, {
            dataIndex: 'type',
            title: '课程类型',
            width: '20%',
            className: 'series-single-table-list-type',
            render: (text, record) => (
                <span>{CONFIG.PLAY_TYPE_STRING[record.courseType]}</span>
            )
        }, {
            dataIndex: 'begin',
            title: '开讲时间',
            width: '15%',
            className: 'series-single-table-list-begin',
            render: (text, record) => (
                <span>{moment(record.beginTime).format(CONFIG.DATE_TIME_FORMAT)}</span>
            )
        }, {
            dataIndex: 'operation',
            title: '操作',
            width: '36%',
            className: 'series-single-table-list-operation',
            render: (text, record) => {
                url.params.courseId = record.courseId;
                url.hash = '#/single/edit';
                url.params.from = '/series/detail';
                const popoverContent = (
                    <div className="series-single-table-list-operation-content-popover-content">
                        {/* {
                            record.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE 
                            ?
                            <a onClick={() => { this.handleGetLinks(record.courseId); }}>
                                <span className="video-upload-popover-content-spot"></span>
                                获取助教链接
                            </a>
                            :
                            null
                        } */}
                        <a href={url.toString()}>
                            {
                                record.courseType === CONFIG.PLAY_TYPE_NUM.VIDEO_COURSE 
                                ?
                                <span className="video-upload-popover-content-spot"></span>
                                :
                                null
                            }
                            修改
                        </a>
                        <Popconfirm 
                            placement="topRight"
                            title="确定要删除这个课程吗" 
                            onConfirm={
                                () => this.handleDeleteCourse(record.courseId)
                            }
                            okText="确定" 
                            cancelText="取消"
                            className="popconfirm"
                            overlayClassName="popconfirm-overlay"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                );
                return (
                    <div className="series-single-table-list-operation-content">
                        {
                            // 直播课
                            record.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE
                            ?
                            (
                                record.seq === 100  
                                ?
                                <a onClick={() => { this.handleUpTop(record.courseId); }}>置顶</a>
                                :
                                <a onClick={() => { this.handleCancelTop(record.courseId); }}>取消置顶</a>
                            ) 
                            :
                            (
                                // 视频上传成功
                                record.videoStatus === CONFIG.VIDEO_TYPE.VIDEO_SUCCESS
                                ?
                                (
                                    record.seq === 100 
                                    ?
                                    <a onClick={() => { this.handleUpTop(record.courseId); }}>置顶</a>
                                    :
                                    <a onClick={() => { this.handleCancelTop(record.courseId); }}>取消置顶</a>
                                )
                                : 
                                (
                                    // 没有上传视频
                                    record.videoStatus === CONFIG.VIDEO_TYPE.VIDEO_NULL 
                                    ? 
                                    <a className="series-single-table-list-operation-content-video" href={url.toString() + '#video'}>上传视频</a> 
                                    : 
                                    (
                                        record.videoStatus === CONFIG.VIDEO_TYPE.VIDEO_TRANSCODE ?
                                        <Tooltip placement="top" title="视频转码中" getPopupContainer={triggerNode => triggerNode.parentNode}>
                                            <a className="series-single-table-list-operation-content-video" href={url.toString() + '#video'}>重新上传</a>
                                        </Tooltip>
                                        :
                                        <Tooltip placement="top" title="视频上传失败" getPopupContainer={triggerNode => triggerNode.parentNode}>
                                            <a className="series-single-table-list-operation-content-video" href={url.toString() + '#video'}>重新上传</a>
                                        </Tooltip>
                                    )
                                )
                            )
                        }
                        <a target="_blank" href={record.courseUrl}>预览</a>
                        {
                            record.courseType === CONFIG.PLAY_TYPE_NUM.LIVE_COURSE 
                            ?
                            <a onClick={() => { this.handleGetLinks(record.courseId); }}>
                                <span className="video-upload-popover-content-spot"></span>
                                助教链接
                            </a>
                            :
                            null
                        }
                        <Popover 
                                content={popoverContent} 
                                placement="bottomRight" 
                                trigger="click"
                                className="series-single-table-list-operation-content-popover"
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                autoAdjustOverflow={false}
                            >
                            <a>更多</a>
                        </Popover>
                    </div>
                );
            }
        }];
    }

    /**
     * 处理删除课程
     * @param id 课程id
     */
    handleDeleteCourse = (id) => {
        service
            .post('/pc/course/delete', {
                courseId: id
            })
            .then((res) => {
                if (res && res.code === 200) {
                    message.success('删除成功', 3);
                    this.updateQuerySearch(this.state.pageNum, this.state.query);
                }
            });
    }

    /**
     * 获取助教链接
     */
    handleGetLinks = (id) => {
        service
            .get('/pc/live/createAssistant', {
                courseId: id
            })
            .then((res) => {
                if (res && res.code === 200) {
                    this.setState({
                        showModal: true,
                        links: res.data.links
                    });
                }
            });
    }

    /**
     * 关闭Modal
     */
    handleModalClose = () => {
        this.setState({
            showModal: false
        });
    }

    /**
     * 处理copy
     */
    handleCopy = (e) => {
        e.target.previousSibling.select();
        document.execCommand('copy');
        message.success('复制成功');
    }

    /**
     * @override
     */
    render() {
        const links = this.state.links;
        return (
            <div className="series-single-table table">
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="series-single-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '还没有系列课内容' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.courseId}
                    pagination={this.pagination()}
                />
                <SelectModal isShow={this.state.showModal} onModalClose={this.handleModalClose} title="获取助教链接">
                    <div className="series-single-table-modal">
                        <div className="series-single-table-modal-text">复制下面的助教链接并发送给小伙伴，他就可以以“助教”的身份直接进入教室。助教进入教室后可以执行管理学生发言、禁止学生发言、帮助录制课程等操作。</div>
                        {
                            links.map((item, index) => (
                                <div className="series-single-table-modal-copy" key={item}>
                                    <span>助教{index + 1}：</span>
                                    <Input value={item} readOnly />
                                    <Button className="md-btn classic-btn pink-btn" onClick={this.handleCopy}>复制</Button>
                                </div>
                            ))
                        }
                        <div className="series-single-table-modal-text">
                            <span>温馨提示：</span>    
                            <p>1.每一节直播课都会有3个助教链接，请及时获取使用。</p>
                            <p>2.助教人员可在浏览器里打开助教链接进入教室，也可在微师直播助手客户端登录页点击【助教登录】输入助教链接进入教室。</p>
                        </div>
                        <div className="series-single-table-modal-operate">
                            <Button className="md-btn classic-btn pink-btn" onClick={this.handleModalClose}>知道了</Button>
                        </div>
                    </div>
                </SelectModal>
            </div>
        );
    }
}