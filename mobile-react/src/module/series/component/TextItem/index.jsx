/**
 * 文本组件
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class TextItem extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        const self = this;
        let clsName;
        if (!self.props.text) {
            clsName = 'hide';
        } else if (self.props.isCourse) {
            clsName = 'text-item course-detail-content-item';
        } else {
            clsName = 'text-item';
        }

        return (
            <div className={clsName}>
                {self.props.text}
            </div>
        );
    }
};

export default TextItem;