import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';
require('css-loader!./index.styl');

export default class IndexDemo extends React.Component {
  
    static propTypes = {
      children: PropTypes.element
  };

  static defaultProps = {
      children: ''
  };
  
  render() {
    return (
        <div>
            <Button type="primary">搜索</Button>
            <h3>demo示例：</h3>
            <ul role="nav">
                <li><Link to="/demo/react">react组件写法</Link></li>
                <li><Link to="/demo/styl">styl使用方式</Link></li>
                <li><Link to="/demo/ajax">ajax使用方式</Link></li>
                <li><Link to="/demo/async">async使用方式</Link></li>
                <li><Link to="/demo/react-redux">react-redux使用方式</Link></li>
            </ul>
            <Button className="pink-btn classic-btn md-">这里</Button>
            {this.props.children}
        </div>
    );
  }
}