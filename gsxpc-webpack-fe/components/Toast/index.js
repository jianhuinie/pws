
/**
 * 轻提示组件
 * @author zhainingning
 */
import {PureComponent} from 'react';

import './index.styl';

class Toast extends PureComponent {

    static defaultProps ={
        placeholder: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            change: false,
            message: ''
        };
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    toast = message => {
        this.setState({
            change: true,
            message,
        });
        const time = 2000;
        this.timer = setTimeout(() => {
            this.setState({
                change: false
            });
            clearTimeout(this.timer);
        }, time);
    }

    render() {
        const {change, message} = this.state;
        const {placeholder} = this.props;
        return (
            <div>
                {
                    change ? (
                        <div className="toast-wrap">
                            <span className="toast">
                                {message || placeholder}
                            </span>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Toast;
