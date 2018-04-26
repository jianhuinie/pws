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
module.exports = function(path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            "code": 0,
            "msg": "succ",
            "data": {
                "list_length": "413",
                "question": {
                    "number": "24880349522",
                    "content": "第二小题里1/2是怎么来的",
                    "pics_url": [
                        "http://img.gsxservice.com/9022683_tizknbe7.jpeg"
                    ]
                },
                "answer_list": {
                    "question_id": "74434",
                    "content": null,
                    "audio": "3504780",
                    "audio_length": "29",
                    "pic_url": null,
                    "audio_url": "http://file.gsxservice.com/9022747_iooevvxb.mp3"
                },
                "is_show": 1
            },
            "ts": 1472625071,
            "declare_config": {
                "declareTpl": null
            }
        }
    };
};

/* eslint-enable fecs-camelcase */