/**
 * 周年模板
 * @author leon
 */
import React from 'react';
const service = require('common/service');
import ImgItem from 'spa/module/page/one2one/best/components/ImgItem/index';
import AnniversaryFooter from 'spa/module/page/one2one/best/components/AnniversaryFooter/index';
import TripleImgItem from 'spa/module/page/one2one/best/components/TripleImgItem/index';
import TextItem from 'spa/module/page/one2one/best/components/TextItem/index';
import TextImgItem from 'spa/module/page/one2one/best/components/TextImgItem/index';
import PageController from 'spa/common/controller/PageController';

const APP = require('common/app');
const UTIL = require('common/util');
const setShare = require('common/share/initialize');
require('css-loader!./index.styl');
const shareInfo = {
    url: location.href,
    content: '400+城市覆盖，8000万家长信赖。全国优选老师，个性化学习方案，全程助教服务，带给你最好的学习体验。',
    img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/05/590fa1bf33f1d.png',
    title: '跟谁学 - 找好老师，上跟谁学'
};

class AnniversaryContainer extends PageController {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tplInfo: []
        };
    };

    componentDidMount() {
        const self = this;
        const url = '/activity/getAnniversaryInfo';
        const type = UTIL.getHashParams().type || 'gsx17';
        const params = {
            type: type
        };

        service.get(url, params)
            .then(function (res) {
                if (+res.code === 0) {
                    const resData = res.data;
                    self.setState({
                        tplInfo: resData.tpl_info,
                        title: resData.title || '跟谁学3周年纪念 - 跟谁学'
                    });

                    const newShareInfo = resData.share_info || shareInfo;
                    setShare({
                        title: newShareInfo.title,
                        content: newShareInfo.content,
                        img: newShareInfo.img,
                        url: location.href
                    });
                }
            });

        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    render() {
        const self = this;

        APP.setPageTitle(self.state.title);

        const listComponet = this.state.tplInfo.map(function (item, index) {
            const listType = item.type;
            let listShow = null;
            const keyVal = 'img' + index;

            switch (listType) {
                case 'image':
                    listShow = (<ImgItem key={keyVal} item={item} />);
                    break;
                case 'text':
                    listShow = (<TextItem key={keyVal} item={item} />);
                    break;
                case 'footer':
                    listShow = (<AnniversaryFooter key={keyVal} item={item} />);
                    break;
                case 'text_img':
                    listShow = (<TextImgItem key={keyVal} item={item} />);
                    break;
                case 'multi_img':
                    listShow = (<TripleImgItem key={keyVal} item={item} />);
                    break;
                default:
                    ;
            }
            return listShow;
        });

        return (
            <div className="anniversary-tpl">
                {listComponet}
            </div>
        );
    }
};

export default AnniversaryContainer;