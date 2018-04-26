/**
 * @file 上传视频
 * @path  /api/tcenter/foundation/storage/get-playback-upload-video-url
 * niejianhui
 */
var mockCreatFunction = function (params) {
    'use strict';
    var result = {
        code: 0,
        pageDto: null,
        error: null,
        data: {
            id: 113603,
            resume: false,
            upload_size: 0,
            upload_url: "/api/disk/upload?fid=113603&ts=1484104942418&token=4c2a03af08dcc2b48930cbd437a56a38",
            fid: 113603,
            video_unique: "",
            signal: 'params.signal',
            package_url: 'gfdsewefdsd',
            package_md5: 'params.package_md5',
            package_size: 'params.package_size'
        }
    };

    return result;
};
