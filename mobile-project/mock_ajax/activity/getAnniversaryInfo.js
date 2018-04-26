/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    var obj = {
        "code": 0,
        "msg": "succ",
        "data": {
            "title": "这是个标题",
            "tpl_info": [
                {
                    "type": "image",
                    "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494409443406&di=b5bcfaa0cd64bc03697a23634d74aa25&imgtype=0&src=http%3A%2F%2Fimg.tuku.cn%2Ffile_big%2F201502%2Fd130653bfb884152b8a5ba9e846362d1.jpg",
                    "height": 211
                },
                {
                    "type": "text",
                    "content": "酒店很新，设施都很干净，离地铁站有点远要走个十几分钟，楼下的酸菜鱼便宜很好吃，用卷100块钱住了一晚又续了一晚，要是便宜点就更好了。"
                },
                {
                    "type": "image",
                    "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494409443406&di=38e36a7636a6bd790fe82767cdc5088d&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111122%2F6759425_152002413138_2.jpg",
                    "height": 248,
                    "under_title": "下面的title"
                },
                {
                    "type": "multi_img",
                    "title": "跟谁学创始人兼CEO陈向东：我们都会很好的，如同我们当初出发时那样",
                    "href": "http://news.m.genshuixue.com/16061353547.html?article_from=616",
                    "images": [
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510edf12980.jpg"
                        },
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510eac16508.jpg"
                        },
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/10/580f424e2a9fe.jpg"
                        }
                    ]
                },
                {
                    "type": "multi_img",
                    "title": "跟谁学创始人兼CEO陈向东：我们都会很好的，如同我们当初出发时那样",
                    "href": "http://news.m.genshuixue.com/16061353547.html?article_from=616",
                    "images": [
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510edf12980.jpg"
                        },
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510eac16508.jpg"
                        },
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/10/580f424e2a9fe.jpg"
                        }
                    ]
                },
                {
                    "type": "multi_img",
                    "title": "跟谁学创始人兼CEO陈向东：我们都会很好的，如同我们当初出发时那样",
                    "href": "http://news.m.genshuixue.com/16061353547.html?article_from=616",
                    "images": [
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510edf12980.jpg"
                        },
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510eac16508.jpg"
                        },
                        {
                            url: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/10/580f424e2a9fe.jpg"
                        }
                    ]
                },
                {
                    "type": "text_img",
                    "url": "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510edf12980.jpg",
                    "href": "http://news.m.genshuixue.com/16061353547.html?article_from=616",
                    "title": "我是四川销售王",
                    "abstract": "跟谁学创始人兼CEO陈向东：我们都会很好的，如同我们当初出发时那样",
                    "content_type": ""
                },
                {
                    "type": "text_img",
                    "url": "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510edf12980.jpg",
                    "href": "http://news.m.genshuixue.com/16061353547.html?article_from=616",
                    "title": "中国新闻网 | 在线教育，传统教育的有益补充还是搅局者？",
                    "subtitle": "跟谁学创始人兼CEO陈向东：我们都会很好的，如同我们当初出发时那样",
                    "content_type": "视频",
                    "abstract": "ddfsffgggg跟谁学创始人兼CEO陈向东：我们都会很好的，如同我们当初出发时那样"
                },
                {
                    "type": "footer",
                    "content": [
                        {
                            "text": "Copyright @ 2014-2017 北京百家互联科技有限公司版权所有"
                        },
                        {
                            "text": "京公网安备11010802015210|京ICP备14027590号-1"
                        }
                    ]
                }
            ],
            "share_info": {
                "short_url": "http://test.gensx.cn/Gvy49j",
                "url": "http://test-m.genshuixue.com/cms-liudan/index?type=k12",
                "img": "https://test-imgs.genshuixue.com/0cms/d/file/content/2017/04/5901ad7b417b3.png",
                "share_name": "分享文字title",
                "content": "分享的描述文字描述文字",
                "title": "分享文字title"
            }
        },
        "ts": 1494299060,
        "declare_config": {
            "declareTpl": ""
        }
    };

    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: obj
    };
};

/* eslint-enable fecs-camelcase */
