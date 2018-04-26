import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import authStatus from 'common/enum/authStatus';
import PageController from 'common/controller/PageController';
import Avatar from 'module/components/Avatar/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');
export default class Center extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            roomInfo: {
                headUrl: '',
                name: '',
                yesterdayFollowers: '',
                totalFollowers: '',
                yesterdayIncome: '',
                authStatus: ''
            }
        };
    }

    componentDidMount() {
        document.title = '课堂管理';
        this.getSummary();
        Util.sharePage();
    }

    getSummary = () => {
        ajax.get(ajaxConfig.CLASSROOM.GET_ROOM_SUMMARY).then((res) => {
            this.setState({
                roomInfo: res.data
            });
        });
    }

    render() {
        return (
            <div className="manager-center">
                <div className="manager-center-head">
                    <div className="manager-center-head-avatar">
                        <Avatar 
                            className="avatar"
                            src={this.state.roomInfo.headUrl}
                            // avatarSize={112}
                            // avatarVSize={44}
                            isV={this.state.roomInfo.authStatus === authStatus.AUTHORIZED}
                        />
                    </div>
                    <div className="manager-center-head-detail">
                        <div className="room-name">{this.state.roomInfo.name}</div>
                        {
                            this.state.roomInfo.authStatus !== authStatus.AUTHORIZED
                            ?
                                <a className="apply-link" href="/mweb/teacher/authentication">
                                    <div className="apply">点击认证课堂</div>
                                </a>
                            :
                                null
                        }
                    </div>
                    <a href="/mweb/teacher/manager/modify">
                        <div className="manager-center-head-next icon-next" />
                    </a>
                </div>
                <div className="manager-center-body">
                    <div className="manager-center-body-title">
                        最新数据
                    </div>
                    <div className="manager-center-body-content">
                        <div className="data-item">
                            <div className="value">{this.state.roomInfo.yesterdayFollowers}</div>
                            <div className="name">昨日新增粉丝</div>
                        </div>
                        <div className="data-item">
                            <div className="value">{this.state.roomInfo.totalFollowers}</div>
                            <div className="name">累计粉丝</div>
                        </div>
                        <div className="data-item">
                            <div className="value highlight">{this.state.roomInfo.yesterdayIncome}</div>
                            <div className="name">昨日收益/元</div>
                        </div>
                    </div>
                </div>
                <div className="manager-center-tip">
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a7d3624dfa26.png" />
                </div>
            </div>
        );
    }
};
