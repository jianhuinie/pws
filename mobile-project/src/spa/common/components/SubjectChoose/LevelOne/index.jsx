/**
 * 一对一优选 -- 科目筛选-筛选一级科目
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class LevelOne extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        level1: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired,
        cssType: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            name: '',
            level1: this.props.level1
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            level1: nextProps.level1,
            index: nextProps.index
        });
    }

    subjectOne(item) {
        this.setState({
            index: +item.value
        });

        if (typeof this.props.callback === 'function') {
            this.props.callback({
                value: +item.value
            });
        }
    }

    render() {
        const self = this;
        return (
            <div className={this.props.cssType === 'all' ? 'left-content-all' : 'left-content'}>
                {
                    self.state.level1.map(function (item) {
                        return (
                            <div
                                className={self.state.index === Number(item.value) ? 'subject-item-active' : 'subject-item-normal'}
                                onClick={self.subjectOne.bind(self, item)}
                                key={item.value}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
export default LevelOne;