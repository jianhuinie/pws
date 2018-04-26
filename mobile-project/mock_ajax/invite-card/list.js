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
            "message": "succ",
            "data": {
                "items": [
                    {
                        "uuid": "32ffc51d-f2a2-4949-8f3c-b49eadba6f46",
                        "name": "抽奖",
                        "begin_time": "2017-01-14 00:00:00",
                        "end_time": "2017-01-14 23:59:59",
                        "quota": "2",
                        "is_end": false,
                        "stat": {
                            "cards_count": 0,
                            "cards_satisfy_quota_count": 0
                        },
                        "course": {
                            "name": "歪歪课程"
                        }
                    },
                    {
                        "uuid": "4a189ccd-2581-4809-907c-2e857319b5c3",
                        "name": "抽奖",
                        "begin_time": "2017-01-02 00:00:00",
                        "end_time": "2017-01-13 00:00:00",
                        "quota": "2",
                        "is_end": false,
                        "stat": {
                            "cards_count": 80,
                            "cards_satisfy_quota_count": 12
                        },
                        "course": {
                            "name": "ddwd"
                        }
                    },
                    {
                        "uuid": "82741a05-21c5-4d69-8e7f-dc8f8cf3c265",
                        "name": "抽奖",
                        "begin_time": "2017-01-02 00:00:00",
                        "end_time": "2017-01-08 00:00:00",
                        "quota": "1",
                        "is_end": true,
                        "stat": {
                            "cards_count": 0,
                            "cards_satisfy_quota_count": 0
                        },
                        "course": {
                            "name": "ddwd"
                        }
                    },
                    {
                        "uuid": "04f443c4-3d9e-40f2-991b-d3e9c9a7f1a6",
                        "name": "抽奖",
                        "begin_time": "2017-01-02 00:00:00",
                        "end_time": "2017-01-08 00:00:00",
                        "quota": "1",
                        "is_end": true,
                        "stat": {
                            "cards_count": 0,
                            "cards_satisfy_quota_count": 0
                        },
                        "course": {
                            "name": "ddwd"
                        }
                    },
                    {
                        "uuid": "67ee2348-b743-4ada-9208-79acfa94bc8e",
                        "name": "抽奖",
                        "begin_time": "2017-01-02 00:00:00",
                        "end_time": "2017-01-08 00:00:00",
                        "quota": "1",
                        "is_end": true,
                        "stat": {
                            "cards_count": 0,
                            "cards_satisfy_quota_count": 0
                        },
                        "course": {
                            "name": "ddwd"
                        }
                    },
                    {
                        "uuid": "846cd2dd-1dea-40c4-95c8-a412a0727d5c",
                        "name": "抽奖",
                        "begin_time": "2017-01-02 00:00:00",
                        "end_time": "2017-01-08 00:00:00",
                        "quota": "1",
                        "is_end": true,
                        "stat": {
                            "cards_count": 0,
                            "cards_satisfy_quota_count": 0
                        },
                        "course": {
                            "name": "ddwd"
                        }
                    },
                    {
                        "uuid": "6d126e33-88d3-44f8-baa0-4bd42ac79eb0",
                        "name": "哥哥",
                        "begin_time": "2017-01-02 00:00:00",
                        "end_time": "2017-01-08 00:00:00",
                        "quota": "1",
                        "is_end": true,
                        "stat": {
                            "cards_count": 0,
                            "cards_satisfy_quota_count": 0
                        },
                        "course": {
                            "name": "ddwd"
                        }
                    }
                ],
                "pager": {
                    "has_more": false,
                    "next_page": 3,
                    "current_page": 2,
                    "total": 7
                }
            },
            "render": null
        }    
    };
};

/* eslint-enable fecs-camelcase */
