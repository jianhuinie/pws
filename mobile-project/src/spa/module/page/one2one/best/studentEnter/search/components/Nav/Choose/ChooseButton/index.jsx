/**
 * 一对一筛选-筛选按钮组件
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class ChooseButton extends React.Component {
    static propTypes = {
        chooseIndex: PropTypes.object.isRequired,
        callbackReset: PropTypes.func.isRequired,
        callbackConfirm: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            chooseIndex: this.props.chooseIndex
        };
        this.reset = this.reset.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            chooseIndex: nextProps.chooseIndex
        });
    }

    reset() {
        if (typeof this.props.callbackReset === 'function') {
            this.props.callbackReset();
        }
    }

    confirm() {
        const data = this.state.chooseIndex;
        if (typeof this.props.callbackConfirm === 'function') {
            this.props.callbackConfirm(data);
        }
    }

    render() {
        return (
            <div className="choose-buttons">
                <div 
                    className="choose-reset"
                    onClick={this.reset}
                >
                    重置
                </div>

                <div 
                    className="choose-confirm"
                    onClick={this.confirm}
                >
                    确定
                </div>
            </div>
        );
    }
}
export default ChooseButton;