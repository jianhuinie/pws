/**
 * @file 获取单条机构线索
 * @path /GET/clue/getOrgClue.json
 * hanrui@baijiahulian.com
 */
var mockCreatFunction = function () {
    'use strict';
    // return {"status":200,"data":{"orgInfo":{"id":135301,"orgId":135302,"name":"尖锋教育（江岸校区永清校区）","shortName":null,"type":null,"avatar":"","leaderName":null,"leaderPhone":null,"contactsPhone":null,"firstContacts":null,"contacts":[],"phone":null,"teacherNum":0,"teacherTotal":0,"mail":null,"subjects":null,"specialLabel":null,"status":2,"operator":"王昆","introduce":null,"identiPictures":[],"pictures":null,"openRoleUid":4736,"address":[],"category":"","comment":"","foundDate":null,"schBranchNumberRange":null,"studentNumerRange":null,"coursePriceRange":null},"clueId":355619},"pageDto":null,"error":null};
    // return {"status":200,"data":{"registerInfo":{"registerId":373722969,"registerType":"未知","registerPhone":"19933338764","registerMail":"ppppp@qq.com","owner":null},"orgInfo":{"id":1571,"orgId":1573,"name":"更多资料机构004","shortName":"更多资料机构004","type":2,"avatar":"http://test-img.gsxservice.com/383611_8vy4vmxe.jpeg","leaderName":"基督教可打开看看","leaderPhone":"1545465668664","contactsPhone":"13466768686646","firstContacts":"大结局健健康康","contacts":[{"id":null,"orgId":null,"name":"大结局健健康康","phone":"13466768686646","position":"乘客可"},{"id":null,"orgId":null,"name":"绝对解毒剂","phone":"19933339764","position":"诶诶地"},{"id":null,"orgId":null,"name":"你多久祭祀快看看","phone":"19963645135","position":"三脚架"}],"phone":"19933338764","teacherNum":365,"teacherTotal":10,"mail":null,"subjects":null,"specialLabel":null,"status":8,"operator":"雷志军","introduce":null,"identiPictures":[{"title":"身份认证","url":"http://test-img.gsxservice.com/383612_oziz6zdo.jpeg"},{"title":"教师证认证","url":"http://test-img.gsxservice.com/383613_swmct37b.jpeg"},{"title":"学历认证","url":"http://test-img.gsxservice.com/383614_d01urvw5.jpeg"},{"title":null,"url":"http://test-img.gsxservice.com/383615_m2mhdcks.jpeg"}],"pictures":["http://test-img.gsxservice.com/383616_gin1k48v.jpeg","http://test-img.gsxservice.com/383618_27ta6iq6.jpeg","http://test-img.gsxservice.com/383617_qtjze6zo.jpeg","http://test-img.gsxservice.com/383619_136kwqgc.jpeg","http://test-img.gsxservice.com/383620_hgi1zxz7.jpeg","http://test-img.gsxservice.com/383623_fq9cfsrk.jpeg","http://test-img.gsxservice.com/383621_wjinbei9.jpeg","http://test-img.gsxservice.com/383622_0razxciu.jpeg","http://test-img.gsxservice.com/383624_xfg35gqc.jpeg"],"openRoleUid":1082,"address":[{"value":"北京市海淀区上地西路","isHeadAddr":1},{"value":"中关村软件园孵化器2号楼","isHeadAddr":0},{"value":"中关村科贸电子城","isHeadAddr":0},{"value":"北京市通州区通州区","isHeadAddr":0}],"category":"k12,兴趣,艺术体育,职业考试,其他"},"clueId":47129},"pageDto":null,"error":null};
    // 线索状态：1：待分配；2：已分配；8：已成单；4：待入库；16：废弃；
    var leadsStatus = [1, 2, 8, 4, 16];
    // teacherType:机构类型：1: '工作室',2: '企业',3: '学校'
    var orgTypes = [1, 2, 3];
    // 来源类型：1:PC，2:APP
    var sourceTypes = [1, 2];
    var sourceType = sourceTypes[Math.floor(Math.random() * sourceTypes.length)];

    var data = {
        status: 200,
        pageDto: null,
        error: null
    };

    var status = leadsStatus[Math.floor(Math.random() * leadsStatus.length)];
    var orgType = orgTypes[Math.floor(Math.random() * orgTypes.length)];
    // var orgType = 1;
    var word = Math.random() > 0.5;
    data.data = {
        // 线索唯一标记
        clueId: Math.ceil(Math.random() * 10000),
        registerInfo: {
            registerId: word ? Math.ceil(Math.random() * 10000) : '',
            registerType: word ? orgType : '',
            registerPhone: word ? 15311223321 : '',
            registerMail: word ? 'hanrui@baijiahulian.com' : '',
            owner: word ? '全额付全额企鹅企鹅企鹅去去厄齐尔' : '',
        },
        orgInfo: {
            // 电话
            phone: '18911015111',
            name: '啊多少钱未付企鹅王企鹅费去额外付全额付阿达的法定分阿斯顿发到付',
            shortName: '啊多少钱未付企鹅王企鹅费去额外付全额付阿达的法定分阿斯顿发到付',
            type: orgType,
            avatar: 'http://test-img.gsxservice.com/359647_ag078jph.jpg',
            memo: '阿迪萨斯的法定大发大地方啊实打实大发打发打发按时大大的撒旦法阿斯达实打实地方',
            // 联系人
            contacts: [
                {
                    name: '爱的发的是全额付是打发第三方企鹅阿斯顿发斯蒂芬',
                    phone: '15322123456',
                    position: '百家首席前端设计师'
                },
                {
                    name: '爱的发的是全额付是打发第三方企鹅阿斯顿发斯蒂芬',
                    phone: '15322123454',
                    position: '前端工程师'
                },
                {
                    name: '爱的发的是全额付是打发第三方企鹅阿斯顿发斯蒂芬',
                    phone: '15322123457',
                    position: '前端设计师'
                }
            ],
            address: [
                {
                    value: '阿迪萨斯的法定大发大地方啊实打实大发打发打发按时大大的撒旦法阿斯达实打实地方',
                    isHeadAddr: 1
                },
                {
                    value: '阿迪萨斯的法定大发大地方啊实打实大发打发打发按时大大的撒旦法阿斯达实打实地方',
                    isHeadAddr: 0
                },
                {
                    value: '阿迪萨斯的法定大发大地方啊实打实大发打发打发按时大大的撒旦法阿斯达实打实地方',
                    isHeadAddr: 0
                }
            ],
            // 初步上线人数
            teacherNum: Math.ceil(Math.random() * 10000),
            // 老师总数
            teacherTotal: Math.ceil(Math.random() * 10000),
            foundTime: new Date().getTime(),
            //机构线索分校的数量,后台返回对应的范围字符串
            schBranchNumberRange: '2-4家',
            //机构线索学生的数量，后台返回对应的范围字符串
            studentNumerRange: '300-500',
            //机构线索课程的价格区间，后台返回对应的范围字符串
            coursePriceRange: '1000-5000',
            registerMail: 'hanrui@baijiahulian.com',
            subjects: '阿达的说法爱的是发的噶去企鹅而',
            category: 'K12',
            specialLabel: '区二期二二我二哥我让他和问题的风格',
            status: status,
            operator: '请问亲耳企鹅企鹅去而请问企鹅企鹅我让请问亲耳全文',
            openRoleUid: word ? 'openRoleUid11' : "openRoleUid10",
            introduce: '请问亲耳企鹅企鹅去而请问企鹅企鹅我让请问亲耳全文',
            posNumber: '123456789',
            identiPictures: [
                {
                    title: '工作室-身份认证',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '企业-营业执照',
                    url: 'http://img.gsxservice.com/50565_iyway7b9.jpg'
                },
                {
                    title: '学校-组织机构许可证',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '学校-办学许可证',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                }
            ],
            pictures:[
                {
                    title: '疯狂英语带班英语早读',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '疯狂英语带班英语早读1',
                    url: 'http://img.gsxservice.com/50565_iyway7b9.jpg'
                },
                {
                    title: '疯狂英语带班英语早读2',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '疯狂英语带班英语早读3',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '疯狂英语带班英语早读2',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '疯狂英语带班英语早读3',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '疯狂英语带班英语早读2',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                },
                {
                    title: '疯狂英语带班英语早读3',
                    url: 'http://img.gsxservice.com/180171_esiw14lz.jpeg'
                }
            ]
        }
    };

    return data;
};
