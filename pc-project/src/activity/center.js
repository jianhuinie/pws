/**
 * @file 活动页面-公共js
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    exports.init = function() {


        var subject = {
            math: [
                {
                    name: '赵卫民',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e26727da5.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/zhaowei',
                    intro: '帮助学生找到学习的乐趣和方法',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371533288&course_id=36608&lesson_way=online',
                    teacher_id: '371533288',
                    course_id: '36608'
                },
                {
                    name: '王国胜',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e266ef8bc.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/wangguosheng',
                    intro: '中考跟谁学，数学听我的',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=329587768&course_id=35982&lesson_way=online',
                    teacher_id: '329587768',
                    course_id: '35982'
                },
                {
                    name: '范伟',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e266cc1fd.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/shuxue',
                    intro: '抛弃题海战术，重塑经典题型；时间短，提分快！',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371102968&course_id=30474&lesson_way=online',
                    teacher_id: '371102968',
                    course_id: '30474'
                },
                {
                    name: '曹炜',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e265d816a.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/gaofenlaocao',
                    intro: '教会你轻松学习的秘诀，让学习不再枯燥',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371509928&course_id=25130&lesson_way=online',
                    teacher_id: '371509928',
                    course_id: '25130'
                },
                {
                    name: '陈绪光',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e266285e2.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/chenxuguang',
                    intro: '点睛、提分找我就对了',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=370959768&course_id=37721&lesson_way=online',
                    teacher_id: '370959768',
                    course_id: '37721'
                }
            ],
            english: [
                {
                    name: '潘小静',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e6c5cb477.png',
                    teacher_url: 'http://www.genshuixue.com/t/panxiaojing',
                    intro: '就是让你战胜英语，高分不再梦不可及',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371673938&course_id=20590&lesson_way=online',
                    teacher_id: '371673938',
                    course_id: '20590'
                },
                {
                    name: '牛嘉',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e6f0e9c20.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/niujia',
                    intro: '善于总结， 温故而知新',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=916864588&course_id=36395&lesson_way=online',
                    teacher_id: '916864588',
                    course_id: '36395'
                },
                {
                    name: '孟猛',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e70530a65.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/496767288',
                    intro: '学英语找孟猛老师，教学方法独特，迅速提高成绩',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=496767288&course_id=36581&lesson_way=online',
                    teacher_id: '496767288',
                    course_id: '36581'
                },
                {
                    name: '胡灿奎',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e70c6b1b7.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/resuuu1127',
                    intro: '五大核心技术，缔造英语奇迹',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371123368&course_id=19782&lesson_way=online',
                    teacher_id: '371123368',
                    course_id: '19782'
                }
            ],
            physics: [
                {
                    name: '孟树森',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0eb7132284.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/mengshusen',
                    intro: '百分之百能提分或名次给学生开锁钥匙',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=370876178&course_id=36367&lesson_way=online',
                    teacher_id: '370876178',
                    course_id: '36367'
                },
                {
                    name: '杨应锋',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0eb7acb256.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/dianfengwuliyang',
                    intro: '掌握方法，快速提分不是梦',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=329079288&course_id=37672&lesson_way=online',
                    teacher_id: '329079288',
                    course_id: '37672'
                },
                {
                    name: '李世有',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0eb867540f.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/resuuu1379',
                    intro: '用心做教育，对学生负责，对家长负责！',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371123288&course_id=4888&lesson_way=online',
                    teacher_id: '371123288',
                    course_id: '4888'
                }
            ],
            englishH: [
                {
                    name: '董立君',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0eb21e4407.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/teacherdong20149988',
                    intro: '精通考点学会解题技巧，才能走捷径得高分',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371532898&course_id=31152&lesson_way=online',
                    teacher_id: '371532898',
                    course_id: '31152'
                },
                {
                    name: '栾冬静',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0eb2b8df05.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/yingyuzixing',
                    intro: '严是爱，松是害！为你提供最捷径、最有效的路径！',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371697128&course_id=36546&lesson_way=online',
                    teacher_id: '371697128',
                    course_id: '36546'
                }
            ],
            mathH: [
                {
                    name: '曹炜',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e265d816a.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/gaofenlaocao',
                    intro: '教会你轻松学习的秘诀，让学习不再枯燥',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371509928&course_id=25130&lesson_way=online',
                    teacher_id: '371509928',
                    course_id: '25130'
                },
                {
                    name: '田仁好',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e2ff42bc6.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/resuuu979',
                    intro: '认真负责，讲解透彻，查缺补漏提分快！',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371534488&course_id=1726&lesson_way=online',
                    teacher_id: '371534488',
                    course_id: '1726'
                },
                {
                    name: '谢家彪',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e2ffb3c1d.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/tejishuxue',
                    intro: '高效，自信，快乐的学数学',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=329812658&course_id=36358&lesson_way=online',
                    teacher_id: '329812658',
                    course_id: '36358'
                }
            ],
            chemistryH: [
                {
                    name: '于永刚',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e37554bfd.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/resuuu1388',
                    intro: '化学知识是树状的，让我们一起建立树根、树干、树叶',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371100418&course_id=1040&lesson_way=online',
                    teacher_id: '371100418',
                    course_id: '1040'
                },
                {
                    name: '王立国',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e3750fb26.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/resuuu121',
                    intro: '我是化王，是与你交心的朋友，是与你走进化学的益友',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=371694098&course_id=36550&lesson_way=online',
                    teacher_id: '371694098',
                    course_id: '36550'
                },
                {
                    name: '王一杰',
                    picture: 'http://img.gsxservice.com/0cms/d/file/content/2015/01/54b0e3753d46b.jpg',
                    teacher_url: 'http://www.genshuixue.com/t/wangyijie',
                    intro: '给你不一样的化学体验，让学习更高效更快乐',
                    buy_link: 'http://www.genshuixue.com/pay/course?teacher_number=370854808&course_id=4061&lesson_way=online',
                    teacher_id: '370854808',
                    course_id: '4061'
                }

            ]
        };


//        var html = '';

        for (var j in subject) {


        var html = '';
            for (var i in subject[j]) {

                var clas_sname = '';
                if (parseInt(i) === 0 || parseInt(i) / 5 === 0) {
                    clas_sname = "the-first";
                }

                html += '<li class=' + clas_sname + '>';
                html += ' <a target="_blank" href=" ';
                html += subject[j][i].teacher_url;
                html += '">';
                html += ' <img width="150" height="150" src="';
                html += subject[j][i].picture;
                html += '">';
                html += ' <div class="badge"></div>';
                html += ' </a>';
                html += ' <div class="floor-teacher-baseinfo">';
                html += ' <em>';
                html += subject[j][i].name;
                html += '</em>';
                html += ' <span class="floor-teacher-age">';
                html += subject[j][i].intro;
                html += '</span>';
                html += ' <a href=" ';
                html += subject[j][i].buy_link;
                html += '" class="floor-teacher-subject">马上报名</a>';
                html += '</div>';
                html += '</li>';
            }
            console.log(html);
            if (j === 'math') {
                $('#item1 ul').append(html);
            }
            if (j === 'english') {
                $('#item2 ul').append(html);
            }
            if (j === 'physics') {
                $('#item3 ul').append(html);
            }
            if (j === 'englishH') {
                $('#item4 ul').append(html);
            }
            if (j === 'mathH') {
                $('#item5 ul').append(html);
            }
            if (j === 'chemistryH') {
                $('#item6 ul').append(html);
            }

        }


    };


});