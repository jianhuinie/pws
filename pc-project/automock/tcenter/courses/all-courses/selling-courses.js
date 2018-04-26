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
      "number": 160426484506,
      "display_name": "非班课现价插班-验证直播回放我在",
      "prices": {
        "now": 10,
        "original": 66
      },
      "time": {
        "began_at": "2016-04-26 21:00:00",
        "ended_at": "2016-08-12 16:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/520480_iutl6a9q.jpeg"
    },
    {
      "number": 160505485266,
      "display_name": "看看就爱上你的",
      "prices": {
        "now": 0,
        "original": 3454
      },
      "time": {
        "began_at": "2016-05-27 06:00:00",
        "ended_at": "2016-09-16 11:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/521188_1e07a9mu.jpeg"
    },
    {
      "number": 160630489408,
      "display_name": "线下课---设置的固定插班价格",
      "prices": {
        "now": 2.17,
        "original": 444
      },
      "time": {
        "began_at": "2016-06-30 12:00:00",
        "ended_at": "2016-09-23 20:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/623884_214a9l1c.jpeg"
    },
    {
      "number": 160630555328,
      "display_name": "验证班课改价，不能返给学生奖学金",
      "prices": {
        "now": 9.99,
        "original": 444
      },
      "time": {
        "began_at": "2016-08-18 17:00:00",
        "ended_at": "2016-08-18 17:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/526743_xz1auhcn.jpeg"
    },
    {
      "number": 160705488065,
      "display_name": "上课中报名",
      "prices": {
        "now": 0,
        "original": 444
      },
      "time": {
        "began_at": "2016-07-05 10:10:00",
        "ended_at": "2016-07-30 08:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/623884_214a9l1c.jpeg"
    },
    {
      "number": 160714555521,
      "display_name": "中考数学--在线班课",
      "prices": {
        "now": 6,
        "original": 11
      },
      "time": {
        "began_at": "2016-07-14 08:40:00",
        "ended_at": "2016-07-31 11:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/742455_uodhbmdc.jpeg"
    },
    {
      "number": 160714555525,
      "display_name": "中考数学--线下班课",
      "prices": {
        "now": 6,
        "original": 11
      },
      "time": {
        "began_at": "2016-07-14 08:00:00",
        "ended_at": "2016-08-18 14:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/739405_w0l6n6e5.jpeg"
    },
    {
      "number": 160719488596,
      "display_name": "进入教室入口代码迁移到开放平台-01",
      "prices": {
        "now": 0,
        "original": 67
      },
      "time": {
        "began_at": "2016-07-20 14:10:00",
        "ended_at": "2016-08-31 17:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744283_sw7xcdxc.jpeg"
    },
    {
      "number": 160720488216,
      "display_name": "进入教室入口代码迁移到开放平台-02",
      "prices": {
        "now": 0,
        "original": 67
      },
      "time": {
        "began_at": "2016-07-20 16:55:00",
        "ended_at": "2016-08-10 21:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744619_t6828r76.jpeg"
    },
    {
      "number": 160721553936,
      "display_name": "在线授课-不可退-付费课",
      "prices": {
        "now": 67,
        "original": 67
      },
      "time": {
        "began_at": "2016-08-26 14:00:00",
        "ended_at": "2016-08-26 14:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744282_vnaiszwk.jpeg"
    },
    {
      "number": 160721553940,
      "display_name": "在线授课-不可退-零元课",
      "prices": {
        "now": 0,
        "original": 67
      },
      "time": {
        "began_at": "2016-07-30 19:00:00",
        "ended_at": "2016-07-30 19:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744619_t6828r76.jpeg"
    },
    {
      "number": 160721554652,
      "display_name": "方言培训",
      "prices": {
        "now": 67,
        "original": 67
      },
      "time": {
        "began_at": "2016-08-24 22:00:00",
        "ended_at": "2016-08-24 22:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744619_t6828r76.jpeg"
    },
    {
      "number": 160721554832,
      "display_name": "线下授课-不可退-零元课",
      "prices": {
        "now": 0,
        "original": 67
      },
      "time": {
        "began_at": "2016-08-18 07:00:00",
        "ended_at": "2016-08-18 07:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744283_sw7xcdxc.jpeg"
    },
    {
      "number": 160721554836,
      "display_name": "线下授课-不可退-付费课",
      "prices": {
        "now": 1,
        "original": 67
      },
      "time": {
        "began_at": "2016-08-25 13:00:00",
        "ended_at": "2016-08-25 13:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744283_sw7xcdxc.jpeg"
    },
    {
      "number": 160722489304,
      "display_name": "随时可退",
      "prices": {
        "now": 1,
        "original": 67
      },
      "time": {
        "began_at": "2016-08-24 13:00:00",
        "ended_at": "2016-08-24 13:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744619_t6828r76.jpeg"
    },
    {
      "number": 160722489308,
      "display_name": "限时退",
      "prices": {
        "now": 1223,
        "original": 67567
      },
      "time": {
        "began_at": "2016-07-31 20:00:00",
        "ended_at": "2016-07-31 20:30:00"
      },
      "type": 2,
      "cover_url": "http://test-img.gsxservice.com/744283_sw7xcdxc.jpeg"
    },
    {
      "number": 314147515257,
      "display_name": "公共英语",
      "prices": {
        "student": 1,
        "teacher": 1,
        "online": 1,
        "discuss": 1
      },
      "type": 1
    },
    {
      "number": 314147520337,
      "display_name": "钢琴",
      "prices": {
        "student": 35,
        "teacher": 11,
        "online": 44,
        "discuss": 23
      },
      "type": 1
    },
    {
      "number": 319516142417,
      "display_name": "试试",
      "prices": {
        "student": null,
        "teacher": 22,
        "online": null,
        "discuss": null
      },
      "type": 1
    },
    {
      "number": 319516147537,
      "display_name": "在来一次",
      "prices": {
        "student": null,
        "teacher": 222,
        "online": null,
        "discuss": null
      },
      "type": 1
    },
    {
      "number": 362465958737,
      "display_name": "少林拳>",
      "prices": {
        "student": null,
        "teacher": 123456,
        "online": 999999,
        "discuss": null
      },
      "type": 1
    },
    {
      "number": 362633672057,
      "display_name": "太极拳",
      "prices": {
        "student": 111,
        "teacher": 1,
        "online": 1111,
        "discuss": 11
      },
      "type": 1
    },
    {
      "number": 400046845817,
      "display_name": "公安招警",
      "prices": {
        "student": 111,
        "teacher": 1,
        "online": 1111,
        "discuss": 11
      },
      "type": 1
    },
    {
      "number": 443164288337,
      "display_name": "数学",
      "prices": {
        "student": 100,
        "teacher": 1,
        "online": 1980,
        "discuss": 98
      },
      "type": 1
    },
    {
      "number": 16033173809,
      "display_name": "修改=资料库-视频课文件夹测试&资料库",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/521885_hld1kdwz.jpeg"
    },
    {
      "number": 16041549289,
      "display_name": "限时折扣视频课；限时折扣视频课；限时折扣",
      "prices": {
        "now": "100"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/517342_crwqtbyb.jpeg"
    },
    {
      "number": 16042048837,
      "display_name": "检查正常添加视频课",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/517790_b0wac88x.jpeg"
    },
    {
      "number": 16042181629,
      "display_name": "验证视频课节的问题",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/518053_ql9tku5f.jpeg"
    },
    {
      "number": 16050648917,
      "display_name": "新版视频课--01&“新版视频课--01",
      "prices": {
        "now": "12"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/521468_5yr9ie4w.jpeg"
    },
    {
      "number": 16050941027,
      "display_name": "免费课的排序",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522315_yzg66o0j.jpeg"
    },
    {
      "number": 16050949053,
      "display_name": "免费课变为付费课-删除后查看观看效果",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/521951_97zxlgr7.jpeg"
    },
    {
      "number": 16050949099,
      "display_name": "验证视频课删除",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522045_qa338tah.jpeg"
    },
    {
      "number": 16050949219,
      "display_name": "验证售卖中编辑",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522295_46jh8pi8.jpeg"
    },
    {
      "number": 16050949235,
      "display_name": "验证售卖中编辑-免费课",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522304_soiwsd1m.jpeg"
    },
    {
      "number": 16050973605,
      "name": "付费课变为免费课-删除后查看观看效果",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/521975_vlnolstx.jpeg"
    },
    {
      "number": 16050981867,
      "name": "验证排序功能-修改封面课信息",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522330_2lhxz2gi.jpeg"
    },
    {
      "number": 16051040715,
      "name": "删除验证",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522963_k1zy50o2.jpeg"
    },
    {
      "number": 16051040723,
      "name": "修改标题",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523666_qh32xoux.jpeg"
    },
    {
      "number": 16051048899,
      "name": "删除",
      "prices": {
        "now": "2"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522965_i77yy253.jpeg"
    },
    {
      "number": 16051073819,
      "name": "删除付费课节-查看观看效果",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522456_s9pcvbbv.jpeg"
    },
    {
      "number": 16051082011,
      "name": " 身份收到发的发",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/522858_8rgobti6.jpeg"
    },
    {
      "number": 16051151181,
      "name": "普通付费视频课-删除课节",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523294_167mpozk.jpeg"
    },
    {
      "number": 16051151258,
      "name": "Xi jin (云端录播)",
      "prices": {
        "now": "23243"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/520498_zog6u14e.jpeg"
    },
    {
      "number": 16051151342,
      "name": "视频课节展示问题",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523182_w0k498ii.jpeg"
    },
    {
      "number": 16051156202,
      "name": "录播回放生成的视频课（非云端录制）",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523276_k54g6yrg.jpeg"
    },
    {
      "number": 16051159426,
      "name": "Xi jinping vis(云端录播)",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/520498_zog6u14e.jpeg"
    },
    {
      "number": 16051159442,
      "name": "化妆化妆化妆化妆化妆化妆化 (云端录播)",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/520501_1bmx9ol6.jpeg"
    },
    {
      "number": 16051184018,
      "name": "非班课现价插班-验证直播回放(云端录播)",
      "prices": {
        "now": "2"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/520480_iutl6a9q.jpeg"
    },
    {
      "number": 16051184782,
      "name": "验证审核撤销的问题",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523166_bvaxhd0v.jpeg"
    },
    {
      "number": 16051192210,
      "name": "121",
      "prices": {
        "now": "2"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523126_67pbh11d.jpeg"
    },
    {
      "number": 16051258474,
      "name": "验证新增课节的播放问题",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523845_4xeqgchz.jpeg"
    },
    {
      "number": 16051288747,
      "name": "验证删除提示弹出2次的问题“”&&[]&#34;",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/523589_ip5w8zyn.jpeg"
    },
    {
      "number": 16051762489,
      "name": "验证审核被拒的展示问题",
      "prices": {
        "now": "0.01"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/526723_vl0wu4ij.jpeg"
    },
    {
      "number": 16051887041,
      "name": "1",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/526164_moaoj0bj.jpeg"
    },
    {
      "number": 16051887057,
      "name": "验证视频水印",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/526171_gs716d2x.jpeg"
    },
    {
      "number": 16051954401,
      "name": "验证视频课的限时折扣问题",
      "prices": {
        "now": "40"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/526745_76cpb8wc.jpeg"
    },
    {
      "number": 16062554213,
      "name": "阿里CDN，验证转码",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/733770_x1cc88ry.jpeg"
    },
    {
      "number": 16062562405,
      "name": "CDN切换，新下载的视频转码和播放-标清",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/733855_r8fd2d6s.jpeg"
    },
    {
      "number": 16062562421,
      "name": "CDN切换，新下载的视频转码和播放-高清",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/733857_moi2nrxa.jpeg"
    },
    {
      "number": 16062595061,
      "name": "阿里cdn--女孩和小熊",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/733733_085xmz70.jpeg"
    },
    {
      "number": 16062595069,
      "name": "阿里CDN--这是荷花吗？？？？？？？？",
      "prices": {
        "now": "0.01"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/733746_d4ekxs17.jpeg"
    },
    {
      "number": 16062786997,
      "name": "验证上传课节，保存失败",
      "prices": {
        "now": "1"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/734489_lvns5n6w.jpeg"
    },
    {
      "number": 16062886989,
      "name": "1",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/734704_mvr5ww6l.jpeg"
    },
    {
      "number": 16071886941,
      "name": "都是",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/743895_1ndhz0ft.jpeg"
    },
    {
      "number": 16072062477,
      "name": "CDN改造-A",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/744517_apyjejs2.jpeg"
    },
    {
      "number": 16072062485,
      "name": "cdn改造",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/744516_65jgqivn.jpeg"
    },
    {
      "number": 16072062493,
      "name": "CDN改造-B",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/744519_w09rck3h.jpeg"
    },
    {
      "number": 16072187053,
      "display_name": "cdn改造-C",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/744796_igrqdm1x.jpeg"
    },
    {
      "number": 1606016260101,
      "display_name": "视频课录制 (云端录播)",
      "prices": {
        "now": "0"
      },
      "type": 3,
      "cover_url": "http://test-img.gsxservice.com/521248_64hgfy2w.jpeg"
    }
  ],
  "ts": 1469454327,
  "msg": "succ"
}
    };
};

/* eslint-enable fecs-camelcase */
