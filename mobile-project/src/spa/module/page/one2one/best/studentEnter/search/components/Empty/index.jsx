import React from 'react';
require('css-loader!./index.styl');

class Empty extends React.Component {

    //先设置默认的数组长度为null
    constructor(props) {
        super(props);
        this.state = {
            flag: 0
        };
    }

    //更新外部
    componentWillReceiveProps(nextProps) {
        this.setState({
            flag: +nextProps.flag
        });
    }

    render() {
        return (
            <div className={this.state.flag ? 'empty-content show' : 'empty-content hide'}>
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/06/5577f4561f155.png" />
                <p className="text">暂无相关结果</p>
            </div>
        );
    }
}

export default Empty;