/**
 * 关注公众号
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
// import LazyLoadImage from 'gsx-design/component/lazyLoadImage/index';
require('css-loader!./index.styl');

class FollowPublic extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            img: null
        };
    };
    
    componentWillReceiveProps(nextProps) {
        const self = this;
        if (nextProps.show && nextProps.classId && nextProps.classId !== self.props.classId) {
            self.getQrcodeImg(nextProps.classId);
        }
    }

    getQrcodeImg = (classId) => {
        const self = this;
        const params = {
            classId: classId,
            courseId: self.props.courseId,
            courseMode: self.props.courseMode,
            followType: 2
        };
            
        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.GET_QRCODE, params).then(function (res) {
            if (res && res.code === 200) {
                const img = res.data.qrcodeUrl;
                self.setState({ img });
                // setTimeout(() => {
                //     LazyLoadImage.init();
                // }, 300);
            }
        });
    }

    componentDidUpdate() {
        // LazyLoadImage.init();
    }

    render() {
        const self = this;
        const isShow = self.props.show;

        return (
            <div className={isShow ? 'follow-public' : 'follow-public hide'}>
                <div className="follow-public-img">
                    <img className="" src={self.state.img} />
                </div>
                <img className="follow-bg-img" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a81731d23465.png" />
            </div>
        );
    }
};

export default FollowPublic;