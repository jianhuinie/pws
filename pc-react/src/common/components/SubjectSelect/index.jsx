/**
 * 科目选择
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';
import { Select } from 'antd';
import CommonController from 'common/controller/CommonController';
import service from 'common/util/ajaxService';
require('css-loader!./index.styl');

export default class SubjectSelect extends CommonController {

    static defaultProps = {
        defaultFirstValue: undefined,
        defaultSecondValue: undefined,
        placeholder: '请选择分类'
    };

    constructor(props) {
        super(props);
        this.state = {
            mainSubject: [],
            secondSubject: [],
            thirdSubject: [],
            firstId: props.firstId,
            secondId: props.secondId,
            thirdId: props.thirdId
        };
    }

    /**
     * @override
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const me = this;
        if (nextProps.firstId && nextProps.firstId !== me.props.firstId 
            || nextProps.secondId && nextProps.secondId !== me.props.secondId
            || nextProps.thirdId && nextProps.thirdId !== me.props.thirdId) {
            me.setState({
                firstId: nextProps.firstId,
                secondId: nextProps.secondId,
                thirdId: nextProps.thirdId
            });
            this.getNextSubjects('second', nextProps.firstId);
            this.getNextSubjects('third', nextProps.secondId);
        }
    } 

    /**
     * @override
     */
    componentWillMount() {
        // 获取一级菜单
        service
            .get('/pc/subject/list', {
                subjectId: 0
            })
            .then((res) => {
                const subjects = res.data.subjects;
                this.setState({
                    mainSubject: subjects
                });
            });
    }

    /**
     * 处理选择第一个select
     */
    handleMainSubjectChange = (value) => {
        this.setState({
            firstId: value,
            secondId: undefined,
            thirdId: undefined
        });
        // 获取第二级菜单
        this.getNextSubjects('second', value);
    }

    /**
     * 获取下一级科目
     */
    getNextSubjects = (type, value) => {
        service
            .get('/pc/subject/list', {
                subjectId: value
            })
            .then((res) => {
                const subjects = res.data.subjects;
                if (type === 'second') {
                    this.setState({
                        secondSubject: subjects
                    });
                } else {
                    this.setState({
                        thirdSubject: subjects
                    });
                }
            });
    }

    /**
     * 处理选择第二个select
     */
    handleSecondSubjectChange = (value) => {
        this.setState({
            secondId: value,
            thirdId: undefined
        });
        // 获取第三级菜单
        this.getNextSubjects('third', value);
        this.props.onChange(value);
    }

    /**
     * 处理选择第三个select
     */
    handleThirdSubjectChange = (value) => {
        this.setState({
            thirdId: value
        });
        this.props.onChange(value);
    }

    /**
     * @override
     */
    render() {
        const Option = Select.Option;
        return (
            <div className="subject-select">
                <Select
                    className="subject-select-content" 
                    placeholder={this.props.placeholder} 
                    dropdownClassName="subject-select-content-item" 
                    onChange={this.handleMainSubjectChange} 
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={this.state.firstId}
                    notFoundContent="无"
                >
                    {
                        this.state.mainSubject.map((item) => (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
                <Select
                    className="subject-select-content" 
                    placeholder={this.props.placeholder} 
                    dropdownClassName="subject-select-content-item" 
                    onChange={this.handleSecondSubjectChange} 
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={this.state.secondId}
                    notFoundContent="无"
                >
                    {
                        this.state.secondSubject.map((item) => (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
                <Select
                    className="subject-select-content" 
                    placeholder={this.props.placeholder} 
                    dropdownClassName="subject-select-content-item" 
                    onChange={this.handleThirdSubjectChange} 
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    value={this.state.thirdId}
                    notFoundContent="无"
                >
                    {
                        this.state.thirdSubject.map((item) => (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </div>
        );
    }
}

