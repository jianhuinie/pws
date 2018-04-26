/**
 * 视频库列表
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Breadcrumb, Button, Upload, Progress } from 'antd';
import CourseSearch from 'common/components/CourseSearch/index';
import VideoTable from './VideoTable/index';
import SelectModal from 'common/components/SelectModal/index';
import URL from 'common/util/url';
import service from 'common/util/ajaxService';
import util from 'common/util/util';
require('css-loader!./index.styl');

export default class VideoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: undefined,
            tableForceUpdate: false,
            showSelectModal: false
        };
        this.cancelUpload = false;
    }

    /**
     * @override
     */
    componentDidMount() {
        util.renderLeftSider();
    }

    /**
     * 处理搜索
     */
    handleSearch = (value) => {
        this.setState({
            query: value
        });
    }

    /**
     * 图片上传之前的处理
     * @param {File} file
     * @param {File[]} fileList
     * @returns {any}
     */
    hanldePrepareUpload = (file) => {
        this.file = file;
        this.cancelUpload = false;
        this.setState({
            fileName: file.name,
            percent: 0,
            showSelectModal: true
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
        console.log(file);
        console.log(event);
        if (event) {
            this.setState({
                percent: event.percent,
                loaded: Math.round(event.loaded / (1024 * 1024)),
                total: Math.round(event.total / (1024 * 1024))
            });
        }
        if (file.status === 'done') {
            // 成功上传且没有取消上传
            if (file.response.code === 1 && !this.cancelUpload) {
                this.handleModalClose();
                service
                    .post('/pc/video/add', {
                        fileName: file.name,
                        playVideoId: this.state.playVideoId
                    })
                    .then(() => {
                        this.setState({
                            tableForceUpdate: true
                        });
                    });
            }
        }
    }

    /**
     * 关闭Modal
     */
    handleModalClose = () => {
        this.setState({
            showSelectModal: false
        });
    }

    /**
     * 取消上传
     */
    handleCancelUpload = () => {
        this.refs.upload.handleManualRemove(this.file);
        this.cancelUpload = true;
        this.setState({
            playVideoId: undefined,
            fileName: undefined,
            percent: 0,
            showSelectModal: false
        });
        service
            .post('/pc/video/cancel', {
                playVideoId: this.state.playVideoId
            });  
    }

    /**
     * 不强制table刷新
     */
    handleCancelForceUpdate = () => {
        this.setState({
            tableForceUpdate: false
        });
    }

    /**
     * render
     */
    render() {
        const state = this.state;
        return (
            <div className="video-list">
                <Breadcrumb>
                    <Breadcrumb.Item>{URL().params.name}</Breadcrumb.Item>
                    <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                    <Breadcrumb.Item>视频库</Breadcrumb.Item>
                </Breadcrumb>
                <div className="video-list-operation">
                    <div className="video-list-operation-add">
                        <Upload
                            ref="upload"
                            accept="video/wmv, video/avi, video/dat, video/asf, video/rm, video/rmvb, video/ram, video/mpg, video/mpeg, video/3gp, video/mov, video/mp4, video/m4v, video/dvix, video/dv, video/mkv, video/flv, video/vob, video/qt, video/divx, video/cpk, video/fli, video/flc, video/mod"
                            action={state.uploadUrl}
                            showUploadList={false}
                            listType="text"
                            beforeUpload={this.hanldePrepareUpload}
                            onChange={this.handleChangeUpload}
                        >
                            <Button className="classic-btn pink-btn video-list-operation-add-button">上传视频</Button>
                        </Upload> 
                    </div>
                    <CourseSearch onCourseSearch={this.handleSearch} placeholder="输入关键词" />
                </div>
                <SelectModal isShow={state.showSelectModal} className="video-list-select-modal" onModalClose={this.handleModalClose} title="上传视频" closable={false} maskClosable={false}>
                    <div className="video-list-process-content">
                        <Button className="classic-btn video-btn">{state.fileName}</Button>
                        <Progress percent={state.percent} format={(percent) => (percent.toFixed(2) + '%')} />
                        <div>
                            <span className="video-list-process-content-num">{state.loaded}MB / {state.total}MB</span>
                            {
                                state.playVideoId 
                                ?
                                <Button className="classic-btn video-cancel-btn" onClick={this.handleCancelUpload}>取消上传</Button>
                                :
                                null
                            }
                        </div>
                    </div>
                </SelectModal>
                <VideoTable 
                    search={state.query} 
                    forceUpdate={state.tableForceUpdate} 
                    onCancelForceUpdate={this.handleCancelForceUpdate}
                />
            </div>
        );
    }
}