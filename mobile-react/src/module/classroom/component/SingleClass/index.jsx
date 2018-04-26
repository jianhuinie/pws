/**
 * 单次课
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import SingleClassItem from '../SingleClassItem/index';
require('css-loader!./index.styl');

class SingleClass extends PageController {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    getMore = () => {
        const self = this;
        self.props.callbackParent();
    }

    render() {
        const self = this;
        const len = self.props.num;
        const listComponet = self.props.singleList.map(function (item) {
            return (<SingleClassItem key={item.id + item.courseMode} data={item} />);
        });

        return (
            <div className={len ? 'single-class class-area' : 'single-class hide'}>
                <div className="class-title">
                    {'单次课 ( ' + len + ' )'}
                </div>
                <div className="class-list">
                    {listComponet}
                </div>
                <div className={self.props.hasMore ? 'has-more' : 'has-more hide'} onClick={self.getMore}>
                    查看更多
                </div>
            </div>
        );
    }
};

export default SingleClass;