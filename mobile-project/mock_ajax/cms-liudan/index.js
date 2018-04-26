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
                    "type": "form",
                    "subjects": [
                        {
                            "id": "226",
                            "name": "初三"
                        },
                        {
                            "id": "161",
                            "name": "初中"
                        },
                        {
                            "id": "107",
                            "name": "小学"
                        }
                    ],
                    "title": "大title字段",
                    "sub_title": "买的吗，随便加的"
                },
                {
                    "type": "image",
                    "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494409443406&di=38e36a7636a6bd790fe82767cdc5088d&imgtype=0&src=http%3A%2F%2Fpic17.nipic.com%2F20111122%2F6759425_152002413138_2.jpg",
                    "height": 248
                },
                {
                    "type": "slider",
                    "imgs": [
                        {
                            img: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510edf12980.jpg"
                        },
                        {
                            img: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/12/58510eac16508.jpg"
                        },
                        {
                            img: "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/10/580f424e2a9fe.jpg"
                        }
                    ]
                },
                {
                    "type": "video",
                    "video_url": "https://m.genshuixue.com/video/play_view/419279",
                    "cover_img": "https://test-imgs.genshuixue.com/0cms/d/file/content/2016/10/57fdc6c77a31a.png"
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
