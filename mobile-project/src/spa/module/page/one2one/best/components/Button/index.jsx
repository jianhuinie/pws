/**
 * 一对一优选-按钮
 * @file hurry
 * @date 2017/04/10
 */
import React, { PropTypes } from 'react';
require('css-loader!./index.styl');

class Button extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        // 返回?promise
        callback: PropTypes.func.isRequired,
        containerClass: PropTypes.string
    };
    static defaultProps = {
        containerClass: ''
    };
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
        const me = this;
        if (!me.isClick) {
            me.isClick = true;
            if (typeof me.props.callback === 'function') {
                const result = me.props.callback();
                if (result && result.then) {
                    result.then(() => {
                        me.isClick = false;
                    });
                } else {
                    me.isClick = false;
                }
            }
        }
    }
    render() {
        return (
            <div
                className={`one2one-best-button ${this.props.containerClass}`}
                onClick={this.clickHandler}
            >
                {this.props.title}
            </div>
        );
    }
};

export default Button;