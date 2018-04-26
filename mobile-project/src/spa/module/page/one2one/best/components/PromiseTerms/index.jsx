/**
 * 服务条款
 */

import React from 'react';
const lazyLoadImage = require('common/lazyLoadImage');
require('css-loader!./index.styl');

class PromiseTerms extends React.Component {
    
    componentDidUpdate() {
        lazyLoadImage.init();
    }

    render() {
        return (
            <div className="promise-container">
                <div className="promise-item">
                    <div className="left-item">
                        <img 
                            data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590c50db867dc.png" 
                            alt="" className="ic-promise" />
                    </div>
                    <div className="right-item">
                        <p className="title center">师资承诺</p>
                        <p className="content center">跟谁学所有老师均通过实名认证和教学水平认证，一线名师更有多项荣誉认证，保证老师的高质量教学水平</p>
                    </div>
                </div>
                <div className="promise-item">
                    <div className="left-item">
                        <img 
                            data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590c50db20f4d.png"
                            alt="" className="ic-promise" />
                    </div>
                    <div className="right-item">
                        <p className="title center">服务承诺</p>
                        <p className="content center">全程专属学习顾问跟踪式服务，个性化定制学习方案，保障您的学习效果</p>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="promise-item">
                    <div className="left-item">
                        <img 
                            data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590c50dbc6ac9.png"
                            alt="" className="ic-promise" />
                    </div>
                    <div className="right-item">
                        <p className="title center">退款承诺</p>
                        <p className="content center">课程进行中，对老师或服务不满意，可申请退费，跟谁学平台会担保您的学费，资金安全无忧</p>
                    </div>
                </div>
                <div className="promise-item">
                    <div className="left-item">
                        <img 
                            data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590c50db53ea0.png"
                            alt="" className="ic-promise" />
                    </div>
                    <div className="right-item">
                        <p className="title center">品牌承诺</p>
                        <p className="content center">CCTV、《人民日报》等报道，A轮融资5000万美元最高纪录，8000万白领学生家长使用推荐的全球领先的找好老师学习服务平台</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default PromiseTerms;