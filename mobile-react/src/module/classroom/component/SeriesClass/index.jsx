/**
 * 系列课
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import SeriesClassItem from '../SeriesClassItem/index';

class SeriesClass extends PageController {
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
        const listComponet = self.props.seriesList.map(function (item) {
            return (<SeriesClassItem key={item.id + item.courseMode} data={item} />);
        });

        return (
            <div className={len ? 'series-class class-area' : 'series-class hide'}>
                <div className="class-title">
                    {'系列课 ( ' + len + ' )'}
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

export default SeriesClass;