/**
 * 顶部频道页导航
 * @author niejianhui
 */

import {PureComponent} from 'react';
import http from '~/service/http';
import constant from '~/service/constant';

import './index.styl';

class ChannelNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            channelNav: []
        };
    }
    componentDidMount() {
        http
            .post(constant.CHANNELNAV, {})
            .then(res => {
                this.setState({
                    channelNav: res.data
                });
            });
    }

    render() {
        const {channelNav} = this.state;
        return (
            <div className="channel-nav">
                <div className="wrapper">
                    {/* <a href="/">
                        <img src="https://imgs.genshuixue.com/2018/4/06ddeaf81d.png" />
                    </a> */}
                    {
                        channelNav.map(item => {
                            return (
                                <div className="nav-item" key={item.id}>
                                    <a href={item.url} target="_blank">
                                        {item.name}
                                    </a>
                                    <div className="sub-menu">
                                        {
                                            item.child.map(child => {
                                                return (
                                                    <a href={child.url} key={child.id} target="_blank">
                                                        {child.name}
                                                    </a>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default ChannelNav;
