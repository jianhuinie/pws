/**
 * 关注课堂
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
// import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
import Ui from 'gsx-design/component/ui';
require('css-loader!./index.styl');

class FollowTeacher extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            qrcodeUrl: '',
        };
    };

    componentDidMount() {
        const self = this;

        if (self.props.classId) {
            self.getQrcodeImg(self.props.classId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const self = this;
        if (nextProps.classId && nextProps.classId !== self.props.classId) {
            self.getQrcodeImg(nextProps.classId);
        }
    }

    // componentDidUpdate() {
    //     LazyLoadImage.init();
    // }

    getQrcodeImg = (classId) => {
        const self = this;
        const params = {
            classId: classId,
            courseId: self.props.courseId,
            courseMode: self.props.courseMode,
            followType: 1
        };
            
        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.GET_QRCODE, params).then(function (res) {
            if (res && res.code === 200) {
                const qrcodeUrl = res.data.qrcodeUrl;
                self.setState({ qrcodeUrl });
            }
        });
    }

    clickFollowBtn = (e) => {
        e.stopPropagation();
        const self = this;
        if (self.props.isFollow) {
            Ui.confirm('确定不再关注该课堂？').then(() => {
                self.follow(1);
            });
        } else if (self.props.followPublic) {
            self.follow(0);
        } else {
            self.showImg();
        }
    }

    jump = () => {
        const self = this;
        if (location.pathname.indexOf('/classroom') === -1) {
            location.href = '/mweb/classroom?id=' + self.props.classId;
        }
    }

    follow = (index) => {
        const self = this;
        const params = {
            classId: self.props.classId,
            followStatus: index
        };
            
        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.FOLLOW, params).then(function (res) {
            if (res && res.code === 200) {
                self.props.callbackParent(!index);
            }
        });
    }

    showImg = () => {
        const self = this;
        Ui.alert({
            content: '<img src="' + self.state.qrcodeUrl + '">',
        });
    }

    render() {
        const self = this;
        const detail = self.props.detail;
        let clsName;
        if (detail.isSelfClass) {
            clsName = 'follow-teacher-btn right hide';
        } else if (self.props.isFollow) {
            clsName = 'follow-teacher-btn has-follow-teacher right';
        } else {
            clsName = 'follow-teacher-btn right';
        }

        return (
            <div className="follow-teacher" onClick={self.jump}>
                <div className="follow-teacher-avator left">
                    <img className="avator" src={detail.headUrl} />
                    <img 
                        className={detail.authStatus === 2 ? 'auth-logo' : 'auth-logo hide'} 
                        src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a5468c52d109.png" 
                    />
                </div>
                <div className="follow-teacher-info left">
                    <div className="follow-teacher-name">{detail.name}</div>
                    <div className="follow-teacher-number">{detail.followNum + '人关注'}</div>
                </div>
                <div 
                    className={clsName} 
                    onClick={self.clickFollowBtn}>
                    {self.props.isFollow ? '已关注' : '关注'}
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
};

export default FollowTeacher;