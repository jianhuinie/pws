/**
 * 一对一优选 -- 科目筛选组件
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
import SubjectLevel from 'spa/common/components/SubjectChoose/index';
require('css-loader!./index.styl');

class Subject extends React.Component {
    static propTypes = {
        show: PropTypes.number.isRequired,
        selected: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
        };
        this.confirmSubject = this.confirmSubject.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: nextProps.selected
        });
    }
    confirmSubject(data) {
        if (typeof this.props.callback === 'function') {
            this.props.callback(data);
        }
    }
    render() {
        return (
            <div className={this.props.show ? 'subject-content' : 'subject-content hide'}>
                <SubjectLevel 
                    cssType="mask"
                    selected={this.state.selected}
                    callback={this.confirmSubject}
                />
            </div>
        );
    }
}

export default Subject;