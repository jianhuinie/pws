import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import Avatar from 'module/components/Avatar/index';
import SlideInDialog from 'common/components/SlideInDialog/index';
import Empty from 'module/components/Empty/index';
import imageConfig from 'common/imgConfig';
import DropLoad from 'gsx-design/component/DropLoad/index';
import Util from 'common/util/util';
require('css-loader!./index.styl');

export default class Follow extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            classrooms: [],
            isShowDialog: false,
            cancleClassroom: null,
            isShowNoMore: false,
            pageNum: 1,
            loading: true
        };
        this._hackIos();
    }

    componentDidMount() {
        const me = this;
        document.title = '我的关注';
        this.getFollowClasses();
        this.dropLoad = new DropLoad({
            element: $('.student-follow-list'),
            callback: me.getFollowClasses
        });
        Util.sharePage();
    }

    componentWillUnmount() {
        if (this.dropLoad) {
            this.dropLoad.dispose();
            this.dropLoad = null;
        }
    }

    /**
     * 获取已关注课堂
     */
    getFollowClasses = () => {
        const me = this;
        let pageNum = this.state.pageNum;
        return ajax.get(ajaxConfig.USER.GET_FOLLOWS_CLASSES, {
            pageNum: pageNum
        }).then((res) => {
            const classrooms = res.data.classrooms;
            classrooms.forEach((item) => {
                item.followed = true;
            });
            const noMore = classrooms.length < 10;
            const isShowNoMore = pageNum > 1 && noMore;
            if (noMore) {
                me.dropLoad.dispose();
                me.dropLoad = null;
            }
            this.setState({
                loading: false,
                pageNum: ++pageNum,
                isShowNoMore,
                classrooms: this.state.classrooms.concat(classrooms)
            });
        });
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

    /**
     * 点击取消关注
     * @param {object} classroom 
     */
    handleClickCancel = (e, classroom) => {
        e.stopPropagation();
        this.setState({
            isShowDialog: true,
            cancelClassroom: classroom
        });
    }
    
    /**
     * 确认取消关注
     */
    confirmCancel = () => {
        ajax.post(ajaxConfig.CLASSROOM.FOLLOW, {
            classId: this.state.cancelClassroom.classId,
            followStatus: 1
        }).then(() => {
            this.state.cancelClassroom.followed = false;
            this.setState({
                isShowDialog: false,
                classrooms: this.state.classrooms
            }); 
        });
    }

    /**
     * 关闭弹窗
     */
    closeDialog = () => {
        this.setState({
            isShowDialog: false,
            cancelClassroom: null
        }); 
    }

    /**
     * 点击关注
     * @param {object} classroom 
     */
    handleClickFollow = (e, classroom) => {
        e.stopPropagation();
        ajax.post(ajaxConfig.CLASSROOM.FOLLOW, {
            classId: classroom.classId,
            followStatus: 0 
        }).then(() => {
            classroom.followed = true;
            this.setState({
                classrooms: this.state.classrooms
            }); 
            this.forceUpdate();
        });
    }

    jump = (info) => {
        location.href = '/mweb/classroom?id=' + info.classId;
    }

    render() {
        if (!this.state.loading && !this.state.classrooms.length) {
            return (
                <Empty
                    image={imageConfig.EMPTY.FOLLOW_CLASSROOM}
                    emptyText="我关注的课堂空空如也~"
                    buttonText="回首页看看"
                    redirect="/mweb/discovery"
                />
            );
        }
        return ( 
            <div className="student-follow">
                <ul className="student-follow-list">
                {
                    this.state.classrooms.map((classroom) => {
                        return (
                            <li 
                                key={classroom.classId} 
                                className="student-follow-list-item" 
                                onClick={() => {
                                this.jump(classroom);
                            }}>
                                <Avatar 
                                    // avatarSize={48}
                                    src={classroom.headUrl}
                                />
                                <div className="student-follow-list-item-detail">
                                    <div className="name">{classroom.name}</div>
                                    <div className="desc">{classroom.intro || '学会在学习中寻找乐趣，学会乐在其中并保持热情。'}</div>
                                </div>
                                <div className="student-follow-list-item-state">
                                    { 
                                        classroom.followed
                                            ?
                                            <div 
                                                className="student-follow-list-item-state-operate cancel" 
                                                onClick={(e) => {
                                                    this.handleClickCancel(e, classroom);
                                                }}
                                            >
                                                取消关注
                                            </div>
                                            :
                                            <div 
                                                className="student-follow-list-item-state-operate" 
                                                onClick={(e) => {
                                                    this.handleClickFollow(e, classroom);
                                                }}
                                            >
                                                关注
                                            </div>
                                    }
                                    
                                </div>
                            </li>
                        );
                    })
                } 
                </ul>
                {
                    this.state.isShowNoMore 
                        ?
                            <div className="no-more">没有更多内容了</div>
                        :
                            null
                }
                <SlideInDialog 
                    onCloseHandler={this.closeDialog} 
                    isShowDialog={this.state.isShowDialog}
                >
                    <div className="student-follow-dlolag">
                        <div onClick={this.confirmCancel} className="student-follow-dlolag-confirm">取消关注</div>
                        <div onClick={this.closeDialog} className="student-follow-dlolag-close">取消</div>
                    </div>
                </SlideInDialog>
            </div>
        );
    }
};
