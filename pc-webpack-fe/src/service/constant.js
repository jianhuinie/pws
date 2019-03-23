/**
 * @file 常量定义
 * @author dafo<huanghoujin@baijiahulian.com>
 */

/**
 * 所有ajax接口path配置路径
 * @date 2018/04/02
 */
const ajaxConfig = {
    ORDER: {
        ORDERLIST: '/sapi/order/list2',
        ORDERDETAIL: '/sapi/order/detail',
        LINKORDERDETAIL: '/sapi/order/linkClazzDetail',
        ADDRESSSET: '/sapi/order/addressSet',
    },
    PURCHASE: {
        CANCELORDER: '/sapi/purchase/cancelOrder',
        PURCHASEDETAIL: '/sapi/purchase/detail',
        PURCHASELINKDETAIL: '/sapi/purchase/linkClazzDetail',
        GETPURCHASEID: '/sapi/purchase/getPurchaseId',
        CREATEORDER: '/sapi/purchase/createOrder',
        CREATELINKORDER: '/sapi/purchase/createLinkClazzOrder',
        HASPAYING: '/purchase/hasPaying',
        SUCCESS: '/sapi/purchase/success'
    },
    ADDRESS: {
        LIST: '/sapi/address/list',
        SAVE: '/sapi/address/save',
        DELETE: '/sapi/address/delete',
        SET: '/sapi/order/addressSet'
    },
    TEACHERUPLOADVIDEO: {
        // 获取上传连接
        GET_UPLOAD_URL: '/tapi/LiveFile/uploadUrl',
        //  获取文件夹列表或者文件列表
        GETVIDEOLIST: '/tapi/LiveFile/list',
        //  提交文件信息
        FILEINFO: '/tapi/LiveFile/uploadInfo'
    },
    ASSISTANTTEACHTER: {
        BUSINESSCARD: '/sapi/assistantTeacher/businessCard'
    },
    CELLCLAZZ: {
        DETAIL: '/sapi/viewLogic/cellClazz/detail',
        // 查看更多节
        PAGERLESSON: '/sapi/viewLogic/cellClazz/pagerLesson',
        // 查看更多章
        PAGERCHAPTER: '/sapi/viewLogic/cellClazz/pagerChapter',
        TEACHERS: '/sapi/cellClazz/teachers',
        FOOTBAR: '/sapi/cellClazz/footBar',
        RECOMMENDCLAZZ: '/sapi/cellClazz/relatedClazzes',
        AUDITION: '/sapi/cellClazz/audition',
    },
    CHANNELNAV: '/index/get-navigation',
    AREA: {
        LIST: '/common/area/list'
    },
    // 评价
    COMMENT: {
        // 获取我的评价列表
        STUDENT_PAGE_COMMENTS: '/sapi/comment/comments',
        // 获取待评价列表
        STUDENT_PAGE_WAITING_COMMENTS: '/sapi/comment/waitingComments',
        PRODUCEPAGECOMMENTS: '/sapi/comment/productPageComments',
        STUDENT_MIX_COMMENTS: '/sapi/comment/mixComments',
        // 创建评价
        CREATE: '/sapi/comment/create',
        // 老的添加评价
        OLD_ADDITIONAL: '/comment/additional',
        // 修改评价
        UPDATE: '/sapi/comment/update',
        // 评价总数
        SUMMARY: '/sapi/comment/productCommentSummaries',
        // 获取单条评价（修改评价）
        COMMENTBYNUMBER: '/sapi/comment/commentByNumber',
        // 判断是否可评价
        CANBECOMMENT: '/sapi/comment/canBeComment',
    },
    CLASSROOM: {
        CLASSROOMLIST: '/sapi/classroom/list',
        TIMETABLE: '/sapi/classroom/timetable',
        TIMETABLEDATE: '/sapi/classroom/timetableDate',
        BUTTONURL: '/sapi/video/playV2',
        TEACHERBUTTONURL: '/tapi/video/play',
        CELLCOURSE: '/sapi/classroom/cellCourse',
        LESSONLIST: '/sapi/classroom/lessonList',
        VIDEOCOURSE: '/api/scenter/video/items',
        OLDCOURSE: '/api/playback/lessons',
        TOPCOURSE: '/sapi/course/setTopCourse'
    },
    USER: {
        BASICINFO: '/user/basicInfo',
        SWITCHROLE: '/user/switch_role_ajax'
    },
    LIVECLIENT: {
        LIVEROOMPARAM: '/sapi/liveClient/liveRoomParam',
        TEACHERTIMETABLE: '/tapi/liveClient/teacherTimetable',
        STUDENTTIMETABLE: '/sapi/liveClient/studentTimetable',
        TRAILROOM: '/tapi/video/trailRoom'

    },
    COUPON: {
        MYCOUPON: '/sapi/coupon/myCoupons',
        MYCOUPONSSUMMARIES: '/sapi/coupon/myCouponsSummaries',
        COURSELIST: '/sapi/coupon/clazzes',
        CLAZZCOUPONS: '/sapi/coupon/clazzCoupons',
        RECEIVE: '/sapi/coupon/receive',
    },
    LINKCLAZZ: {
        // 获取班级联报优惠信息
        CELLCLAZZLINKCLAZZES: '/sapi/linkClazz/cellClazzLinkClazzes',
    },
    CLIENTLOGIN: {
        //  获取验证码
        SMSCODE: '/sapi/auth/sendSmsCode',
        //  获取邀请码
        INVITECODE: '/web/room/existcode',
        //  密码登录
        LOGINBYPASSWORD: '/auth/signin_ajax',
        //  验证码登录
        LOGINBYSMS: '/auth/signin_mobile_ajax',
        //  获取国际区号
        GETCOUNTRY: '/index/getGlobalMobile',
        //    获取微信登录信息
        GETWECHATINFO: '/social_accounts_login/wechat_qrcode',
        //  新版登录
        NEWLOGIN: '/sapi/auth/login',
        // 登出
        LOGOUT: '/sapi/auth/logout',
    },
    // 搜索
    SEARCH: {
        // 获取热词
        POPULARKEYWORDS: '/sapi/search/popularKeywords',
        // 关键字搜索
        SEARCH: '/sapi/search/search',
        // 联想词搜索
        SUGGESTIONKEYWORDS: '/sapi/search/suggestionKeywords',
    },
    // 直播
    LIVE: {
        // 老师端直播教室推课列表
        TEACHERPUSHCOURSELIST: '/tapi/liveRecommendCourse/list',
        // 老师端直播教室推课详情
        TEACHERPUSHCOURSEDETAIL: '/tapi/liveRecommendCourse/detail',
        // 学生端直播教室推课详情
        STUDENTPUSHCOURSEDETAIL: '/sapi/liveRecommendCourse/detail',

        // 抽奖
        // 老师端
        // 老师端主讲老师获取抽奖信息
        TEACHERLOTTERYINFO: '/sapi/liveLottery/liveLotteryInfo',
        // 老师端主讲老师创建奖品
        TEACHERLOTTERYCREATE: '/tapi/liveLottery/create',
        // 老师端辅导老师创建奖品
        COUNSELORTEACHERLOTTERYCREATE: '/sapi/liveLottery/create',
        // 老师端主讲老师创建奖品
        TEACHERLOTTERYEDIT: '/tapi/liveLottery/edit',
        // 老师端辅导老师创建奖品
        COUNSELORTEACHERLOTTERYEDIT: '/sapi/liveLottery/edit',
        // 老师端开奖/发起抽奖
        TEACHERLOTTERYANNOUNCE: '/tapi/liveLottery/announce',
        // 老师端抽奖详情
        TEACHERLOTTERYDETAIL: '/tapi/liveLottery/detail',
        // 学生端
        // 学生端抽奖详情
        STUDENTLOTTERYDETAIL: '/sapi/liveLottery/detail',
        // 学生端参与抽奖
        STUDENTLOTTERYJOIN: '/sapi/liveLottery/join',
        // 老师端、学生端公用
        // 老师端、学生端轮询抽奖人数
        LOTTERYSCAN: '/sapi/liveLottery/scan',
        // 老师端、学生端抽奖结果
        LOTTERYRESULT: '/sapi/liveLottery/result',
    },

    //  视频鉴权
    VIDEOAUTH: {
        PLAYBACKVIDEO: '/sapi/video/playbackAuth'
    },
    WEIXIN: {
        // 获取微信公众号二维码
        GETCOURSEQRCODE: '/common/weixin/courseQrcode',
    },
    //  兴趣阶段及标签
    STAGEHOBBY: {
        //  获取兴趣阶段及标签信息
        GETINFO: '/sapi/stagePrefer/list'
    },
    //  系统通知系统消息
    SYSTEM: {
        GETMESSAGE: '/message/secretary'
    },
    //  保存学员信息
    ACCOUNT: {
        SAVEINFO: '/sapi/student/save',
        // 获取学员信息
        GETINFO: '/sapi/student/detail',
    },
    //  上传头像
    UPLOAD: {
        AVATAR: '/common/storage/uploadFile'
    },
    //  获取安全设置基础信息
    SAFESET: {
        INFO: '/student_center/security?render=json',
        SETLOGINPASSWORD: '/sapi/auth/setPassword',
        //  修改绑定手机
        CHECKOLDMOBILE: '/sapi/auth/modifyMobile',
        // 绑定新手机号  ?action=savephone
        BINDNEWMOBILE: '/teacher_center/account_ajax?action=savephone',
        //  设置支付密码
        SETPAYPASSWORD: '/user/upsert_pay_password',
        // 解绑微信
        CANCELBIND: '/sapi/sns/destroyBind',
        // 微信登录
        BINDWECHAT: '/sapi/sns/auth',
        //  绑定微信
        WECHATBIND: '/sapi/sns/addBind',
        //  检查手机号是否可用
        CHECKMOBILE: '/sapi/auth/mobileExist'
    },

    //  联报课详情页
    COMBOCOURSE: {
        //  报名按钮信息
        ENTERBUTTON: '/sapi/linkClazz/footBar',
        //  获取联报课其余课程信息
        DETAILE: '/sapi/linkClazz/detail'
    },

    // 老师数据
    TEACHERDATA: {
        // 老师业务数据
        BUSINESEDATA: '/tapi/showData/myData',
        // 老师是否有权利看
        HASRIGHT: '/tapi/showData/hasRight'
    },
};

export default ajaxConfig;
