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
            "data": [
                {
                  "id": 187876,
                  "url": "http://test-img.gsxservice.com/747225_4waffh4d.png"
                },
                {
                  "id": 187877,
                  "url": "http://test-img.gsxservice.com/747226_nt4csd9a.png"
                },
                {
                  "id": 187878,
                  "url": "http://test-img.gsxservice.com/747227_exftnfjy.png"
                },
                {
                  "id": 187879,
                  "url": "http://test-img.gsxservice.com/747228_6ejq4h4n.png"
                },
                {
                  "id": 187880,
                  "url": "http://test-img.gsxservice.com/747229_780w78cv.png"
                },
                {
                  "id": 187881,
                  "url": "http://test-img.gsxservice.com/747230_8cjuzpg9.png"
                },
                {
                  "id": 187882,
                  "url": "http://test-img.gsxservice.com/747231_4k97fbqm.png"
                },
                {
                  "id": 187883,
                  "url": "http://test-img.gsxservice.com/747232_k30l7bj4.png"
                },
                {
                  "id": 187884,
                  "url": "http://test-img.gsxservice.com/747233_d5uxb8th.png"
                },
                {
                  "id": 187885,
                  "url": "http://test-img.gsxservice.com/747234_liub1edm.png"
                },
                {
                  "id": 187886,
                  "url": "http://test-img.gsxservice.com/747235_ii3sbwoi.png"
                },
                {
                  "id": 187887,
                  "url": "http://test-img.gsxservice.com/747236_mzr4v4oi.png"
                },
                {
                  "id": 187893,
                  "url": "http://test-img.gsxservice.com/747265_of65pqfh.png"
                },
                {
                  "id": 187894,
                  "url": "http://test-img.gsxservice.com/747266_i0lh6zeb.png"
                },
                {
                  "id": 187895,
                  "url": "http://test-img.gsxservice.com/747267_g6r51api.png"
                },
                {
                  "id": 187896,
                  "url": "http://test-img.gsxservice.com/747268_y7by2vl9.png"
                },
                {
                  "id": 187897,
                  "url": "http://test-img.gsxservice.com/747269_vw33wglv.png"
                },
                {
                  "id": 187898,
                  "url": "http://test-img.gsxservice.com/747270_rfpcqjj5.png"
                },
                {
                  "id": 187899,
                  "url": "http://test-img.gsxservice.com/747271_5p1d9qci.png"
                },
                {
                  "id": 187900,
                  "url": "http://test-img.gsxservice.com/747272_aorh482u.png"
                },
                {
                  "id": 187901,
                  "url": "http://test-img.gsxservice.com/747273_t82aid8c.png"
                },
                {
                  "id": 187902,
                  "url": "http://test-img.gsxservice.com/747274_l874u1vq.png"
                },
                {
                  "id": 187903,
                  "url": "http://test-img.gsxservice.com/747275_ln8y8b2d.png"
                },
                {
                  "id": 187904,
                  "url": "http://test-img.gsxservice.com/747276_xzz6rrgw.png"
                },
                {
                  "id": 187905,
                  "url": "http://test-img.gsxservice.com/747277_7xmplfl5.png"
                },
                {
                  "id": 187906,
                  "url": "http://test-img.gsxservice.com/747278_sba9wwtt.png"
                },
                {
                  "id": 187907,
                  "url": "http://test-img.gsxservice.com/747280_ivv75kp2.png"
                },
                {
                  "id": 187908,
                  "url": "http://test-img.gsxservice.com/747281_gxvyqhhg.png"
                },
                {
                  "id": 187909,
                  "url": "http://test-img.gsxservice.com/747282_voq6hg3w.png"
                },
                {
                  "id": 187910,
                  "url": "http://test-img.gsxservice.com/747283_v177kwxd.png"
                },
                {
                  "id": 187911,
                  "url": "http://test-img.gsxservice.com/747284_zw8hf2el.png"
                },
                {
                  "id": 187912,
                  "url": "http://test-img.gsxservice.com/747285_mlxop8x8.png"
                },
                {
                  "id": 187913,
                  "url": "http://test-img.gsxservice.com/747286_w9v6mxji.png"
                },
                {
                  "id": 187914,
                  "url": "http://test-img.gsxservice.com/747287_24shkti3.png"
                },
                {
                  "id": 187915,
                  "url": "http://test-img.gsxservice.com/747288_vyri4tgf.png"
                },
                {
                  "id": 187916,
                  "url": "http://test-img.gsxservice.com/747289_yiuuq02u.png"
                },
                {
                  "id": 187917,
                  "url": "http://test-img.gsxservice.com/747290_8g7wn3l3.png"
                },
                {
                  "id": 187918,
                  "url": "http://test-img.gsxservice.com/747291_drao3d88.png"
                },
                {
                  "id": 187919,
                  "url": "http://test-img.gsxservice.com/747292_8oyeudrm.png"
                },
                {
                  "id": 187920,
                  "url": "http://test-img.gsxservice.com/747293_kd853gpi.png"
                },
                {
                  "id": 187921,
                  "url": "http://test-img.gsxservice.com/747295_2xh8x5g7.png"
                },
                {
                  "id": 187922,
                  "url": "http://test-img.gsxservice.com/747296_65fbq0ta.png"
                },
                {
                  "id": 187923,
                  "url": "http://test-img.gsxservice.com/747297_topob6s1.png"
                },
                {
                  "id": 187924,
                  "url": "http://test-img.gsxservice.com/747298_ghkf5u60.png"
                },
                {
                  "id": 187925,
                  "url": "http://test-img.gsxservice.com/747300_mcdc6nve.png"
                },
                {
                  "id": 187926,
                  "url": "http://test-img.gsxservice.com/747301_g2rjqs08.png"
                },
                {
                  "id": 187927,
                  "url": "http://test-img.gsxservice.com/747302_h2r8keg5.png"
                },
                {
                  "id": 187928,
                  "url": "http://test-img.gsxservice.com/747303_doi77pfd.png"
                },
                {
                  "id": 187929,
                  "url": "http://test-img.gsxservice.com/747304_t410ax9c.png"
                },
                {
                  "id": 187930,
                  "url": "http://test-img.gsxservice.com/747305_sf5co57p.png"
                },
                {
                  "id": 187931,
                  "url": "http://test-img.gsxservice.com/747306_e75j2mbg.png"
                },
                {
                  "id": 187932,
                  "url": "http://test-img.gsxservice.com/747307_nvke8x7k.png"
                },
                {
                  "id": 187933,
                  "url": "http://test-img.gsxservice.com/747308_iqs24zsm.png"
                },
                {
                  "id": 187934,
                  "url": "http://test-img.gsxservice.com/747309_bp5gpqsq.png"
                },
                {
                  "id": 187935,
                  "url": "http://test-img.gsxservice.com/747310_l93x468w.png"
                },
                {
                  "id": 187936,
                  "url": "http://test-img.gsxservice.com/747311_xpq796fp.png"
                },
                {
                  "id": 187937,
                  "url": "http://test-img.gsxservice.com/747312_qa78zy4o.png"
                },
                {
                  "id": 187938,
                  "url": "http://test-img.gsxservice.com/747313_6pz1ydzw.png"
                },
                {
                  "id": 187939,
                  "url": "http://test-img.gsxservice.com/747314_nsul1by2.png"
                },
                {
                  "id": 187940,
                  "url": "http://test-img.gsxservice.com/747315_qfxttq5l.png"
                },
                {
                  "id": 187941,
                  "url": "http://test-img.gsxservice.com/747316_2curylzu.png"
                },
                {
                  "id": 187942,
                  "url": "http://test-img.gsxservice.com/747317_jddf8d2w.png"
                },
                {
                  "id": 187943,
                  "url": "http://test-img.gsxservice.com/747318_rchlds3m.png"
                },
                {
                  "id": 187944,
                  "url": "http://test-img.gsxservice.com/747319_wmn4lmsx.png"
                },
                {
                  "id": 187945,
                  "url": "http://test-img.gsxservice.com/747320_xnejtxoh.png"
                },
                {
                  "id": 187946,
                  "url": "http://test-img.gsxservice.com/747321_jxrq4rdo.png"
                },
                {
                  "id": 187947,
                  "url": "http://test-img.gsxservice.com/747322_jyew3agn.png"
                },
                {
                  "id": 187948,
                  "url": "http://test-img.gsxservice.com/747323_cwun6w8j.png"
                },
                {
                  "id": 187949,
                  "url": "http://test-img.gsxservice.com/747324_2sxftuqf.png"
                },
                {
                  "id": 187950,
                  "url": "http://test-img.gsxservice.com/747325_8305crcj.png"
                },
                {
                  "id": 187951,
                  "url": "http://test-img.gsxservice.com/747326_fau1ie5d.png"
                },
                {
                  "id": 187952,
                  "url": "http://test-img.gsxservice.com/747327_woms2r04.png"
                },
                {
                  "id": 187953,
                  "url": "http://test-img.gsxservice.com/747328_hbacenh6.png"
                },
                {
                  "id": 187954,
                  "url": "http://test-img.gsxservice.com/747329_ofd3ykjj.png"
                },
                {
                  "id": 187955,
                  "url": "http://test-img.gsxservice.com/747330_bhcmzu0t.png"
                }
            ],
            "ts": 1470291120,
            "msg": "succ"
        }
    };
};

/* eslint-enable fecs-camelcase */
