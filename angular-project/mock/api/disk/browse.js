/**
 * @file 获取资料库列表
 * @path /storage/usage
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
        "current_path": "/system/video/bbb",
        "current_path_option": {
            "can_new": false,
            "can_upload": false
        },
        "crumb": [
            {
                "name": "个人资料库",
                "path": "/personal/"
            },
            {
                "name": "黄猛",
                "path": "/personal/293065ee-1b72-4a68-9ae1-683a2f26bd12/"
            },
            {
                "name": "圣诞节福利送就",
                "path": "/personal/293065ee-1b72-4a68-9ae1-683a2f26bd12/196/"
            }
        ],
        "list": [
            {
                "type": "dir",
                "name": "课" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "2017-05-10 10:14:26",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },
            {
                "type": "dir",
                "name": "课了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "2017-05-10 10:14:26",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "2017-05-10 10:14:26",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },{
                "type": "dir",
                "name": "课件会尽快送打火机康师傅和肯德基付款了的积分看了电视剧看了放暑假了" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": true,
                "level": 2,
                "size": 10684266000,
                "uploadRate": "80%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "did": Math.floor(Math.random() * 1000)
            },
            {
                "type": "file",
                "name": "课件那地方接口的开发就考虑到是解放路口圣诞节疯狂了倒计时快乐发送到" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": false,
                "file_type": 'mp4',
                "level": 2,
                "size": "66",
                "uploadRate": "60%",
                "permition": {
                    "can_download": false,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "fid": Math.floor(Math.random() * 1000)
            },
            {
                "type": "file",
                "name": "课件那地方接口的开发就考虑到是解放路口圣诞节疯狂了倒计时快乐发送到" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "has_dir": false,
                "file_type": 'mp4',
                "level": 2,
                "size": 10684266000,
                "uploadRate": "60%",
                "permition": {
                    "can_download": false,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "fid": Math.floor(Math.random() * 1000)
            },
            {
                "type": "file",
                "name": "课件的减肥快乐就上课了积分考虑到是解放路口上加了放假了房间了是" + Math.floor(Math.random() * 10),
                "path": "/system/courseware/",
                "time": "--",
                "file_type": 'mp4',
                "has_dir": false,
                "size": 10684266000,
                "level": 2,
                "uploadRate": "40%",
                "permition": {
                    "can_download": true,
                    "can_move": true,
                    "can_rename": true,
                    "can_delete": true
                },
                "fid": Math.floor(Math.random() * 1000)
            }
        ]
    };



    return obj;
};