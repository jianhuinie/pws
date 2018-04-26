import React from 'react';
import { Input } from 'antd';
import CommonController from 'common/controller/CommonController';
require('css-loader!./index.styl');

export default class CourseSearch extends CommonController {

    /**
     * @override
     */
    render() {
        return (
            <Input.Search
                placeholder={this.props.placeholder}
                onSearch={this.props.onCourseSearch}
                style={{ width: 208 }}
                className="course-search"
                enterButton={<span className="icon-search"></span>}
            />
        );
    }
}