/**
 * 关注课堂页面的公众号
 * @author leon
 */
import React from 'react';
import PageController from 'common/controller/PageController';
import AJAXCONFIG from 'common/ajaxConfig';
import AJAXSERVICE from 'common/util/ajaxService';
require('css-loader!./index.styl');

class FollowClassroom extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            img: null
        };
    };
    
    // componentWillReceiveProps(nextProps) {
    //     const self = this;
    //     // debugger;
    //     if (nextProps.show && nextProps.classId && nextProps.show !== self.props.show) {
    //         self.getQrcodeImg(nextProps.classId);
    //     }
    // }

    componentDidMount() {
        const self = this;
        const props = self.props;
        if (props.show && props.classId) {
            self.getQrcodeImg(props.classId);
        }
    }

    getQrcodeImg = (classId) => {
        const self = this;
        const params = {
            classId: classId,
            followType: 1
        };
            
        AJAXSERVICE.post(AJAXCONFIG.CLASSROOM.GET_QRCODE, params).then(function (res) {
            if (res && res.code === 200) {
                const img = res.data.qrcodeUrl;
                self.setState({ img });
            }
        });
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

export default FollowClassroom;