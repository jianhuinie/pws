import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import PageController from 'common/controller/PageController';
import EnterDiscovery from 'module/discovery/component/EnterDiscovery/index';
// import Util from 'common/util/util';
require('css-loader!./index.styl');
export default class StepOne extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            argeeProtocol: true,
            argeeFollow: true,
            loading: true
        };
    }

    componentDidMount() {
        document.title = '欢迎入驻微师';
        ajax.get(ajaxConfig.USER.GET_USER).then((res) => {
            const { isTeacher } = res.data.user;
            // const { classId } = res.data.classroom;
            const classId = res.data.classroom && res.data.classroom.classId;
            if (isTeacher) {
                location.replace(`/mweb/classroom?id=${classId}`);
            } else {
                this.setState({
                    loading: false
                });
            }
        });
        // Util.sharePage();
    }

    /**
     * 同意协议多选框点击
     * @param {event} e 
     */
    toggleProtocolCheck = (e) => {
        this.setState({
            argeeProtocol: e.target.checked
        });
    }

    /**
     * 关注课堂多选框点击
     * @param {event} e 
     */
    toggleFollowCheck = (e) => {
        this.setState({
            argeeFollow: e.target.checked
        });
    }

    render() {
        if (this.state.loading) {
            return <EnterDiscovery show={true} />;
        }
        return (
            <div className="welcome-join">
                <img className="welcome-join-img" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/12/5a44cfc38ca62.png" />
                <div className="welcome-join-check first">
                    <input 
                        type="checkbox"
                        checked={this.state.argeeProtocol}
                        onChange={this.toggleProtocolCheck}
                    />
                    我同意遵循<a className="protocol" href="/mweb/student/protocol">《微师平台用户协议》</a>
                </div>
                <div className="welcome-join-check second">
                    <input 
                        type="checkbox"
                        checked={this.state.argeeFollow}
                        onChange={this.toggleFollowCheck}
                    />
                    关注<a className="protocol" href="/mweb/classroom?id=1">&nbsp;微师大讲堂&nbsp;</a>及时了解课堂运营技巧
                </div>
                <a href="/mweb/teacher/initialization#/step-two">
                    <button 
                        disabled={!(this.state.argeeProtocol && this.state.argeeFollow)}
                        className="ws-btn-red welcome-join-next"
                    >
                        下一步
                    </button>
                </a>
            </div>
        );
    }
};
