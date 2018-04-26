/**
 * 一对一优选 -- 列表卡片
 * @file huangshiming
 * @data 2017/04/10
 */
import React, { PropTypes } from 'react';
import Stars from './components/Stars/index';
const observer = require('common/mvc/observer');
const LoginDialog = require('common/ui/LoginDialog/LoginDialog');
require('css-loader!./index.styl');
const app = require('common/app');
const user = require('common/user');
const URL = require('util/url');
const UTIL = require('common/util');
const lazyLoadImage = require('common/lazyLoadImage');

class ListItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        
        this.state = {
            item: this.props.item
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            item: nextProps.item
        });
    }

    componentDidUpdate() {
        lazyLoadImage.init();
    }

    login(number) {
        const self = this;

        if (app.isStudentApp()) {
            self.appLogin(number);
        } else {
            self.browerLogin(number);
        }
    }

    appLogin(number) {
        const self = this;

        const callbackFun = function () {
            self.goToTeacherDetail(number);
        };

        user.loginStudent(callbackFun);
    }

    browerLogin(number) {
        const self = this;
        const loginDialog = new LoginDialog();
        loginDialog.show();
        const listener1 = observer.addListener(loginDialog, 'success', function () {
            self.goToTeacherDetail(number);
            // window.location.reload();
        });
        const listener2 = observer.addListener(loginDialog, 'display_changed', function () {
            const display = this.get('display');
            if (!display) {
                observer.removeListener(listener1);
                observer.removeListener(listener2);
                loginDialog.destroy();
            }
        });
    }

    goToTeacherDetail(number) {
        let url = location.origin + '/one-on-one-course/get?number=' + number;
        if (UTIL.platform.isIOS() && app.isWeixin()) {
            url += '&srcUrl=' + encodeURIComponent(URL().hash);
        }
        window.location.href = url;
    }

    jumptoDetail(number) {
        const self = this;
        
        if (app.isStudentApp()) {
            self.login(number);
        } else if (window.gsx_ready) {
            window.gsx_ready(function (config) {
                if (config && config.user && config.user.id) {
                    self.goToTeacherDetail(number);
                } else {
                    setTimeout(function () {
                        self.login(number);
                    });
                }
            });
        } else {
            setTimeout(function () {
                self.login(number);
            });
        }
    }
    
    render() {
        const self = this;
        const lessonWay = ['', '', '可线上授课'];
        return (
            <div className="card" onClick={self.jumptoDetail.bind(self, self.state.item.number)}>
                <div className="avatar">
                    <img data-src={this.state.item.avatar} />
                </div>

                <div className="name-content">
                    <span className="name">{this.state.item.name}</span>
                    <span className="icons">优选</span>
                </div>

                <div className="stars">
                    <Stars number={+this.state.item.stars} />
                    <span className="hours">
                        授课{this.state.item.hours}小时
                    </span>
                </div>

                <div className="tabs">
                    {
                        this.state.item.tag.map(function (item, index) {
                            return (
                                <span 
                                    key={index.number}
                                    className="tab-item"
                                >
                                    {item.name}
                                </span>
                            );
                        })
                    }
                </div>

                <div className="remark line-clamp">
                    {this.state.item.short_introduce}
                </div>

                <div className="item-right-content">
                    <div className="price-content">
                        <span className="price">
                            ￥{this.state.item.price}
                        </span>
                        <span className="texts">
                            起/时
                        </span>
                    </div>

                    <div className={this.state.item.area ? 'line-clamp area' : 'line-clamp area hide'}>
                        {this.state.item.area}
                    </div>

                    <div className={this.state.item.distance ? 'distance line-clamp' : 'distance line-clamp hide'}>
                        {this.state.item.distance}
                    </div>

                    <div className="lessonWay">
                        {lessonWay[this.state.item.lesson_way]}
                    </div>
                </div>
            </div>
        );
    }
}
export default ListItem;