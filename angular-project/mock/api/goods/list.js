/**
 * @file 获取存储空间商品列表
 * @path  /goods/list.do
 */
var mockCreatFunction = function () {
    'use strict';
    var obj = {};

    obj = {
        code: 0,
        data: null,
        error: null,
        pageDto: null
    };
    obj.data = {
        "begin_date": "2016-12-16",
        "end_date": "2017-12-16",
        "goods": [
            {
                "id": 1,
                "size": 10,
                "recommend": false,
                "description": "约可以存储100小时视频课内容",
                "price_list": [
                    {
                        "vip_level": 0,
                        "vip_name": "非会员",
                        "price": 420
                    },
                    {
                        "vip_level": 1,
                        "vip_name": "会员",
                        "price": 320
                    },
                    {
                        "vip_level": 2,
                        "vip_name": "高级会员",
                        "price": 260
                    },
                    {
                        "vip_level": 3,
                        "vip_name": "超级会员",
                        "price": 220
                    }
                ]
            },
            {
                "id": 2,
                "size": 50,
                "recommend": false,
                "description": "约可以存储500小时视频课内容",
                "price_list": [
                    {
                        "vip_level": 0,
                        "vip_name": "非会员",
                        "price": 1995
                    },
                    {
                        "vip_level": 1,
                        "vip_name": "会员",
                        "price": 1520
                    },
                    {
                        "vip_level": 2,
                        "vip_name": "高级会员",
                        "price": 1235
                    },
                    {
                        "vip_level": 3,
                        "vip_name": "超级会员",
                        "price": 1045
                    }
                ]
            },
            {
                "id": 3,
                "size": 100,
                "recommend": true,
                "description": "约可以存储1000小时视频课内容",
                "price_list": [
                    {
                        "vip_level": 0,
                        "vip_name": "非会员",
                        "price": 3780
                    },
                    {
                        "vip_level": 1,
                        "vip_name": "会员",
                        "price": 2880
                    },
                    {
                        "vip_level": 2,
                        "vip_name": "高级会员",
                        "price": 2340
                    },
                    {
                        "vip_level": 3,
                        "vip_name": "超级会员",
                        "price": 1980
                    }
                ]
            },
            {
                "id": 4,
                "size": 200,
                "recommend": false,
                "description": "约可以存储2000小时视频课内容",
                "price_list": [
                    {
                        "vip_level": 0,
                        "vip_name": "非会员",
                        "price": 7140
                    },
                    {
                        "vip_level": 1,
                        "vip_name": "会员",
                        "price": 5440
                    },
                    {
                        "vip_level": 2,
                        "vip_name": "高级会员",
                        "price": 4420
                    },
                    {
                        "vip_level": 3,
                        "vip_name": "超级会员",
                        "price": 3740
                    }
                ]
            }
        ]
    }

    return obj;
};
