/**
 * 系列课控制选择或是新建单次课
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Button, Popover } from 'antd';
import CourseSearch from 'common/components/CourseSearch/index';
import CommonController from 'common/controller/CommonController';
import SeriesSingleTable from '../SeriesSingleTable/index';
import SeriesSelectSingleTable from '../SeriesSelectSingleTable/index';
import SelectModal from 'common/components/SelectModal/index';
import URL from 'common/util/url';
require('css-loader!./index.styl');

export default class SeriesSingleList extends CommonController {

    constructor(props) {
        super(props);
        this.state = {
            query: undefined,
            showModal: false,
            forceUpdateTable: false,
            forceUpdataModal: false
        };
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
     * 处理选择已有单次课
     */
    handleSelectSingle = () => {
        this.setState({
            showModal: true,
            showPopover: false
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
     * 设置取消单次课table强制刷新
     */
    handleCancelTableForceUpdate = () => {
        this.setState({
            forceUpdateTable: false
        });
    }

    /**
     * 设置取消单次课modal强制刷新
     */
    handleCancelModalForceUpdate = () => {
        this.setState({
            forceUpdateModal: false
        });
    }

    /**
     * 选择过单次课后，需要更新的部分
     */
    handleListUpdate = (isUpdate) => {
        if (isUpdate) {
            this.setState({
                forceUpdateTable: true,
                showModal: false,
                forceUpdateModal: true
            });
        } else {
            this.setState({
                showModal: false,
                forceUpdateModal: true
            });
        }
    }

    /**
     * @override
     */
    render() {
        const url = URL();
        url.params.courseId = undefined;
        url.hash = '#/single/edit';
        url.params.from = '/series/detail';
        const popoverContent = (
            <div className="series-single-list-operation-popover-content">
                <a href={url.toString()}>
                    <span className="series-single-list-operation-popover-content-spot"></span>
                    新建
                </a>
                <a onClick={() => { this.handleSelectSingle(); }}>选择已有</a>
            </div>
        );
        return (
            <div className="series-single-list">
                <div className="series-single-list-operation">
                    <div className="series-single-list-operation-add">
                        <Popover 
                            content={popoverContent} 
                            placement="bottom" 
                            trigger="click"
                            visible={this.state.showPopover}
                            className="series-single-list-operation-popover"
                            getPopupContainer={triggerNode => triggerNode.parentNode}
                            onVisibleChange={this.handleVisiblePopoverChange}
                        >
                            <Button className="classic-btn pink-btn series-single-list-operation-add-button">添加单次课</Button>
                        </Popover>
                        <SelectModal isShow={this.state.showModal} onModalClose={this.handleModalClose} title="选择课程">
                            <SeriesSelectSingleTable onUpdate={this.handleListUpdate} forceUpdate={this.state.forceUpdateModal} onCancelForceUpdate={this.handleCancelModalForceUpdate} />
                        </SelectModal>
                    </div>
                    <CourseSearch onCourseSearch={this.handleSearch} placeholder="输入课程名称" />
                </div>
                <SeriesSingleTable search={this.state.query} forceUpdate={this.state.forceUpdateTable} onCancelForceUpdate={this.handleCancelTableForceUpdate} />
            </div>  
        );
    }
}