/**
 * 一对一优选 -- 科目筛选组件
 * @file leon
 */

import React from 'react';
const app = require('common/app');
const setShare = require('common/share/initialize');
import ScdSubjectItem from 'spa/module/page/one2one/best/components/ScdSubjectItem/index';
import PageController from 'spa/common/controller/PageController';

require('css-loader!./index.styl');

class ScdSubject extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            subjectData: $.parseJSON(sessionStorage.getItem('scdSubject'))
        };
    }

    componentDidMount() {
        setShare({
            title: '跟谁学『优选1对1』 - 名师个性化辅导',
            content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
            url: location.origin + '/webapp/#/one2one/best/se/detail'
        });
    }

    render() {
        const self = this;

        app.setPageTitle('跟谁学优选1对1');
        
        const subjectComponet = self.state.subjectData.map(function (item) {
            return (<ScdSubjectItem key={item.name} item={item} />);
        });

        return (
            <div className="scd-subject-content">
                <div className="scd-subject-title">请选择学习阶段</div>
                {subjectComponet}
            </div>
        );
    }
}

export default ScdSubject;