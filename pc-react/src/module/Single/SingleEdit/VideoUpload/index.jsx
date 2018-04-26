/**
 * 单次课上传
 * 
 * @author zhaoxiudan@baijiahulian.com
 * 2018/1/18
 */

import React from 'react';
import { Popover, Button, Upload, Progress } from 'antd';
import CommonController from 'common/controller/CommonController';
import SingleSelectVideoTable from '../SingleSelectVideoTable/index';
import SelectModal from 'common/components/SelectModal/index';
import URL from 'common/util/url';
import service from 'common/util/ajaxService';

const url = URL();

require('css-loader!./index.styl');

export default class VideoUpload extends CommonController {

    constructor(props) {
        super(props);
        this.state = {
            showSelectModal: false,
            forceUpdateModal: false,
            showTipModal: false,
            fileName: props.videoName,
            percent: props.videoId ? 100 : undefined,
            loaded: undefined,
            total: undefined,
            uploadUrl: ''
        };
        this.cancelUpload = false;
    }

    /**
     * @override
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            fileName: nextProps.videoName,
            percent: nextProps.videoId ? 100 : undefined
        });
    }

    /**
     * 取消Modal的强制刷新
     */
    handleCancelModalForceUpdate = () => {
        this.setState({
            forceUpdateModal: false
        });
    }

    /**
     * 处理Modal选择后的视频
     */
    handleVideoSelect = (keys, rows) => {
        if (keys) {
            this.setState({
                videoId: keys[0],
                videoName: rows[0].name,
                showSelectModal: false,
                forceUpdateModal: true,
                showTipModal: true
            });
        } else {
            this.setState({
                showSelectModal: false
            });
        }
    }

    /**
     * 处理popover开关
     */
    handleVisiblePopoverChange = (visible) => {
        if (visible !== this.state.showPopover) {
            this.setState({
                showPopover: visible
            });
        }
    }

    /**
     * 显示选择视频
     */
    handleSelectVideo = () => {
        this.setState({
            showSelectModal: true,
            showPopover: false
        });
    }

    /**
     * 关闭选择Modal
     */
    handleModalClose = () => {
        this.setState({
            showSelectModal: false
        });
    }

    /**
     * 关闭提示Modal
     */
    handleTipModalClose = () => {
        this.setState({
            showTipModal: false,
            videoId: undefined,
            videoName: undefined
        });
    }

    /**
     * 重新选择
     */
    handleSelectAgain = () => {
        this.setState({
            showTipModal: false,
            videoId: undefined,
            videoName: undefined,
            showSelectModal: true
        });
    }

    /**
     * 确定选择视频
     */
    handleVideoCertain = () => {
        this.setState({
            showTipModal: false,
            fileName: this.state.videoName,
            percent: 100
        });
        this.handleCourseAddVideo(this.state.videoId);
    }

    /**
     * 确定添加视频
     */
    handleCourseAddVideo = (videoId) => {
        this.props.onCourseAddVideo(videoId);
    }

    /**
     * 图片上传之前的处理
     * @param {File} file
     * @param {File[]} fileList
     * @returns {any}
     */
    hanldePrepareUpload = (file) => {
        this.cancelUpload = false;
        this.setState({
            fileName: file.name,
            percent: 0
        });
        return new Promise((resolve) => {
            service
                .get('/pc/video/getUploadUrl', {
                    fileName: file.name
                })
                .then((res) => {
                    this.setState({
                        uploadUrl: res.data.uploadUrl,
                        playVideoId: res.data.playVideoId
                    }, () => {
                        resolve(file);
                    });
            });
        });
    }

    /**
     * 处理视频上传
     */
    handleChangeUpload = (info) => {
        const { file, event } = info;
        if (event) {
            this.setState({
                percent: event.percent,
                loaded: Math.round(event.loaded / (1024 * 1024)),
                total: Math.round(event.total / (1024 * 1024)),
                showPopover: this.cancelUpload ? this.state.showPopover : false
            });
        }
        if (file.status === 'done') {
            // 成功上传且没有取消上传
            if (file.response.code === 1 && !this.cancelUpload) {
                service
                    .post('/pc/video/add', {
                        fileName: file.name,
                        playVideoId: this.state.playVideoId
                    })
                    .then((res) => {
                        this.handleCourseAddVideo(res.data.videoId);
                    });
            }
        }
    }
    
    /**
     * 取消上传
     */
    handleCancelUpload = () => {
        this.cancelUpload = true;
        service
            .post('/pc/video/cancel', {
                playVideoId: this.state.playVideoId
            }); 
        this.setState({
            fileName: undefined,
            percent: 0,
            playVideoId: undefined
        });
    }

    /**
     * @override
     */
    render() {
        const popoverContent = (
            <div className="video-upload-popover-content">
                <a onClick={() => { this.handleSelectVideo(); }}>
                    <span className="video-upload-popover-content-spot"></span>
                    从视频库选择
                </a>
                <Upload 
                    accept="video/wmv, video/avi, video/dat, video/asf, video/rm, video/rmvb, video/ram, video/mpg, video/mpeg, video/3gp, video/mov, video/mp4, video/m4v, video/dvix, video/dv, video/mkv, video/flv, video/vob, video/qt, video/divx, video/cpk, video/fli, video/flc, video/mod"
                    action={this.state.uploadUrl}
                    showUploadList={false}
                    listType="text"
                    beforeUpload={this.hanldePrepareUpload}
                    onChange={this.handleChangeUpload}
                >
                    <a>从电脑里上传</a>
                </Upload>
            </div>
        );
        const state = this.state;
        return (
            <div className="video-upload">
                <Popover 
                    content={popoverContent} 
                    placement="bottom" 
                    trigger="click"
                    visible={state.showPopover}
                    className="video-upload-popover"
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    onVisibleChange={this.handleVisiblePopoverChange}
                    autoAdjustOverflow={false}
                >
                    <Button className="classic-btn pink-btn md-btn">添加视频</Button>
                </Popover>
                <div className="video-upload-process">
                    {
                        !state.showTipModal && !state.showSelectModal && state.fileName 
                        ?
                        <div className="video-upload-process-content">
                            <Button className="classic-btn video-btn">{state.fileName}</Button>
                            {
                                url.params.courseId 
                                ?
                                null 
                                :
                                <Progress percent={state.percent} width={550} format={(percent) => (percent.toFixed(2) + '%')} />
                            }
                            {
                                state.loaded ?
                                <div>
                                    <span className="video-upload-process-content-num">{state.loaded}MB / {state.total}MB</span>
                                    {
                                        state.playVideoId 
                                        ?
                                        <Button className="classic-btn video-cancel-btn" onClick={this.handleCancelUpload}>取消上传</Button>
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }    
                        </div>
                        :
                        null
                    }
                </div>
                <SelectModal isShow={state.showSelectModal} className="video-upload-select-modal" onModalClose={this.handleModalClose} title="选择已有视频">
                    <SingleSelectVideoTable 
                        onVideoSelect={this.handleVideoSelect} 
                        forceUpdate={state.forceUpdateModal} 
                        onCancelForceUpdate={this.handleCancelModalForceUpdate} 
                    />
                </SelectModal>
                <SelectModal isShow={state.showTipModal} className="video-upload-tip-modal" onModalClose={this.handleTipModalClose} title="确认使用">
                    <div className="video-upload-tip-modal-content">
                        <p>你已选择：</p>
                        <p>{state.videoName}</p>
                        <div className="video-upload-tip-modal-content-operation">
                            <Button className="classic-btn white-btn md-btn" onClick={this.handleSelectAgain}>重新选择</Button>
                            <Button className="classic-btn pink-btn md-btn" onClick={this.handleVideoCertain}>确定使用</Button>
                        </div>
                    </div>
                </SelectModal>
            </div>
        );
    }
}