/**
 * 一对一优选首页
 * @author leon
 */
import React from 'react';
import CONFIG from './config';
import { hashHistory } from 'react-router';
const service = require('common/service');
import OrderCard from 'spa/module/page/one2one/best/components/OrderCard/index';
import RcmdCard from 'spa/module/page/one2one/best/components/RcmdCard/index';
import HotSubject from 'spa/module/page/one2one/best/components/HotSubject/index';
import DemandForm from 'spa/module/page/one2one/best/components/DemandForm/index';
import PromiseTerms from 'spa/module/page/one2one/best/components/PromiseTerms/index';
import DetailFooter from 'spa/module/page/one2one/best/components/DetailFooter/index';
import TopBar from 'spa/module/page/one2one/best/components/TopBar/index';
import ListItem from 'spa/module/page/one2one/best/components/ItemCard/index';
import PageController from 'spa/common/controller/PageController';

const lazyLoadImage = require('common/lazyLoadImage');
const app = require('common/app');
const user = require('common/user');
const UTIL = require('common/util');
const setShare = require('common/share/initialize');
require('css-loader!./index.styl');

class DetailContainer extends PageController {
    constructor(props) {
        super(props);

        let isShow = 1;
        if (app.isStudentApp()) {
            isShow = 0;
        }
        
        this.state = {
            banner: [],
            hotClassify: [],
            recommendTeacher: [],
            order: [],
            bossRcmd: [],
            cityName: UTIL.getHashParams().cityName || '北京',
            isShow: isShow,
            detailData: {}
        };
        
        this.viewMore = this.viewMore.bind(this);
    };

    componentDidMount() {
        const self = this;
        
        service.post(CONFIG.PATHS.DETAIL, {})
            .then(function (res) {
                if (+res.code === 0) {
                    self.setState({
                        banner: res.data.banner,
                        hotClassify: res.data.hot_classify,
                        recommendTeacher: res.data.recommend_teacher,
                        order: res.data.card.boss_order,
                        bossRcmd: res.data.card.boss_teacher,
                        detailData: res.data
                    });
                }
            });   

        user.loginOut();

        setShare({
            title: '跟谁学『优选1对1』 - 名师个性化辅导',
            content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
            url: location.origin + '/webapp/#/one2one/best/se/detail'
        });
    }

    componentDidUpdate() {
        lazyLoadImage.init();
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    viewMore() {
        hashHistory.push('one2one/best/se/subject');
    }

    render() {
        const self = this;

        app.setPageTitle('跟谁学优选1对1');

        const orderComponet = this.state.order.map(function (item) {
            return (<OrderCard key={item.purchase_id} item={item} />);
        });

        const listComponet = this.state.recommendTeacher.map(function (item) {
            return (<ListItem key={item.number} item={item} />);
        });

        const bossRcmdComponet = this.state.bossRcmd.map(function (item) {
            return (<RcmdCard key={item.detail_url} item={item} />);
        });

        return (
            <div className="one2one-detail">
                <TopBar cityName={self.state.cityName} isShow={self.state.isShow} />
                <div className={self.state.isShow ? 'card-list hava-top-bar' : 'card-list'}>
                    {orderComponet}
                    {bossRcmdComponet}
                </div>
                <div className="top-banner">
                    <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/06/59391413dca95.png" />
                </div>
                <div className="demand-form">
                    <div className="demand-form-title first-title">预约名师试听课</div>
                    <DemandForm />
                </div>
                <div className="hot-classify">
                    <div className="hot-classify-title first-title">热门分类</div>
                    <HotSubject hotClassify={this.state.hotClassify} />
                </div>
                <div className="rcmd-teacher">
                    <div className="rcmd-teacher-title first-title">名师推荐</div>
                    {listComponet}
                    <div className="more-teacher" onClick={self.viewMore}>
                        更多老师
                        <span className="icon-chevron-thin-right"></span>
                    </div>
                </div>
                <div className="our-promise">
                    <div className="our-promise-title first-title">我们的承诺</div>
                    <PromiseTerms />
                </div>
                <DetailFooter detail={this.state.detailData} />
                <div className="qr-code">
                    <div className="img left">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/5927c9af6f91f.png" />
                    </div>
                    <div className="img right">
                        <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2017/05/5927c9ae1e8fc.png" />
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        );
    }
};

export default DetailContainer;