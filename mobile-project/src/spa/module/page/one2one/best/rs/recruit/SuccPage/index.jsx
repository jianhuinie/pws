/**
 * 一对一优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
// import { browserHistory } from 'react-router';
import TAppDownload from 'spa/common/components/TAppDownload/index';
import ResultTips from 'spa/common/components/ResultTips/index';
import analysis from 'spa/common/util/analysis';

require('css-loader!./index.styl');

function SuccPage() {
    analysis.pgv();
    return (
        <div className="recruit-page-success">
            <ResultTips title="已成功报名，等待跟谁学审核" />
            <div className="body">
                <p className="title">
                    首批仅1000个名额，我们会审核以下信息，请您重新检查信息以便提高通过几率哦
                </p>
                <div className="item">
                    <p>
                        1、视频、图片、过往经历、教学经历是否填写完整，且有亮点
                    </p>
                    <p>
                        2、常用教学地点是否正确
                    </p>
                    <p>
                        3、可用授课时间是否更新
                    </p>
                    <p>
                        4、一对一不同上课方式的价格是否更新
                    </p>
                </div>
            </div>
            <TAppDownload />
        </div>
    );
}

export default SuccPage;