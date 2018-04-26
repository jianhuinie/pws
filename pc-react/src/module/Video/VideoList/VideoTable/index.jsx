/**
 * 视频库列表内容
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Table, Popconfirm, message } from 'antd';
import PageController from 'common/controller/PageController';
import SelectModal from 'common/components/SelectModal/index';
import service from 'common/util/ajaxService';
import CONFIG from 'common/config';
import URL from 'common/util/url';
import moment from 'moment';
require('css-loader!./index.styl');

const params = URL().params;

export default class VideoTable extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            query: props.search,
            dataSource: [],
            pageNum: 1,
            showModal: false
        };
        this.player = null;
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
            .get('/pc/video/getList', {
                classroomId: Number(params.classroomId),
                query: this.state.query || '',
                pageNum: 1,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
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
     * 表格列配置
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
            width: '25%',
            render: (text, record) => (
                <div className="video-table-list-name">{record.name}</div>
            )
        }, {
            title: '视频状态',
            dataIndex: 'videoStatus',
            className: 'video-table-list-video-status',
            width: '13%',
            render: (text, record) => {
                switch (record.tranStatus) {
                    case CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED: {
                        return (
                            <span>{CONFIG.VIDEO_UPLOAD_STATUS_STRING[CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_FAILED]}</span>
                        );
                    }
                    case CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING: {
                        return (
                            <span className="video-table-list-video-status-red">{CONFIG.VIDEO_UPLOAD_STATUS_STRING[CONFIG.VIDEO_UPLOAD_STATUS_NUM.TRANS_ING]}</span>
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
            width: '15%',
            className: 'video-table-list-video-time',
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
            className: 'video-table-list-operator',
            render: (text, record) => {
                return (
                    <span>{record.operator}</span>
                );
            }
        }, {
            title: '上传时间',
            dataIndex: 'createTime',
            width: '15%',
            className: 'video-table-list-create-time',
            render: (text, record) => {
                return (moment(record.createTime).format(CONFIG.DATE_TIME_FORMAT));
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '12%',
            className: 'video-table-list-operation',
            render: (text, record) => {
                return (
                    <div className="video-table-list-operation-content">
                        <a onClick={() => { this.handleWatchVideo(record.videoId); }}>预览</a>
                        <Popconfirm 
                            placement="topRight"
                            title="确定要删除这个视频吗" 
                            onConfirm={
                                () => this.handleDeleteVideo(record.videoId)
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
            }
        }];
    }

    /**
     * 观看视频
     */
    handleWatchVideo = (videoId) => {
        if (this.player) {
            this.player = null;
        }
        if ($('#video').html()) {
            $('#video').html('');
        }
        service
            .get('/pc/video/getToken', {
                videoId: videoId
            })
            .then((res) => {
                const data = res.data;
                this.setState({
                    showModal: true
                }, () => {
                    // setTimeout(function () {
                        this.player = new bjcPlayer('#video', {
                            token: data.token,
                            // autoplay: false, // 不支持自动播放
                            definition: 'low', // hign 高清 low 低清
                            onplaybegin: () => {
                                console.log('begin');
                            }
                        });
                        this.player.play(data.playVideoId);
                    // }, 1000);
                });
            });
    }

    /**
     * 处理删除视频
     * @param id 课程id
     */
    handleDeleteVideo = (id) => {
        service
            .post('/pc/video/delete', {
                videoId: id
            })
            .then((res) => {
                if (res && res.code === 200) {
                    message.success('删除成功', 3);
                    this.updateQuerySearch(this.state.pageNum, this.state.query);
                }
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
            .get('/pc/video/getList', {
                classroomId: Number(params.classroomId),
                query: query || '',
                pageNum: pageNum,
                pageSize: CONFIG.PAGE_SIZE.PAGE_SIZE_10
            })
            .then((res) => {
                console.log(res);
                if (res && res.code === 200) {
                    if (res.data.videos.length === 0 && this.state.pageNum > 1) {
                        this.updateQuerySearch(this.state.pageNum - 1, this.state.query);
                    } else {
                        this.setState({
                            dataLoading: false,
                            dataSource: res.data.videos,
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
     * 关闭Modal
     */
    handleCloseModal = () => {
        this.setState({
            showModal: false
        });
        this.player = null;
    }

    /**
     * @override
     */
    render() {
        const falseFlag = false;
        return (
            <div className="video-table table">
                <Table 
                    columns={this.columns()} 
                    dataSource={this.state.dataSource}
                    className="video-table-list"
                    locale={{ emptyText: this.state.dataLoading ? '' : '暂无视频' }}
                    onChange={this.handleTableChange}
                    rowKey={record => record.videoId}
                    pagination={this.pagination()}
                />
                <SelectModal 
                    isShow={this.state.showModal} 
                    onModalClose={this.handleCloseModal} 
                    className="video-table-modal" title="视频预览"
                    maskClosable={falseFlag}
                >
                    <div id="video"></div>
                </SelectModal>
            </div>
        );
    }
}
