/**
 * 一对一优选-签约
 * @author hurry
 * @date 2017/04/10
 */
import React from 'react';
const setShare = require('common/share/initialize');
const app = require('common/app');

class SignContainer extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    componentDidMount() {
        setShare({
            title: '优选一对一老师招募计划邀请您加入',
            content: '优质生源推荐，专属助教服务，让您专注教学，快来加入我们吧',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/04/58eb7e93724d7.png',
            url: location.href
        });
    }
    render() {
        app.setPageTitle('优选1对1招募');
        return (
            <div className="recruit">
                {this.props.children}
            </div>
        );
    }
};

export default SignContainer;