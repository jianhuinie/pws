import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import MenuItem, { MenuList } from 'module/components/MenuList/index';
import authStatus from 'common/enum/authStatus';
import ui from 'gsx-design/component/ui';
import Avatar from 'module/components/Avatar/index';
import WxContext from 'common/util/wxContext';
import Loading from 'gsx-design/component/Loading/index';
import Util from 'common/util/util';
import DiscoveryFooter from 'module/discovery/component/DiscoveryFooter/index';
require('css-loader!./index.styl');

export default class Home extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            nickName: '', 
            avatarUrl: '',  // 头像url
            intro: '',
            followClassNum: 0,   // 关注课堂数
            isTeacher: false,
            balance: 0,
            classroom: {
                classId: '',  // 课堂id
                name: '',   // 课堂名称
                headUrl: '',  // 课堂头像
                authStatus: authStatus.UNAUTHORIZED
            },
            loading: true
        };
        this.loading = new Loading();
        this._hackIos();
    }

    componentDidMount() {
        document.title = '个人中心';
        this.loading.show();
        new WxContext().setShareInfo({
            title: '哈哈哈'
        });
        this.getBasicInfo();
        Util.sharePage();
    }

    componentWillUnmount() {
        this.loading.destroy();
    }

    /**
     * 解决ios在返回上一页面时，页面不自动刷新的问题
     */
    _hackIos() {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    getBasicInfo = () => {
        ajax.get(ajaxConfig.USER.GET_STUDENT_INFO).then((res) => {
            this.setState({
                ...res.data,
                loading: false
            }, () => {
                this.loading.hide();
            });
        });
    }

    /**
     * 点击收藏
     */
    clickCollect = () => {
        ui.toast('该功能即将上线');
    }

    /**
     * 跳转至我的关注
     */
    clickFollow = () => {
        location.href = '/mweb/student/follow';
    }

    render() {
        const state = this.state;
        const intro = state.intro ? state.intro : '学会在学习中寻找乐趣，学会乐在其中并保持热情。';
        return (
            <div className="student-center">
                <a href="/mweb/student/basicModify">
                    <div className="student-center-basic">
                        <Avatar
                            src={state.avatarUrl}
                            // avatarSize={56}
                        />
                        <div className="student-center-basic-detail">
                            <div className="name">{state.nickName}</div>
                            {/* <div className="desc">{state.loading ? '' : intro}</div> */}
                        </div>
                        <div className="menu-list-item-next icon-next"></div>
                    </div>
                </a>
                <div className="student-center-focus">
                    <div className="student-center-focus-item" onClick={this.clickFollow}>
                        <div className="count">{state.followClassNum}</div>
                        关注
                    </div>
                    <div className="student-center-focus-item" onClick={this.clickCollect}>
                        <div className="count">0</div>
                        收藏
                    </div>
                </div>
                {   
                    state.loading 
                        ?
                            null
                        :
                            state.isTeacher 
                            ? 
                            <MenuList>
                                <MenuItem 
                                    next={`/mweb/classroom?id=${state.classroom.classId}`}
                                    menuClassName="student-center-room-entry" 
                                    title={
                                        <div className="student-center-room-entry-basic">
                                            <Avatar 
                                                className="classroom-avatar"
                                                src={state.classroom.headUrl} 
                                                isV={state.classroom.authStatus === authStatus.AUTHORIZED}
                                                // avatarSize={40}
                                                // avatarVSize={14}
                                            />
                                            {state.classroom.name}
                                        </div>
                                    }
                                />
                            </MenuList>
                            :
                            <a href="/mweb/teacher/initialization/#/step-one">
                                <div className="student-center-join">
                                    <div className="entry">入驻微师，立即拥有你的小课堂</div>
                                </div>
                            </a>
                }
                <MenuList>
                    <MenuItem title="购买记录" next="/mweb/student/purchase" />
                    <MenuItem title="钱包" next="/mweb/fund/wallet" content={`余额${state.balance.toFixed(2)}元`} />
                </MenuList>
                <MenuList>
                    <MenuItem title="绑定手机号" next="/mweb/student/phone" />
                    <MenuItem title="客服" next="/mweb/student/custom" />
                </MenuList>
                <DiscoveryFooter key="home" current="home" />
            </div>
        );
    }
};
