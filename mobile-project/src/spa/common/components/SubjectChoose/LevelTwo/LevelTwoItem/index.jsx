/**
 * 一对一优选 -- 科目筛选-筛选二级科目-二级科目的小课节
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class LevelTwoItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        finalIndex: PropTypes.number.isRequired,
        callback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: this.props.item.name,
                value: this.props.item.value,
                children: this.props.item.children,
            },
            index: this.props.finalIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        const item = nextProps.item;
        if (!item.children) {
            item.children = [];
        }
        this.setState({
            item: item,
            index: nextProps.finalIndex
        });
    }

    chooseSubjectItem(item) {
        this.setState({
            index: +item.value
        });
        
        if (typeof this.props.callback === 'function') {
            this.props.callback({
                index: +item.value,
                name: item.name
            });
        }
    }

    render() {
        const self = this;
        return (
            <div className="level-two-content">
                <div className="first-line">
                    <span className="line"></span>
                    <span className="subject-name">{self.state.item.name}</span>
                </div>

                <div className="second-line">
                    {
                        self.state.item.children.map(function (item, index) {
                            if (item.name !== '全部') {
                                return (
                                    <span 
                                        key={index}
                                        onClick={self.chooseSubjectItem.bind(self, item)}
                                        className={self.state.index === +item.value ? 'subject-item-active' : 'subject-item-noraml'}
                                    >
                                        {item.name}
                                    </span>
                                );
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

export default LevelTwoItem;