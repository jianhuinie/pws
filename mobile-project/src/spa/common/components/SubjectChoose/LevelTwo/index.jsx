/**
 * 一对一优选 -- 科目筛选-筛选二级科目
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
import LevelTwoItem from './LevelTwoItem/index';
require('css-loader!./index.styl');

class LevelTwo extends React.Component {
    static propTypes = {
        level2: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired,
        cssType: PropTypes.string.isRequired,
        selected: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            level2: this.props.level2,
            finalIndex: this.props.selected[2],
        };
        this.getFinalIndex = this.getFinalIndex.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            level2: nextProps.level2,
            finalIndex: nextProps.selected[2]
        });
    }

    getFinalIndex(data) {

        this.setState({
            finalIndex: +data.index
        });
        if (typeof this.props.callback === 'function') {
            this.props.callback(data);
        }
    }

    render() {
        const self = this;
        return (
            <div className={this.props.cssType === 'all' ? 'right-content-all' : 'right-content'}>
                {
                    self.state.level2.map(function (item) {
                        return (
                            <LevelTwoItem
                                key={item.value}
                                item={item}
                                finalIndex={self.state.finalIndex}
                                callback={self.getFinalIndex}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default LevelTwo;