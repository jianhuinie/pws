import CommonController from 'common/controller/CommonController';
import React from 'react';
require('css-loader!./index.styl');

export default class Living extends CommonController {
    
    render() {
        return (
            <span className="living-wrapper">
                <div className="living-wrapper-item item1">
                </div>
                <div className="living-wrapper-item item2">
                </div>
                <div className="living-wrapper-item item3">
                </div>
                <div className="living-wrapper-item item4">
                </div>
                <div className="living-wrapper-item item5">
                </div>
            </span>
        );
    }
}