import React from 'react';
import PageController from 'common/controller/PageController';
import Url from 'gsx-design/util/url';
import Util from 'common/util/util';
require('css-loader!./index.styl');
export default class Verifying extends PageController {
    
    componentDidMount() {
        document.title = '审核中';
        // Util.sharePage();
    }

    jump = () => {
        const classId = +Url().params.id || Util.getHashParams().id;
        console.log(classId);
        location.href = '/mweb/classroom?id=' + classId;
    }

    render() {
        return (
            <div className="room-verifying">
                <img className="room-verifying-logo" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a4b32697982c.png" />
                <div className="room-verifying-desc">
                    提交的认证信息正在审核中，请耐心等待<br />
                    认证结果将会通过公众号告知
                </div>
                <a>
                    <button className="ws-btn-red room-verifying-back" onClick={this.jump}>返回课堂</button>
                </a>
            </div>
        );
    }
};
