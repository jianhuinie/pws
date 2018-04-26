/**
 * 一对一优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
import FailPageComp from '../../../components/FailPage/index';
import analysis from 'spa/common/util/analysis';

function FailPage() {
    analysis.pgv();
    return (
        <FailPageComp
            title="抱歉，您的报名审核没有通过"
            reason="由于一期名额限制等原因，本次审核暂时没有通过，请您耐心等待后续名额开放哦~"
            serviceTitle="如有问题请随时联系客服：4000-910-910"
        />
    );
};

export default FailPage;