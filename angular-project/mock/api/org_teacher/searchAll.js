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
        code: 0,
        pageDto: null,
        error: null
    };

    var status = leadsStatus[Math.floor(Math.random() * leadsStatus.length)];
    var orgType = orgTypes[Math.floor(Math.random() * orgTypes.length)];
    // var orgType = 1;
    var word = Math.random() > 0.5;

    data.data = [];
    for(var i = 0; i < 10; i++) {
        data.data[i] = {
            teacherUid: Math.floor(Math.random()*100),
            name: '老师' + (i+1)
        };
    }

    return data;
};
