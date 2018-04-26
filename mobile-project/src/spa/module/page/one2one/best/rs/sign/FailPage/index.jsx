/**
 * 1对1优选签约-入口
 * @file hurry
 * @date 2017/04/10
 */
import React from 'react';
// import { browserHistory } from 'react-router';
import FailPageComp from '../../../components/FailPage/index';
import analysis from 'spa/common/util/analysis';

function FailPage() {
    analysis.pgv();
    return (
        <FailPageComp
            title="抱歉，您暂时无权限查看此页面"
            reason="只有通过优选1对1审核的老师才能查看，优选1对1招募名额不定期开放，请关注老师端APP的招募通知哦"
            serviceTitle="如有问题请随时联系客服：4000-910-910"
        />
    );
};

export default FailPage;