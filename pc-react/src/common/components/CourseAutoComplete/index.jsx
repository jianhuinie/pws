import React, { PropTypes } from 'react';
import { AutoComplete, message } from 'antd';
import CommonController from 'common/controller/CommonController';
import service from 'common/util/ajaxService';
import URL from 'common/util/url';
require('css-loader!./index.styl');

export default class CourseAutoComplete extends CommonController {

    static propTypes = {
        onChange: PropTypes.func,
        onClear: PropTypes.func,
        type: PropTypes.number,
        defaultName: PropTypes.string,
        tip: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            courseName: props.defaultName
        };
    }

    /**
     * @override
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const me = this;
        if (nextProps.defaultName !== me.props.defaultName) {
            me.setState({
                courseName: nextProps.defaultName
            });
        }
    }

    /**
     * 根据输入搜索
     * @param {*} query 
     */
    handleSearch = (query) => {
        const self = this;
        if (!self.props.type) {
            message.error('请选择课程类型');
            return;
        }
        service
            .get('/pc/course/getOptions', {
                classroomId: Number(URL().params.classroomId),
                query: query,
                type: this.props.type
            })
            .then((res) => {
                const courses = res.data.courses || [];
                this.setState({ 
                    dataSource: courses.map((item) => {
                        return {
                            value: `${item.courseId} ${item.name}`,
                            text: item.name
                        };
                    })
                });
            });
    }

    /**
     * 处理选中后
     * @param {*} value 
     */
    handleSelect = (value) => {
        this.setState({
            courseName: value.split(' ')[1]
        });
        this.props.onChange(value);
    }

    handleInputChange = (value) => {
        this.props.onDelete && this.props.onDelete(value);
    }

    inputFocus = () => {
        const self = this;
        self.handleSearch(null);
    }

    /**
     * @override
     */
    render() {
        const self = this;
        return (
            <AutoComplete 
                dataSource={this.state.dataSource}
                onSelect={this.handleSelect}
                onSearch={this.handleSearch}
                onChange={this.handleInputChange}
                onFocus={self.inputFocus}
                placeholder={this.props.tip}
                value={this.state.courseName}
                className="carousel-auto-complete"
                getPopupContainer={triggerNode => triggerNode}
            />
        );
    }
}