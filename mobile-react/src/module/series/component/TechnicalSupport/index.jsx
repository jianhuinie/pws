/**
 * 技术支持
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');

class TechnicalSupport extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div className="technical-support">
                微师提供技术支持
            </div>
        );
    }
};

export default TechnicalSupport;