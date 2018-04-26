/**
 * 科目筛选，
 *  --- 从父级初入一个id,为一级科目的id
 * @file huangshiming
 * @data 2017/04/10
 */

import React, { PropTypes } from 'react';
import LevelOne from './LevelOne/index';
import LevelTwo from './LevelTwo/index';
const service = require('common/service');
require('css-loader!./index.styl');

class Subject extends React.Component {
    static propTypes = {
        selected: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired,
        cssType: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            level1: [],
            level2: []
        };

        this.getLevelOneId = this.getLevelOneId.bind(this);
        this.getList = this.getList.bind(this);
        this.confirmSubject = this.confirmSubject.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: nextProps.selected,
        });

        // 外部的ajax传入过来的id可能也会变化，所以每次外部传来的节点更新，就刷新一下dom
        if (+nextProps.selected[0]) {
            this.getList(nextProps.selected[0]);
        }
    }

    getLevelOneId(data) {
        const selected = this.state.selected;
        selected[0] = +data.value;
        this.setState({
            selected: selected
        });
        this.getList(+data.value);
    }

    getList(id = 0) {
        const self = this;
        service
            .post('/preferredOneOnOne/choiceSubject', { level1_id: id })
            .then((res) => {
                if (+res.code === 0) {
                    // 如果id是0的话就是取一级科目
                    const data = res.data;
                    const lists = data.list;
                    const hasSelected = this.state.selected;
                    lists.forEach(function (item, index) {
                        if (item.name === '全部') {
                            lists.splice(index, 1);
                        }
                    });
                    if (+id === 0) {
                        this.setState({
                            level1: lists
                        });
                        // 第一次进入的时候也要把所有的二级科目也要去到的，传的id是selected里面的一级
                        const chooseValue = lists[0].value;
                        this.getList(chooseValue);
                        hasSelected[0] = chooseValue;
                        self.setState({
                            selected: hasSelected
                        });
                    } else {
                        this.setState({
                            level2: data.list
                        });
                    }
                }
        });
    }

    confirmSubject(data) {
        if (typeof this.props.callback === 'function') {
            this.props.callback(data);
        }
    }


    componentDidMount() {
        //const id = this.state.index;
        // //第一次进入的时候先把所有的一级科目取到，所以id是0
        const index = 0;
        this.getList(index);
    }

    render() {
        return (
            <div className={this.props.cssType === 'all' ? 'filter-parent-all' : 'filter-parent'}>
                <div className="course">
                    <LevelOne
                        cssType={this.props.cssType}
                        level1={this.state.level1}
                        index={+this.state.selected[0]}
                        callback={this.getLevelOneId}
                    />

                    <LevelTwo
                        cssType={this.props.cssType}
                        level2={this.state.level2}
                        selected={this.state.selected}
                        callback={this.confirmSubject}
                    />
                </div>
            </div>
        );
    }
}
export default Subject;