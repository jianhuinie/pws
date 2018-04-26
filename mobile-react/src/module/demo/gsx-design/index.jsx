import React from 'react';
import { Link } from 'react-router';

class GSXDesignDemo extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (<div>
            <h3>gsx-design-m示例：</h3>
            <ul role="nav">
                <li><Link to="/demo/gsx-design/alert">alert</Link></li>
                <li><Link to="/demo/gsx-design/Loading">Loading</Link></li>
                <li><Link to="/demo/gsx-design/confirm">confirm</Link></li>
                <li><Link to="/demo/gsx-design/ImagePlayer">ImagePlayer</Link></li>
                <li><Link to="/demo/gsx-design/SlideInDialog">SlideInDialog</Link></li>
            </ul>
            {this.props.children}
        </div>);
    }
};

export default GSXDesignDemo;