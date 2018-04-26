/**
 * 课堂页面底部
 * @author leon
 */
import React, { PropTypes } from 'react';
import PageController from 'common/controller/PageController';
require('css-loader!./index.styl');
const taps = [{
    key: 'discovery',
    redirect: '/mweb/discovery',
    text: '发现',
    icon: 'icon-discovery',
    activeIcon: 'icon-discovery-active'
}, {
    key: 'course',
    redirect: '/mweb/student/course',
    text: '我的课程',
    icon: 'icon-course',
    activeIcon: 'icon-course-active'
}, {
    key: 'home',
    redirect: '/mweb/student/home',
    text: '个人中心',
    icon: 'icon-person-center',
    activeIcon: 'icon-person-center-active'
}];
class DiscoveryFooter extends PageController {

    static propTypes = {
        current: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            current: props.current
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.current
        });
    }

    jumpTo = (tab) => {
        if (tab.key !== this.state.current) {
            location.href = `${tab.redirect}?t=${Number(new Date())}`; // 加时间戳解决微信链接跳转失效
        }
    }

    render() {
        const self = this;
        const current = this.state.current;
        return (
            <div className={self.props.noShow ? 'discovery-footer hide' : 'discovery-footer'}>
                {
                    taps.map((tab) => {
                        const isCurrent = current === tab.key;
                        return (
                            <div 
                                key={tab.key} 
                                className={`footer-item ${isCurrent ? 'current' : ''}`} 
                                onClick={() => {
                                    self.jumpTo(tab);
                                }}
                            >
                                <i className={`footer-item-icon ${isCurrent ? tab.activeIcon : tab.icon}`}></i>
                                <div className="title">{tab.text}</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};

export default DiscoveryFooter;