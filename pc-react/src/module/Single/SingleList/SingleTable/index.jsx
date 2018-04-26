/**
 * 单次课列表内容
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Table, Popconfirm, Tooltip, message, Popover, Input, Button } from 'antd';
import PageController from 'common/controller/PageController';
import SelectModal from 'common/components/SelectModal/index';
import TagImage from 'common/components/TagImage/index';
import service from 'common/util/ajaxService';
import config from 'common/config';
import ajaxConfig from 'common/ajaxConfig';
import URL from 'common/util/url';
import moment from 'moment';
import Living from 'common/components/Living/index';
require('css-loader!./index.styl');

const url = URL();

export default class SingleTable extends PageController {

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
        if (nextProps.search !== this.state.query) {
            this.setState({
                query: nextProps.search,
                pageNum: 1,
                pageSize: config.PAGE_SIZE.PAGE_SIZE_10
            });
            this.updateQuerySearch(1, nextProps.search);
        }
    }

    /**
     * @override
     */
    componentWillMount() {
        this.updateQuerySearch(1, this.state.query || '');
    }

    /**
     * 表格列配置
     */
    columns = () => {
        return [{
            title: '封面',
            dataIndex: 'cover',
            width: '15%',
            render: (text, record) => {
                return (

                    <div className="single-table-list-image">
                        {
                            record.liveStatus === config.LIVE_STATUS_NUM.LIVE_PLAYING
                                ?
                                <div className="single-living-logo">
                                    <div className="living-logo"><Living /></div>
                                    <div className="living-text">直播中</div>
                                </div>
                                :
                                null
                        }
                        <a target="_blank" href={record.courseUrl}>
                            {
                                record.seq !== 100 ? 
                                <TagImage url={record.coverUrl} tag={record.seq} />
                                :
                                <img src={record.coverUrl} alt="单次课封面" />
                            }
                        </a>
                    </div>
                    
                );
            }
        }, {
            title: '课程名称',
            dataIndex: 'name',
            width: '15%',
            render: (text, record) => (
                <a target="_blank" href={record.courseUrl}><div>{record.name}</div></a>
            )
        }, {
            title: '课程类型',
            dataIndex: 'type',
            width: '12%',
            className: 'single-table-list-course-type',
            render: (text, record) => (
                <span>{config.PLAY_TYPE_STRING[record.courseType]}</span>
            )
        }, {
            title: '直播状态',
            dataIndex: 'liveStatus',
            className: 'single-table-list-course-live',
            width: '12%',
            render: (text, record) => {
                switch (record.liveStatus) {
                    case config.LIVE_STATUS_NUM.LIVE_NULL: {
                        return (
                            <span>{config.LIVE_STATUS_STRING[config.LIVE_STATUS_NUM.LIVE_NULL]}</span>
                        );
                    }
                    case config.LIVE_STATUS_NUM.LIVE_PLAYING: {
                        return (
                            <span className="sm-btn pink-btn classic-btn">{config.LIVE_STATUS_STRING[config.LIVE_STATUS_NUM.LIVE_PLAYING]}</span>
                        );
                    }
                    case config.LIVE_STATUS_NUM.LIVE_NOT_BEGIN: {
                        return (
                            <span className="sm-btn blue-btn classic-btn">{config.LIVE_STATUS_STRING[config.LIVE_STATUS_NUM.LIVE_NOT_BEGIN]}</span>
                        );
                    }
                    case config.LIVE_STATUS_NUM.LIVE_FINISH: {
                        return (
                            <span className="sm-btn grey-btn classic-btn">{config.LIVE_STATUS_STRING[config.LIVE_STATUS_NUM.LIVE_FINISH]}</span>
                        );
                    }
                }
            }
        }, {
            title: '课程售价',
            dataIndex: 'price',
            width: '10%',
            className: 'single-table-list-course-price',
            render: (text, record) => {
                return (
                    <span>{record.price.toFixed(2)}</span>
                );
            }
        }, {
            title: '开讲时间',
            dataIndex: 'beginTime',
            width: '16%',
            className: 'single-table-list-course-time',
            render: (text, record) => {
                let html = (
                    <div>{moment(record.beginTime).format(config.DATE_TIME_FORMAT)}</div>
                );
                if (record.publishStatus === config.COURSE_SHOW.OFFLINE) {
                    html = (
                        <div>
                            <div>{moment(record.beginTime).format(config.DATE_TIME_FORMAT)}</div>
                            <div className="single-table-list-course-time-staus"><i className="icon-ic-prompt-red"></i>已下架</div>
                        </div>
                    );
                }
                return html;
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            className: 'single-table-list-course-operation',
            render: (text, record) => {
                url.params.courseId = record.courseId;
                url.hash = '#/single/edit';
                url.params.seriesId = undefined;
                url.params.from = '/single';
                const popoverContent = (
                    <div className="single-table-list-course-operation-content-popover-content">
                        {/* {
                            record.courseType === config.PLAY_TYPE_NUM.LIVE_COURSE 
                            ?
                            <a onClick={() => { this.handleGetLinks(record.courseId); }}>
                                <span className="video-upload-popover-content-spot"></span>
                                获取助教链接
                            </a>
                            :
                            null
                        } */}
                        <a target="_blank" href={record.courseUrl}>预览</a>
                        <a href={url.toString()}>
                            {
                                record.courseType === config.PLAY_TYPE_NUM.VIDEO_COURSE 
                                ?
                                <span className="video-upload-popover-content-spot"></span>
                                :
                                null
                            }
                            修改
                        </a>
                        <Popconfirm 
                            placement="topRight"
                            title={record.publishStatus === config.COURSE_SHOW.ONLINE ? '确认要下架这个课程吗' : '确认要上架这个课程吗'}
                            onConfirm={
                                () => this.changeStatus(record)
                            }
                            okText="确定" 
                            cancelText="取消"
                            className="popconfirm"
                            overlayClassName="popconfirm-overlay"
                        >
                      {record.publishStatus === config.COURSE_SHOW.ONLINE ? (<a>下架</a>) : (<a>上架</a>)}
                        </Popconfirm>
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
                    <div className="single-table-list-course-operation-content">
                        {
                            // 直播课
                            record.courseType === config.PLAY_TYPE_NUM.LIVE_COURSE
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
                                record.videoStatus === config.VIDEO_TYPE.VIDEO_SUCCESS
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
                                    record.videoStatus === config.VIDEO_TYPE.VIDEO_NULL 
                                    ? 
                                    <a className="single-table-list-course-operation-content-red" href={url.toString() + '#video'}>上传视频</a> 
                                    :
                                    (
                                        record.videoStatus === config.VIDEO_TYPE.VIDEO_TRANSCODE ?
                                        <Tooltip placement="top" title="视频转码中" getPopupContainer={triggerNode => triggerNode.parentNode}>
                                            <a className="single-table-list-course-operation-content-red" href={url.toString() + '#video'}>重新上传</a>
                                        </Tooltip>
                                        :
                                        <Tooltip placement="top" title="视频上传失败" getPopupContainer={triggerNode => triggerNode.parentNode}>
                                            <a className="single-table-list-course-operation-content-red" href={url.toString() + '#video'}>重新上传</a>
                                        </Tooltip>
                                    )
                                )
                            )
                        }
                        {
                            record.courseType === config.PLAY_TYPE_NUM.LIVE_COURSE 
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
                                className="single-table-list-course-operation-content-popover"
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
     * 处理上下架课程
     * @param id 课程id
     */
    changeStatus = (data) => {
        let urlStr;
        if (data.publishStatus === config.COURSE_SHOW.ONLINE) {
            urlStr = ajaxConfig.COURSE.OFFLINE;
        } else {
            urlStr = ajaxConfig.COURSE.ONLINE;
        }
       service
           .post(urlStr, {
                courseId: data.courseId
           })
           .then((res) => {
            if (res && res.code === 200) {
                // message.success('下架成功', 3);
                this.updateQuerySearch(this.state.pageNum, this.state.query);
            }
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
                courseType: config.COURSE_TYPE_NUM.SINGLE_COURSE
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
                courseType: config.COURSE_TYPE_NUM.SINGLE_COURSE
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
            .get('/pc/course/list', {
                classroomId: Number(URL().params.classroomId),
                query: query || '',
                pageNum: pageNum,
                pageSize: config.PAGE_SIZE.PAGE_SIZE_10
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
            pageSize: config.PAGE_SIZE.PAGE_SIZE_10,
            total: this.state.count
        };
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
            <div className="single-table table">
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="single-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '没有相关课程' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.courseId}
                    pagination={this.pagination()}
                />
                <SelectModal isShow={this.state.showModal} onModalClose={this.handleModalClose} title="获取助教链接">
                    <div className="single-table-modal">
                        <div className="single-table-modal-text">复制下面的助教链接并发送给小伙伴，他就可以以“助教”的身份直接进入教室。助教进入教室后可以执行管理学生发言、禁止学生发言、帮助录制课程等操作。</div>
                        {
                            links.map((item, index) => (
                                <div className="single-table-modal-copy" key={item}>
                                    <span>助教{index + 1}：</span>
                                    <Input value={item} readOnly />
                                    <Button className="md-btn classic-btn pink-btn" onClick={this.handleCopy}>复制</Button>
                                </div>
                            ))
                        }
                        <div className="single-table-modal-text">
                            <span>温馨提示：</span>    
                            <p>1.每一节直播课都会有3个助教链接，请及时获取使用。</p>
                            <p>2.助教人员可在浏览器里打开助教链接进入教室，也可在微师直播助手客户端登录页点击【助教登录】输入助教链接进入教室。</p>
                        </div>
                        <div className="single-table-modal-operate">
                            <Button className="md-btn classic-btn pink-btn" onClick={this.handleModalClose}>知道了</Button>
                        </div>
                    </div>
                </SelectModal>
            </div>
        );
    }
}
