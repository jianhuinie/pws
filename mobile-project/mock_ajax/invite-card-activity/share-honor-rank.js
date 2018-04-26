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
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "message": "请求成功",
            "data": {
                "items": [
                    {
                        "name": "失忆的决",
                        "imgurl": "http://wx.qlogo.cn/mmopen/O0jkvgVB09v7hzcsUmxcacJIibbMZN3gBS6J0AiaZ2SW5xE4CPIL7pZf7ZDNX6MIibZWibz41ElxKnMFN5BQ26I14zAvkJL6fahQ/0",
                        "invite_count": "3",
                        "coupon_count": 0,
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "懵懂",
                        "imgurl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4ltjN1CTrMy2LMibBOrMPeX4ibicSkMCCP62ccVZQBuEibAy1hvGYFS7ACfI2DW4ykyic45Grok1dxDzQ/0",
                        "invite_count": "3",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "希涛",
                        "imgurl": "http://wx.qlogo.cn/mmopen/ZMdxSDafpxTfdiaK7qI9LGITR4WiaxWp7lOxpvcQC19fqOAI4QysHWpNzaAicjq6z7nGXJd0ewmg40Vwfr0ITCDU7fadcDMFZlF/0",
                        "invite_count": "2",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "懵懂",
                        "imgurl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4ltjN1CTrMy2LMibBOrMPeX4ibicSkMCCP62ccVZQBuEibAy1hvGYFS7ACfI2DW4ykyic45Grok1dxDzQ/0",
                        "invite_count": "3",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "希涛",
                        "imgurl": "http://wx.qlogo.cn/mmopen/ZMdxSDafpxTfdiaK7qI9LGITR4WiaxWp7lOxpvcQC19fqOAI4QysHWpNzaAicjq6z7nGXJd0ewmg40Vwfr0ITCDU7fadcDMFZlF/0",
                        "invite_count": "2",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "懵懂",
                        "imgurl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4ltjN1CTrMy2LMibBOrMPeX4ibicSkMCCP62ccVZQBuEibAy1hvGYFS7ACfI2DW4ykyic45Grok1dxDzQ/0",
                        "invite_count": "3",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "希涛",
                        "imgurl": "http://wx.qlogo.cn/mmopen/ZMdxSDafpxTfdiaK7qI9LGITR4WiaxWp7lOxpvcQC19fqOAI4QysHWpNzaAicjq6z7nGXJd0ewmg40Vwfr0ITCDU7fadcDMFZlF/0",
                        "invite_count": "2",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "懵懂",
                        "imgurl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4ltjN1CTrMy2LMibBOrMPeX4ibicSkMCCP62ccVZQBuEibAy1hvGYFS7ACfI2DW4ykyic45Grok1dxDzQ/0",
                        "invite_count": "3",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "希涛",
                        "imgurl": "http://wx.qlogo.cn/mmopen/ZMdxSDafpxTfdiaK7qI9LGITR4WiaxWp7lOxpvcQC19fqOAI4QysHWpNzaAicjq6z7nGXJd0ewmg40Vwfr0ITCDU7fadcDMFZlF/0",
                        "invite_count": "2",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    },
                    {
                        "name": "希涛",
                        "imgurl": "http://wx.qlogo.cn/mmopen/ZMdxSDafpxTfdiaK7qI9LGITR4WiaxWp7lOxpvcQC19fqOAI4QysHWpNzaAicjq6z7nGXJd0ewmg40Vwfr0ITCDU7fadcDMFZlF/0",
                        "invite_count": "2",
                        "coupon_count": "10",
                        "rank_order": parseInt(Math.random() * 1000)
                    }
                ],
                "current": {
                    "weixin": null,
                    "rank": {
                        "rank_order": 1,
                        "invite_count": 3,
                        "coupon_count": 0
                    }
                },
                "pager": {
                    "has_more": true,
                    "next_page": 2,
                    "current_page": 1,
                    "total": 3,
                    "per_page": 10
                }
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
