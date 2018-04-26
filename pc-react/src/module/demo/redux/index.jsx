import React from 'react';
import { Link } from 'react-router';

class ReduxDemo extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (<div>
            <h3>redux示例：</h3>
            <ul role="nav">
                <li><Link to="/demo/redux/counter">counter</Link></li>
            </ul>
            {this.props.children}
        </div>);
    }
};

export default ReduxDemo;