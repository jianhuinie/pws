/**
 * @file 获取老师相册信息
 * @path /api/tcenter/album/video/list
 * @author niejianhui
 */
var mockCreatFunction = function () {
    'use strict';

    var data = {
        code: 0,
        pageDto: null,
        error: null
    };

    data.data = {
        query_multimedia_videos: [
            {
                "id": "44442",
                "title": null,
                "media_id": "172135",
                "cover_url": "http://test-img.gsxservice.com/399869_9r4mbto7.jpeg",
                "verify_status": "INIT",
                "verify_outer_reasons": {
                  "id": "1651",
                  "name": "点播视频",
                  "reasons": [
                    "您上传的内容可能涉及造谣、侮辱、诽谤、谩骂等有人身攻击之嫌，侵害他人合法权益"
                  ],
                  "children": null
                }
              },
                  {
                    "id": "44441",
                    "title": null,
                    "media_id": "172134",
                    "cover_url": "http://test-img.gsxservice.com/399868_tez6b3qn.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  },
                  {
                    "id": "44440",
                    "title": null,
                    "media_id": "172133",
                    "cover_url": "http://test-img.gsxservice.com/399867_67bbgxte.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  },
                  {
                    "id": "44437",
                    "title": null,
                    "media_id": "172126",
                    "cover_url": "http://test-img.gsxservice.com/399852_7mmghftv.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  },
                  {
                    "id": "44418",
                    "title": null,
                    "media_id": "171825",
                    "cover_url": "http://test-img.gsxservice.com/398841_35sx334k.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  },
                  {
                    "id": "44404",
                    "title": null,
                    "media_id": "171803",
                    "cover_url": "http://test-img.gsxservice.com/398818_e3kq9rgf.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  },
                  {
                    "id": "44405",
                    "title": null,
                    "media_id": "171804",
                    "cover_url": "http://test-img.gsxservice.com/398819_dp41cwzb.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  },
                  {
                    "id": "44406",
                    "title": null,
                    "media_id": "171805",
                    "cover_url": "http://test-img.gsxservice.com/398820_qzk53bdc.jpeg",
                    "verify_status": "INIT",
                    "verify_outer_reasons": null
                  }
        ]
    };
    // for (var i = 0; i < 5; i++) {
    //     data.data.push({
    //         "cover_url": "http://test-img.gsxservice.com/00-upload/image-test/68844_66ec2f0d055edf13fa4eddbe70613e02_wMK5kjnV.jpg",
    //         "id": Math.ceil(Math.random() * 100) + i,
    //         "title": "新上传照片",
    //     });
    // }

    return data;
};
