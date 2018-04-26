/**
 * 一对一优选 -- 科目筛选组件
 * @file huangshiming
 * @data 2017/04/10
 */
import React from 'react';
import { hashHistory } from 'react-router';
import SubjectLevel from 'spa/common/components/SubjectChoose/index';
import PageController from 'spa/common/controller/PageController';

const app = require('common/app');
const setShare = require('common/share/initialize');
require('css-loader!./index.styl');

class Subject extends PageController {
    constructor(props) {
        super(props);
        this.confirmSubject = this.confirmSubject.bind(this);
        document.title = '全部科目';
    }

    componentDidMount() {
        setShare({
            title: '跟谁学『优选1对1』 - 名师个性化辅导',
            content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
            url: location.origin + '/webapp/#/one2one/best/se/detail'
        });
    }

    confirmSubject(data) {
        hashHistory.push('one2one/best/se/search?subject_id=' + data.index);
    }
    render() {
        app.setPageTitle('全部科目');
        const index = 100;
        const selected = [100, 0, 0];
        return (
            <div className="subject-content-all">
                <SubjectLevel
                    cssType="all"
                    selected={selected}
                    index={index}
                    callback={this.confirmSubject}
                />
            </div>
        );
    }
}

export default Subject;