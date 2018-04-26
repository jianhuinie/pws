<?php

require ("../bootstrap.php");

render(
	"teacher/newDetail",
	array(
		"tpl_data"         => array(
			"one_on_one_teacher_mobile" => 14444444,
			"trial_course"    => array(// 试听课
				'status'         => -1, // -1隐藏试听课 0:未预约／未登陆用户  1:预约还没排课  2:已经排课 3:已经结束 4:预约后但还没支付 5老师自己查看自己的个人主页 6已取消
				'data'           => array(
					'user_id'       => 123, // 老师id
					'user_number'   => 123232323, // 老师number
					'number'        => 1323232323, // 课程number
					'length'        => 30, // 老师设置试听时长
					'lesson_way'    => 2, // 试听方式 2:线上  4:线下
					'price_online'  => '0.90', // 线上价格
					'price_offline' => '0.01', // 线下价格
					'switch_flag'   => 1, // 是否开启开关   0:关  1:开
					'create_time'   => '2015-08-10 12:12:12', // 试听课创建时间
					'realname'      => '张三', // 老师姓名
					'display_name'  => '张三', // 老师姓名
					'mobile'        => '13287678765', // 老师手机号
					'note'          => 'ssdsdfdfd', // 学生留言
					'trial_time'    => '2015-10-10 12:12:12至2015-10-10 12:12:17', // 组合好的时间
					'start_time'    => '2015-08-26 1:12:12', // 开始时间
					'end_time'      => '2015-08-26 10:12:18', // 结束时间
					'address'       => 'lsjdfdfdfdf', // 试听地址
					'diff_time'     => '30', // 开始时间和结束时间相差的分钟数
					'purchase_id'   => '438625473296', // 预约试听课id
				),
			),
			"crumb"  => array(
				'host'  => 'http://www.genshuixue.com/bj/',
				'city'  => array(
					'id'   => '12',
					'name' => '北京',
				),
				'list' => array(
					array(
						'id'          => '123',
						'name'        => '艺术',
						'remark_name' => '艺术2',
					),
					array(
						'id'   => '323',
						'name' => '舞蹈',
					),
					array(
						'id'   => '12',
						'name' => '我是三级的',
					)
				),
				'related' => array(
					array(
						"id"        => "170",
						"name"      => "初二",
						"level"     => "3",
						"parent_id" => "167",
					),
					array(
						"id"        => "171",
						"name"      => "初三",
						"level"     => "3",
						"parent_id" => "167",
					),
					array(
						"id"        => "169",
						"name"      => "初一",
						"level"     => "3",
						"parent_id" => "167",
					),
					array(
						"id"        => "168",
						"name"      => "全部",
						"level"     => "3",
						"parent_id" => "167",
					)
				)
			),
			"article"        => array(
				'pager'         => array(
					'has_more'     => true,
					'next_page'    => 2,
					'current_page' => 1,
					'total'        => 11,
				),
				"items" => array(
					array(
						'item_id'    => 1998101940521396,
						'item_type'  => 1,
						'title'      => "第五篇文章：江西电厂倒塌事故 施工方工作人员：怀疑混凝土强度",
						'summary'    => "hdiowadowhaiodjioajiofjeiaofjioahjfiohoahfwioawjiofheuhfuhuihfuhfiojfiohoufhqouhfueohqfuohqofheuoqhfouehknzfjchfeoufho",
						'publish_at' => "2016-11-24 17:50:19",
						'cover'      => "null",
						'detail_url' => "http://dev-web.xxtoutiao.com/gsx/feed/get?itemId=1998101940521396&itemType=1&gsxUserId=3334426",
						'upvotes'    => 1,
					),
					array(
						"item_id"    => 2323,
						"title"      => "老师主页文章标题001",
						"summary"    => "The state council to send package!114 don‘t have to take an examination of the professional qualifi",
						"publish_at" => "2013-12-03 07:10",
						"cover"      => "http://img.gsxservice.com/2401208_8bgi3xko.jpeg",
						"upvotes"    => 100,
						"detail_url" => "http://www.baidu.com",
					),
					array(
						"item_id"    => 2323234234,
						"title"      => "老师主页文章标题001",
						"summary"    => "老师主页文章内容001",
						"publish_at" => "2013-12-03 07:10",
						"upvotes"    => 100,
						"detail_url" => "http://www.baidu.com",
					),
					array(
						"item_id"    => 2323234234,
						"title"      => "老师主页文章标题001",
						"summary"    => "老师主页文章内容001",
						"publish_at" => "2013-12-03 07:10",
						"upvotes"    => 100,
						"detail_url" => "http://www.baidu.com",
					)
				),
			),
			"profile"               => array(
				"is_one_on_one_teacher" => true, //是否是一对一老师
				"name"                 => "徐梅山",
				"name_cut"             => "徐梅山",
				"country"              => "美国",
				"vip_level"            => 3, // 0非会员 1普通会员 2高级会员 3超级会员
				"sex"                  => "1",
				"im_online_status"     => 1,
				"avatar"               => "http://img.gsxservice.com/170558_6mk3qxqs.jpeg",
				"user_id"              => "13120",
				"user_number"          => "68573881811",
				"domain"               => "james",
				"user_home"            => "http://genshuixue.com/874171288",
				"slogan"               => "周易预测、环境风水、起名、择日。",
				"like_count"           => "15",
				"view_count"           => 886,
				"comment_count"        => 11,
				"invite_comment_count" => 1,
				"area"                 => "北京-朝阳区",
				"address"              => "华腾北搪商务大厦",
				"score"                => "0.0",
				"student_count"        => "11111",
				"teach_time"           => 36,
				"favor_percent"        => "1.00",
				"certification"        => array(
					//"专业资质", "学历认证", "教师证", "身份证"
					"profession", "student", "teacher", "idcard",

				),
				"organization" => array(// 机构老师专属
					// "id" => 0,
					// "name" => "天下网校",
					// "number" => "123123",
					// "url" => "http://img.gsxservice.com/212290_zon87dal.jpg",
					// "m_url" => "/i/tianxiawangxiao",
					// "description" => "致力于为各大教育平台提供优质体验的课程产品，是各大教育平台的优质资源商。以求知识分享、技能交互。",
					// "qualifications" => "公司",
					// "avatar" => 'http://img.gsxservice.com/212290_zon87dal.jpg',
					// "is_white_user" => true, // 该机构老师是否是白名单用户
				),
				"offline_poi" => array(
					"lng"        => "116.340489",
					"lat"        => "39.98211",
				),
				"has_activity_auth" => true,
				"audio"             => "http://test-file.gsxservice.com/9742_j4bytr8h.mp3",
				"audio_length"      => "180",
				//"audio" => "",
				//"audio_length" => "",
				"medal" => array(
					array(
						"type"         => "21",
						"desc"         => "金质跟谁学名师最具人气奖",
						"logo"         => "http://img.gsxservice.com/0medal/5.png",
						"phase"        => 3,
						"toplist_type" => "22",
					),
					array(
						"type"         => "11",
						"desc"         => "金质跟谁学名师最有价值奖",
						"logo"         => "http://img.gsxservice.com/0medal/5.png",
						"phase"        => 3,
						"toplist_type" => "22",
					)
				),
				"can_order"       => true,
				"total_courses"   => 4555,
				"online_count"    => "45",
				"offline_count"   => "25",
				"video_count"     => 4,
				"usabletime_desc" => null,
				"is_recommend"    => true,
				"flag_course"     => 1, //该老师是否有课程
				"org_type"        => 4, //如果为4的话，就是3810项目的老师
				"org_address"     => "机构地址3810", //机构地址
			),
			"coupons" => array(
				array(
					'serial_num'       => '123',
					'balance'          => 1999,
					'cond_threshold'   => 0, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
					'status'           => 1, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
					'cond_course_type' => 2// 0不限 2班课 3视频课
				),
				array(
					'serial_num'       => '123',
					'balance'          => 10,
					'cond_threshold'   => 100, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
					'status'           => 1, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
					'cond_course_type' => 3// 0不限 2班课 3视频课
				),
				array(
					'serial_num'       => '123',
					'balance'          => 10,
					'cond_threshold'   => 1000, // 满减阈值(0为无限制，100表示订单大于100元可以使用)
					'status'           => 5, // 优惠券状态（0未生效 1已生效 2已失效 3冻结 4下线 5已领完）
					'cond_course_type' => 0// 0不限 2班课 3视频课
				)
			),
			"teach" => array(
                /*
				"subject" => array(
    				array(
        				"name" => "星座-居家风水-星座-居家风水星座-居家风水",
        				"path" => array(
            				array(
                				"id" => "878",
                				"name" => "兴趣",
                				"level" => "1",
                				"subnodes" => "12",
                				"display_order" => "509",
                				"hidden" => "0",
                				"parent_id" => "0",
                				"remark_name" => "兴趣",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => "中小学",
                				"image" => null,
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "889",
                				"name" => "星座",
                				"level" => "2",
                				"subnodes" => "1",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "878",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "890",
                				"name" => "星座",
                				"level" => "3",
                				"subnodes" => "0",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "889",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87992_lne2opdt.jpeg",
                				"teacher_count" => "1"
            				)
        				),
        				"id" => "36640",
        				"price" => array(
            				"teacher" => "121",
            				"student" => "123",
            				"discuss" => null,
            				"online" => "1000"
        				)
    				),
    				array(
    				    "name" => "摸金校尉搬山卸岭",
    				    "path" => array(
            				array(
                				"id" => "878",
                				"name" => "兴趣",
                				"level" => "1",
                				"subnodes" => "12",
                				"display_order" => "509",
                				"hidden" => "0",
                				"parent_id" => "0",
                				"remark_name" => "兴趣",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => "中小学",
                				"image" => null,
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "889",
                				"name" => "星座",
                				"level" => "2",
                				"subnodes" => "1",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "878",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "890",
                				"name" => "星座",
                				"level" => "3",
                				"subnodes" => "0",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "889",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87992_lne2opdt.jpeg",
                				"teacher_count" => "1"
            				)
        				),
        				"id" => "36640",
        				"price" => array(
            				"teacher" => null,
            				"student" => null,
            				"discuss" => null,
            				"online" => "1000"
        				)
    				),
    				array(
        				"name" => "奇门遁甲-风水秘术",
        				"path" => array(
            				array(
                				"id" => "878",
                				"name" => "兴趣",
                				"level" => "1",
                				"subnodes" => "12",
                				"display_order" => "509",
                				"hidden" => "0",
                				"parent_id" => "0",
                				"remark_name" => "兴趣",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => "中小学",
                				"image" => null,
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "889",
                				"name" => "星座",
                				"level" => "2",
                				"subnodes" => "1",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "878",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "890",
                				"name" => "星座",
                				"level" => "3",
                				"subnodes" => "0",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "889",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87992_lne2opdt.jpeg",
                				"teacher_count" => "1"
            				)
        				),
        				"id" => "36640",
        				"price" => array(
            				"teacher" => "2370",
            				"student" => null,
            				"discuss" => null,
            				"online" => "870"
        				)
    				),
    				array(
        				"name" => "星座-居家风水",
        				"path" => array(
            				array(
                				"id" => "878",
                				"name" => "兴趣",
                				"level" => "1",
                				"subnodes" => "12",
                				"display_order" => "509",
                				"hidden" => "0",
                				"parent_id" => "0",
                				"remark_name" => "兴趣",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => "中小学",
                				"image" => null,
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "889",
                				"name" => "星座",
                				"level" => "2",
                				"subnodes" => "1",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "878",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87536_eynpcp95.png",
                				"teacher_count" => "1"
            				),
            				array(
                				"id" => "890",
                				"name" => "星座",
                				"level" => "3",
                				"subnodes" => "0",
                				"display_order" => "1",
                				"hidden" => "0",
                				"parent_id" => "889",
                				"remark_name" => "星座",
                				"subject_type" => "0",
                				"verify_status" => "1",
                				"tag" => null,
                				"image" => "http://img.gsxservice.com/87992_lne2opdt.jpeg",
                				"teacher_count" => "1"
            				)
        				),
        				"id" => "36640",
        				"price" => array(
            				"teacher" => "1",
            				"student" => "1",
            				"discuss" => "1",
            				"online" => "1"
        				)
    				),
				),
				"school_age" => "30",
				"approach" => array(
				    "2" => "online"
				),
				"access_area" => array(),
				"skill" => array(
    				"深入浅出",
    				"简单易懂",
    				"化繁为简",
    				"结合实际",
    				"实例分析"
				),
				"min_price" => "1000",
				"max_price" => "1231",
                */
				"subject_count" => 4,
				"subject" => array(
					array(
						"name"       => "大学-英语-口语-自定义",
                        "course_type" => 13, // 1一对一 13优选一对一
						"remark"     => "授课思路清晰\n，帮助学生深入剖析出题规律，\n总结做题技巧，\n养成良好\n的学习习\n惯，从根本声的学生\n能力",
						"id"         => "12",
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"price"      => array(
							"teacher"   => 1000,
							"student"   => 1000000,
							"discuss"   => 100000,
							"online"    => 10000,
						),
						"number"    => 398872460847,
						"tag_fenqi" => 1,
						"path"      => array(
							array(
								"id"            => "783",
								"name"          => "出国留学1级",
								"level"         => "1",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
							array(
								"id"            => "783",
								"name"          => "出国留学2级",
								"level"         => "2",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
							array(
								"id"            => "783",
								"name"          => "出国留学3级",
								"level"         => "1",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
						)
					),
					array(
						"name"       => "大学语文",
						"id"         => "223",
                        "course_type" => 1, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"price"      => array(
							"teacher"   => 123,
							"student"   => 10,
							"discuss"   => '',
							"online"    => 2320,
						),
						"number"    => 398872460847,
						"tag_fenqi" => 1,
						"path"      => array(
							array(
								"id"            => "634",
								"name"          => "资格考试",
								"level"         => "1",
								"subnodes"      => "6",
								"display_order" => "492",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "资格考试",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
							array(
								"id"            => "783",
								"name"          => "出国留学2级",
								"level"         => "2",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
							array(
								"id"            => "783",
								"name"          => "出国留学3级",
								"level"         => "1",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							)
						)
					),
					array(
						"name"       => "二十五史",
						"id"         => "333",
                        "course_type" => 13, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"price"      => array(
							"teacher"   => '',
							"student"   => 2310,
							"discuss"   => 124,
							"online"    => 230,
						),
						"number" => 398872460847,
						"path"   => array(
							array(
								"id"            => "783",
								"name"          => "出国留学",
								"level"         => "1",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
							array(
								"id"            => "783",
								"name"          => "二十五史2级",
								"level"         => "2",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							),
							array(
								"id"            => "783",
								"name"          => "二十五史3级",
								"level"         => "1",
								"subnodes"      => "5",
								"display_order" => "508",
								"hidden"        => "0",
								"parent_id"     => "0",
								"remark_name"   => "出国留学",
								"subject_type"  => "0",
								"verify_status" => "1",
								"tag"           => null,
								"image"         => null,
								"teacher_count" => "1",
							)
						)
					),
					array(
						"name"       => "初中地理",
						"id"         => "23324",
                        "course_type" => 13, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"number"     => 398872460847,
						"price"      => array(
							"teacher"   => '',
							"student"   => 110,
							"discuss"   => '',
							"online"    => 2220,
						)
					),
					array(
						"name"       => "IT培训-计算机证书-C语言",
						"id"         => "23425",
                        "course_type" => 13, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"number"     => 398872460847,
						"price"      => array(
							"teacher"   => '',
							"student"   => 10,
							"discuss"   => '',
							"online"    => 20,
						)
					),
					array(
						"name"       => "高等数学",
						"id"         => "61223",
                        "course_type" => 13, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"number"     => 398872460847,
						"price"      => array(
							"teacher"   => 123,
							"student"   => 10,
							"discuss"   => 234,
							"online"    => 20,
						)
					),
					array(
						"name"       => "大学物理",
						"id"         => "12337",
                        "course_type" => 13, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"number"     => 398872460847,
						"price"      => array(
							"teacher"   => 12,
							"student"   => 120,
							"discuss"   => 1123,
							"online"    => 220,
						)
					),
					array(
						"name"       => "IT培训-计算机证书-其实我不懂",
						"id"         => "823",
                        "course_type" => 1, // 1一对一 13优选一对一
						"detail_url" => "http://test.genshuixue.com/teacher/one2oneCourseDetail/443216629977",
						"number"     => 398872460847,
						"price"      => array(
							"teacher"   => '',
							"student"   => 10,
							"discuss"   => '',
							"online"    => 20,
						)
					)
				),
				"min_price"  => 135,
				"max_price"  => 1231,
				"school_age" => "-1",
				"approach"   => array(
					'online', 'teacher', 'student', 'discuss',
				),
				"skill" => array(
					"英语口语asdasd sad ",
					"英语口语安师大撒",
					"英语口语",
					"英大时代",
					"英语口语",
				),
				"access_area" => array(
					"全国",
				)
			),
			"experience" => array(
				array(
					"start_date"      => "2005-05-01",
					"end_date"        => "0000-00-00",
					"content"         => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。中国传统文化传播有限公司董事长。中国姬派奇门遁甲正宗传人，中国易经研究会会长、学术委员会主任。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				),
				array(
					"start_date"      => "2014年06月",
					"end_date"        => "2014年08月",
					"content"         => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。中国传统文化传播有限公司董事长。中国姬派奇门遁甲正宗传人，中国易经研究会会长、学术委员会主任。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				),
				array(
					"start_date"      => "2014年06月",
					"end_date"        => "2014年08月",
					"content"         => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。中国传统文化传播有限公司董事长。中国姬派奇门遁甲正宗传人，中国易经研究会会长、学术委员会主任。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				)
			),
			"success" => array(
				array(
					"date"            => "2005-05-01",
					"title"           => "乾坤风水，造福四方，桃李天下，功德无边",
					"content"         => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				),
				array(
					"date"            => "2005-05-01",
					"title"           => "乾坤风水，造福四方，桃李天下，功德无边",
					"content"         => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				),
				array(
					"date"            => "2005-05-01",
					"title"           => "乾坤风水，造福四方，桃李天下，功德无边",
					"content"         => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				),
				array(
					"date"            => "2005-05-01",
					"title"           => "乾坤风水，造福四方，桃李天下，功德无边",
					"content"         => "1、国内几十位影视娱乐界明星常年易经顾问；数十家大中型企业风水总顾问；上百名军政界神秘人士个人易经顾问；为1200多家企业做过整体风水布局和设计；为无数个家庭布局催贵催财催丁催文昌风水；学生弟子遍布世界各地。\n2、曾多次到泰国、新加坡、美国、加拿大、新西兰、台湾、马来西亚、香港、澳门、韩国和国内大多数城市讲学和考察，开办周易风水讲座，听课者累计过万人。受到热烈欢迎和高度评价。",
					"content_cut"     => "中国易经研究会会长，著名易学理论与实践专家，著名姓名学专家，著名风水专家，乾坤风水创始人，以风水绝学名扬东南亚。学术委员会主任。",
					"content_new_cut" => "中国易经研究会会长",
				)
			),
			"other"        => array(
				"content"     => "james\nasldkfjaldj\nalsdkfalj",
				"content_cut" => "<p></p><p><img src=\"http://img.gsxservice.com/201398_e5t7tiyg.jpeg@740w.jpeg\" title=\"\" alt=\"T2rJGbX1laXXXXXXXX_!!1891576490.jpg\" /></p><p><img src=\"http://img.gsxservice.com/201403_a3oqpfwg.jpeg@740w.jpeg\" title=\"\" alt=\"徐梅山简介.jpg\" /></p><p><img src=\"http://img.gsxservice.com/201497_ickn6l5f.jpeg@740w.jpeg\" title=\"\" alt=\"rBEhU1MxFTEIAAAAAASOT_nmjN0AAKrZwIx4c8ABI5n837.jpg\" /></p>",
			),
			"question"           => array(),
			"audit"              => null,
			"video_course_count" => 4,
			"video_course"       => array(
				array(
					'number'       => '15021142724',
					'portrait'     => 'https://imgs.genshuixue.com/37221562_5stdpa6u.jpeg',
					'title'        => '机构老师-视频课1',
					'user_name'    => 'james',
					'introduce'    => '机构老师机构老师机构老师机构老师',
					'price'        => 500,
					'payers_count' => 35,
					"tag_fenqi"    => 1,
					"fenqi"        => array(
						"tag_name"    => "分期",
						"tiexi_info" => "",
						"desc"        => "可享3期分期付学费",
					),
					'profit'          => 0,
					'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
					'label_ids'       => array(
						'啥来的快放假',
						'alsdkjf',
					),
					'course_items_count' => 34, //课节数
					'language'           => 1,
					'subjects'           => array(
						'体育',
						'武术',
						'跆拳道',
					), // 科目
					'user_id'        => '874171288',
					'name'           => '徐梅山',
					'section_id'     => '1231231',
					"limit_discount" => array(
						"0"             => array(
							"start_time"   => "2016-04-15 00:00:00",
							"end_time"     => "2015-06-16 24:00:00",
							"tag_name"     => "616大促",
							"info"         => "TEST 616",
							"id"           => "5",
							"price"        => "200.00", //现价
							"pre_price"    => "500.00"//原价
						)
					),
				),
				array(
					'number'       => '15021142724',
					'portrait'     => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
					'title'        => '机构老师-视频课2',
					'user_name'    => 'james',
					'introduce'    => '机构老师机构老师机构老师机构老师',
					'price'        => 500,
					'payers_count' => 10,
					"tag_fenqi"    => 1,
					"fenqi"        => array(
						"tag_name"    => "分期",
						"tiexi_info" => "",
						"desc"        => "可享3期分期付学费",
					),
					'profit'          => 0,
					'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
					'label_ids'       => array(
						'啥来的快放假',
						'alsdkjf',
					),
					'course_items_count' => 10, //课节数
					'language'           => 5,
					'subjects'           => array(
						'体育',
						'武术',
						'跆拳道',
					), // 科目
					'user_id'        => '874171288',
					'name'           => '徐梅山',
					'section_id'     => '1231231',
					"limit_discount" => array(
						"0"             => array(
							"start_time"   => "2016-04-14 00:00:00",
							"end_time"     => "2016-04-15 00:00:00",
							"tag_name"     => "616大促",
							"info"         => "TEST 616",
							"id"           => "5",
							"price"        => "200.00", //现价
							"pre_price"    => "500.00"//原价
						)
					)
				),
				array(
					'number'          => '15021142724',
					'portrait'        => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
					'title'           => '机构老师-视频课3',
					'user_name'       => 'james',
					'introduce'       => '机构老师机构老师机构老师机构老师',
					'price'           => 200,
					'payers_count'    => 24,
					'profit'          => 0,
					'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
					'label_ids'       => array(
						'啥来的快放假',
						'alsdkjf',
					),
					'course_items_count' => 13, //课节数
					'language'           => 5,
					'subjects'           => array(
						'体育',
						'武术',
						'跆拳道',
					), // 科目
					'user_id'    => '874171288',
					'name'       => '徐梅山',
					'section_id' => '1231231'
				),
			),
			"history" => array(
				"count"  => "12",
				"course" => array(
					array(
						'number'          => '15021142724',
						'course_type'     => 3,
						'portrait'        => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
						'title'           => '机构老师-视频课',
						'user_name'       => 'james',
						'introduce'       => '机构老师机构老师机构老师机构老师',
						'price'           => 0,
						'payers_count'    => 35,
						'profit'          => 0,
						'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
						'label_ids'       => array(
							'啥来的快放假',
							'alsdkjf',
						),
						'course_items_count' => 34, //课节数
						'language'           => 1,
						'subjects'           => array(
							'体育',
							'武术',
							'跆拳道',
						), // 科目
						'user_id'    => '874171288',
						'name'       => '徐梅山',
						'section_id' => '1231231'
					),
					array(
						'number'          => '15021142724',
						'portrait'        => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
						'title'           => '机构老师-视频课',
						'course_type'     => 3,
						'user_name'       => 'james',
						'introduce'       => '机构老师机构老师机构老师机构老师',
						'price'           => 200,
						'payers_count'    => 10,
						'profit'          => 0,
						'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
						'label_ids'       => array(
							'啥来的快放假',
							'alsdkjf',
						),
						'course_items_count' => 10, //课节数
						'language'           => 5,
						'subjects'           => array(
							'体育',
							'武术',
							'跆拳道',
						), // 科目
						'user_id'    => '874171288',
						'name'       => '徐梅山',
						'section_id' => '1231231'
					),
					array(
						'number'          => '15021142724',
						'portrait'        => 'http://test-img.gsxservice.com/180937_24pwd8ob.jpeg',
						'title'           => '机构老师-视频课',
						'course_type'     => 3,
						'user_name'       => 'james',
						'introduce'       => '机构老师机构老师机构老师机构老师',
						'price'           => 200,
						'payers_count'    => 24,
						'profit'          => 0,
						'self_share_info' => "分享该课程获得的课酬，暂不收取平台服务费",
						'label_ids'       => array(
							'啥来的快放假',
							'alsdkjf',
						),
						'course_items_count' => 13, //课节数
						'language'           => 5,
						'subjects'           => array(
							'体育',
							'武术',
							'跆拳道',
						), // 科目
						'user_id'    => '874171288',
						'name'       => '徐梅山',
						'section_id' => '1231231'
					)
				)
			),
			"is_favored"          => false,
			"is_preview"          => false,
			"has_activity_auth"   => true,
			"online_course_count" => 4,
			"online_course"       => array(
				array(
					"limit_discount" => array(
						// "0" => array(
						//     "start_time" => "2016-04-15 00:00:00",
						//     "end_time" => "2015-06-16 24:00:00",
						//     "tag_name" => "616大促",
						//     "info" => "TEST 616",
						//     "id" => "5",
						//     "price" => "200.00", //现价
						//     "pre_price" => "500.00"//原价
						// )
					),
					'original_price' => 1233,
					"number"         => "150107543132",
					"subject_id"     => "1106",
					"name"           => "大师徐梅山为您讲解风水奥秘 周易精华",
					"lesson_way"     => "2",
					"create_time"    => 1420601160,
					"begin_time"     => 1421236800,
					"end_time"       => 1422450000,
					"course_len"     => 12000,
					"tag_fenqi"      => 1,
					"fenqi"          => array(
						"tag_name"      => "分期",
						"tiexi_info"   => "",
						"desc"          => "可享3期分期付学费",
					),
					"price"      => "0",
					"class_type" => 1,
					"photos"     => array(
						array(
							"id"          => "1419",
							"title"       => "授课中",
							"url"         => "http://img.gsxservice.com/65776_wjoqso17.jpeg",
							"width"       => "1270",
							"height"      => "696",
							"create_time" => 1420601160,
							"storage_id"  => "51251",
						)
					),
					"max_student"   => "500",
					"address_area"  => array(
						"full_address" => "",
					),
					"address"     => "",
					"location"    => "",
					"offline_poi" => array(
						"lng"        => "",
						"lat"        => "",
					),
					"status"         => "2",
					"student_desc"   => "风水爱好者，新置物业者，易经学爱好者，居家布置",
					"total_pay"      => 0,
					"in_pay"         => 0,
					"succ_pay"       => 0,
					"display_status" => 2,
					"verify_status"  => "4",
					"arrangement"    => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"
				),
				array(
					"limit_discount" => array(
						"0"             => array(
							"start_time"   => "2015-06-26 00:00:00",
							"end_time"     => "2015-07-16 24:00:00",
							"tag_name"     => "616大促",
							"info"         => "TEST 616",
							"id"           => "5",
							"price"        => "200.00", //现价
							"pre_price"    => "500.00"//原价
						)
					),
					"number"      => "141205542984",
					"subject_id"  => "1106",
					"name"        => "大师徐梅山为您讲解风水奥秘 周易精华",
					"lesson_way"  => "2",
					"create_time" => 1417747819,
					"begin_time"  => 1418212800,
					"end_time"    => 1420030800,
					"course_len"  => "14400",
					"price"       => "1",
					"class_type"  => 1,
					"photos"      => array(
						array(
							"id"          => "246",
							"title"       => "授课中",
							"url"         => "http://img.gsxservice.com/65776_wjoqso17.jpeg",
							"width"       => "1270",
							"height"      => "696",
							"create_time" => 1417748261,
							"storage_id"  => "51251",
						)
					),
					"max_student"   => "500",
					"address_area"  => array(
						"full_address" => "",
					),
					"address"     => "",
					"location"    => "",
					"offline_poi" => array(
						"lng"        => "",
						"lat"        => "",
					),
					"status"         => "2",
					"student_desc"   => "风水爱好者，新置物业者，易经学爱好者，居家布置",
					"total_pay"      => 8,
					"in_pay"         => 0,
					"succ_pay"       => 8,
					"display_status" => 2,
					"verify_status"  => "3",
					"arrangement"    => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"
				),
				array(
					"id"                  => "189190",
					"number"              => "160412878321",
					"user_id"             => "477659",
					"organization_number" => null,
					"subject_id"          => "344",
					"lesson_way"          => "2",
					"class_type"          => "1",
					"price"               => "50.00",
					"original_price"      => "200.00",
					"max_student"         => "500",
					"min_student"         => "1",
					"cover"               => "345605",
					"template_m"          => "default",
					"template_pc"         => "default",
					"name"                => "高考数学压轴题精讲之填空题",
					"information"         => "高考数学压轴题精讲之填空题，适合中等或偏上高中生",
					"introduction"        => "<p>高考数学压轴题精讲之填空题，适合中等或偏上高中生，共6讲</p><p>第1讲：以归纳推理为背景的填空题</p><p>第2讲：以新定义为背景的填空题</p><p>第3讲：以不等式恒成立为背景的填空题</p><p>第4讲：以向量相关的最值问题为背景的填空题</p><p>第5讲：以立体几何为背景的新颖问题为背景的填空题</p><p>第6讲：以数列求和或者通项公式为背景的填空题</p>",
					"student_desc"        => null,
					"target"              => null,
					"arrangement"         => "04月18日 21:00开课 05月23日 22:00结课 共6节",
					"use_regular_addr"    => "0",
					"area_id"             => "0",
					"address"             => null,
					"offline_poi"         => null,
					"user_address_id"     => null,
					"status"              => "2",
					"open_status"         => "2",
					"verify_status"       => "1",
					"reason"              => "",
					"reason_text"         => "",
					"is_complete"         => "1",
					"chaban_flag"         => "3",
					"chaban_quota"        => "0",
					"chaban_price_flag"   => "1",
					"chaban_price"        => "8.33",
					"begin_time"          => 1460984400,
					"end_time"            => 1464012000,
					"course_len"          => "21600",
					"create_time"         => 1460440363,
					"update_time"         => 1460440749,
					"special_time_reason" => null,
					"retire_flag"         => "1",
					"retire_length"       => "3600",
					"sort"                => "0",
					"rank"                => "0",
					"extend_status"       => "0",
					"transform"           => "0",
					"page_view"           => "0",
					"last_set_time"       => null,
					"group_id"            => "197656",
					"auto_status"         => "0",
					"auto_status_time"    => "0",
					"playback_expire_day" => "10",
					"is_auto_incr"        => "0",
					"address_area"        => array(
						"province"           => [],
						"city"               => [],
						"area"               => [],
						"country"            => [],
						"full_address"       => "",
					),
					"in_pay"         => 0,
					"succ_pay"       => 2,
					"total_pay"      => 2,
					"display_status" => 5,
					"photos"         => [
					],
					"cover_url"           => "http://img.gsxservice.com/9325150_77cbi62r.jpeg",
					"location"            => "",
					"is_full"             => false,
					"can_chaban"          => true,
					"realtime_price"      => "8.33",
					"realtime_course_len" => 3600,
					"course_type"         => 2,
					"limit_discount"      => []
				)
			),
			"offline_course" => array(
				array(
					"limit_discount" => array(
						"0"             => array(
							"start_time"   => "2016-03-08 20:00:00",
							"end_time"     => "2016-06-16 24:00:00",
							"tag_name"     => "616大促",
							"info"         => "TEST 616",
							"id"           => "5",
							"price"        => "201.00", // 现价
							"pre_price"    => "500.00"// 原价
						)
					),
					'original_price' => 1233,
					"number"         => "1311134745712", //班课number
					"subject_id"     => '383', //班课包含的subject的id
					"name"           => "水彩画创意速成课程",
					"lesson_way"     => 4, //可上课的方式4普通场地课2普通在线3在线公开课
					"create_time"    => "2013-08-03 19:27:21", //课程创建时间
					"begin_time"     => "1415860970", //课程开始时间
					"end_time"       => "1415960970", //课程结束时间
					"course_len"     => 7200,
					"display_status" => 5,
					"tag_fenqi"      => 1,
					"fenqi"          => array(
						"tag_name"      => "分期",
						"tiexi_info"   => "",
						"desc"          => "可享3期分期付学费",
					),
					"price"           => 123, //课程价格
					"max_student"     => 20, //最大学生数
					"address"         => "北京市海淀区黄焖鸡米饭", //上课地点
					"address_area"    => array(
						"province"       => array(
							'id'            => '570425344',
							'name'          => '台湾',
							'display_order' => '460',
							'level'         => '1',
							'hidden'        => '0',
						),
						"city"           => array(
							'id'            => '570425344',
							'name'          => '台湾',
							'display_order' => '0',
							'level'         => '2',
							'hidden'        => '0',
						),
						"area"           => array(
							'id'            => '570425344',
							'name'          => '澎湖县',
							'display_order' => '0',
							'level'         => '3',
							'hidden'        => '0',
						),
						"country" => array(

						),
						"location_addr" => "中关村新东方大厦",
					),
					"student_desc" => "小学生", //适学人群
					"status"       => 1, //班课状态 1初始状态,2可以招生但是尚未招生
					//3正在招生,4停止招生,5开课,6课程结束
					"photos" => array(
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
							'name'        => '鲜花',
							'width'       => 480,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
							'name'        => '失联客机',
							'width'       => 768,
							'height'      => 1024,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/901_o6ut84ce.png',
							'name'        => '撒了快递费',
							'width'       => 400,
							'height'      => 600,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/6271_znvng0qo.png',
							'name'        => '撒了款到即发',
							'width'       => 479,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
							'name'        => '撒了款到即发',
							'width'       => 852,
							'height'      => 1136,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
							'name'        => '鲜花',
							'width'       => 480,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
							'name'        => '失联客机',
							'width'       => 768,
							'height'      => 1024,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/901_o6ut84ce.png',
							'name'        => '撒了快递费',
							'width'       => 400,
							'height'      => 600,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/6271_znvng0qo.png',
							'name'        => '撒了款到即发',
							'width'       => 479,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
							'name'        => '撒了款到即发',
							'width'       => 852,
							'height'      => 1136,
						),
					), //照片
					"total_pay"     => 10, //支付状态
					"succ_pay"      => 5, // 成功支付
					"verify_status" => 1, //审核状态1审核通过 2审核被拒
					"location"      => '北京 海淀 全部信息',
					'offline_poi'   => array(
						'lng'          => '1.24354325',
						'lat'          => '2.34535435',
					),
					"chaban_flag"         => 2, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
					"chaban_quota"        => 0, //第n节课前可插班
					"chaban_price_flag"   => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
					"chaban_price"        => 9.9, //插班价格
					"can_chaban"          => true, //当前时间能否插班
					"realtime_price"      => 1.1, //实时价格
					"realtime_course_len" => 3600, //剩余长度
					"is_full"             => true, // 是否满班,
					"course_type"         => 4, //3810
					"freq"                => 12, //课次数
					"arrangement"         => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发"
				),
				array(
					"limit_discount" => array(
						"0"             => array(
							"start_time"   => "2015-06-26 00:00:00",
							"end_time"     => "2015-07-16 24:00:00",
							"tag_name"     => "616大促",
							"info"         => "TEST 616",
							"id"           => "5",
							"price"        => "200.00", //现价
							"pre_price"    => "500.00"//原价
						)
					),
					"number"          => "1311134745712", //班课number
					"subject_id"      => '383', //班课包含的subject的id
					"name"            => "水彩画创意速成课程",
					"lesson_way"      => 4, //可上课的方式4普通场地课2普通在线3在线公开课
					"create_time"     => "2013-08-03 19:27:21", //课程创建时间
					"begin_time"      => "1415860970", //课程开始时间
					"end_time"        => "1415960970", //课程结束时间
					"course_len"      => 12000,
					"display_status"  => 2,
					"price"           => 123, //课程价格
					"max_student"     => 20, //最大学生数
					"address"         => "北京市海淀区黄焖鸡米饭", //上课地点
					"address_area"    => array(
						"province"       => array(
							'id'            => '570425344',
							'name'          => '台湾',
							'display_order' => '460',
							'level'         => '1',
							'hidden'        => '0',
						),
						"city"           => array(
							'id'            => '570425344',
							'name'          => '台湾',
							'display_order' => '0',
							'level'         => '2',
							'hidden'        => '0',
						),
						"area"           => array(
							'id'            => '570425344',
							'name'          => '澎湖县',
							'display_order' => '0',
							'level'         => '3',
							'hidden'        => '0',
						),
						"country" => array(

						),
						"location_addr" => "中关村新东方大厦",
					),
					"student_desc" => "小学生", //适学人群
					"status"       => 1, //班课状态 1初始状态,2可以招生但是尚未招生
					//3正在招生,4停止招生,5开课,6课程结束
					"photos" => array(
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
							'name'        => '鲜花',
							'width'       => 480,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
							'name'        => '失联客机',
							'width'       => 768,
							'height'      => 1024,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/901_o6ut84ce.png',
							'name'        => '撒了快递费',
							'width'       => 400,
							'height'      => 600,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/6271_znvng0qo.png',
							'name'        => '撒了款到即发',
							'width'       => 479,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
							'name'        => '撒了款到即发',
							'width'       => 852,
							'height'      => 1136,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/1251_scwyj6zr.jpeg',
							'name'        => '鲜花',
							'width'       => 480,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg',
							'name'        => '失联客机',
							'width'       => 768,
							'height'      => 1024,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/901_o6ut84ce.png',
							'name'        => '撒了快递费',
							'width'       => 400,
							'height'      => 600,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/6271_znvng0qo.png',
							'name'        => '撒了款到即发',
							'width'       => 479,
							'height'      => 640,
						),
						array(
							'id'          => '',
							'create_time' => '',
							'url'         => 'http://img.gsxservice.com/13116_rh81m1o2.jpeg',
							'name'        => '撒了款到即发',
							'width'       => 852,
							'height'      => 1136,
						),
					), //照片
					"total_pay"     => 10, //支付状态
					"succ_pay"      => 5, // 成功支付
					"verify_status" => 1, //审核状态1审核通过 2审核被拒
					"location"      => '北京 海淀 全部信息',
					'offline_poi'   => array(
						'lng'          => '1.24354325',
						'lat'          => '2.34535435',
					),
					"chaban_flag"         => 2, //插班标识 1不可插班 2第n节课前可插班 3随时可插班
					"chaban_quota"        => 0, //第n节课前可插班
					"chaban_price_flag"   => 1, //插班价格标识 1未结束课程的总价 2自定义插班价
					"chaban_price"        => 9.9, //插班价格
					"can_chaban"          => true, //当前时间能否插班
					"realtime_price"      => 1.1, //实时价格
					"realtime_course_len" => 3600, //剩余长度
					"is_full"             => true, // 是否满班,
					"arrangement"         => "啊掉了啊掉了啊掉了的阿斯顿发的阿斯顿发的阿斯顿发",
					"course_type"         => 4, //3810
					"freq"                => 12//课次数
				),
			),
			"title"       => "北京 徐梅山-星座-居家风水-找好老师，上跟谁学",
			"description" => "【找好老师，上跟谁学】因为专业所以权威，深入浅出、简单易懂、化繁为简、结合实际、实例分析，教授科目：星座-居家风水",
			"keywords"    => "北京 徐梅山-星座",
			"video_count" => 3,
			"photo_count" => 40,
			"video_list"  => array(
				array(
					"name"               => "高中英语语法技巧的问题高中英语语法技巧的问题",
					"img"                => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb/1_160_120.jpg",
					"video"              => "http://www.genshuixue.com/video/view/140",
					"video_id"           => 1,
					"preface_url_prefix" => "http://test-img.gsxservice.com/00-upload/image-test/66194_6c40b1cc2ee1bc8bfe69a8c132a2ca37_iNvVqeso",
					"preface_url"        => "http://test-img.gsxservice.com/00-upload/image-test/66194_6c40b1cc2ee1bc8bfe69a8c132a2ca37_iNvVqeso.jpg",
				),
				array(
					"name"               => "高中英语语法技巧的问题",
					"img"                => "http://img.gsxservice.com/149743_hixrca18.png",
					"video"              => "http://www.genshuixue.com/video/view/140",
					"video_id"           => 1,
					"preface_url_prefix" => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb",
					"preface_url"        => "http://i1.letvimg.com/yunzhuanma/201409/12/101b9473a729613cb7d56d78781ac143/thumb.jpg",
				),
				array(
					"name"               => "高中英语语法技巧的问题",
					"img"                => "http://img.genshuixue.com/2142_0p5xsq1x.jpeg",
					"video"              => "http://www.genshuixue.com/video/view/140",
					"video_id"           => 1,
					"preface_url_prefix" => "http://i3.letvimg.com/yunzhuanma/201410/18/66a4a94ec40ae9f4eb73f4c6c6384957/thumb",
					"preface_url"        => "http://i3.letvimg.com/yunzhuanma/201410/18/66a4a94ec40ae9f4eb73f4c6c6384957/thumb",
				),
			),
			"photo_list" => array(
				array(
					'id'          => '38989',
					'name'        => '',
					'img'         => 'http://img.gsxservice.com/65776_wjoqso17.jpeg',
					'width'       => '720',
					'height'      => '1280',
					'create_time' => '2015-03-04 17:28:08',
				),
				array(
					'id'          => '38989',
					'name'        => '发生的看得见',
					'img'         => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
					'width'       => '720',
					'height'      => '1280',
					'create_time' => '2015-03-04 17:28:08',
				),
				array(
					'id'          => '38989',
					'name'        => '爱上地方撒的得见',
					'img'         => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
					'width'       => '720',
					'height'      => '1280',
					'create_time' => '2015-03-04 17:28:08',
				),
				array(
					'id'          => '38989',
					'name'        => '爱是看得见',
					'img'         => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
					'width'       => '720',
					'height'      => '1280',
					'create_time' => '2015-03-04 17:28:08',
				),
				array(
					'id'          => '38989',
					'name'        => '爱是看得见',
					'img'         => 'http://test-img.gsxservice.com/289209_8qnnhksw.png',
					'width'       => '720',
					'height'      => '1280',
					'create_time' => '2015-03-04 17:28:08',
				),
			),
			"comment_data" => array(
				"pager"       => array(
					'count'      => 110,
					'page'       => 1,
					'page_size'  => 10,
				),
				"comment_list" => array(
					array(
						"anonymous"           => 1, // 匿名评价
						"desc_match"          => "5.0",
						"teach_result"        => "5.0",
						"service_attitude"    => "5.0",
						"face_type"           => "1",
						"info"                => "150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771",
						"create_time"         => "2015-04-02 10:51",
						"fr"                  => "0",
						"course_type"         => "1",
						"thumb_up"            => "2",
						"has_photo"           => "0",
						"display_title"       => "总课程",
						"comment_id"          => "36966",
						"has_thumb_up"        => false,
						"comprehensive_score" => "5",
						"course"              => array(
							"course_name"        => "排行榜第五季",
							"hours"              => "1.0",
							"lesson_way"         => "4",
							"real_student"       => "wwwwwwww",
							"lesson_way_name"    => "线下授课",
							"course_number"      => 150907747310,
							"course_url"         => "http://www.genshuixue.com",
							"teacher_name"       => "nihao",
							"teacher_url"        => "http://www.genshuixue.com",
						),
						"user"          => array(
							"display_name" => "王余洁",
							"avatar_url"   => "http://test-img.gsxservice.com/333070_ocktjons.jpeg",
							"number"       => "877452358",
						),
						'photo_list' => array(
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'user_id'     => 123123, //学生id
								'storage_id'  => 12312, //前端用不到
								'title'       => '图片的标题1', //图片标题
								'create_time' => 39994, //图片创建时间
								'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg', //图片url
								'width'       => 768,
								'height'      => 1024,
							)
						),
						'if_can_addition'      => true, // 是否可追评
						'if_can_review'        => true, // 是否可回复
						'additional'           => array(
							"student"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "几天过去了，心情好多了",
								"type"               => 1, // 1,追评 2,回复
								"create_time"        => "2015-11-09 19:23:23",
							),
							"teacher"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "你也是个认真的孩子呢",
								"type"               => 2,
								"create_time"        => "2015-11-09 19:23:23",
							),
							"total_score" => array(
								"one"        => 2,
								"two"        => 4,
								"three"      => 6,
								"four"       => 8,
								"five"       => 10,
								"total"      => 10,
							),
							"invite_comment_number"  => 21,
							"default_comment_number" => 32,
							"user_comment_number"    => 42,
						)
					),
					array(
						"anonymous"           => 1, // 匿名评价
						"desc_match"          => "5.0",
						"teach_result"        => "5.0",
						"service_attitude"    => "5.0",
						"face_type"           => "1",
						"info"                => "150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771",
						"create_time"         => "2015-04-02 10:51",
						"fr"                  => "0",
						"course_type"         => "1",
						"thumb_up"            => "2",
						"has_photo"           => "0",
						"display_title"       => "总课程",
						"comment_id"          => "36966",
						"has_thumb_up"        => false,
						"comprehensive_score" => "5",
						"course"              => array(
							"course_name"        => "排行榜第五季",
							"hours"              => "1.0",
							"lesson_way"         => "4",
							"real_student"       => "wwwwwwww",
							"lesson_way_name"    => "线下授课",
							"course_number"      => 150907747310,
							"course_url"         => "http://www.genshuixue.com",
							"teacher_name"       => "nihao",
							"teacher_url"        => "http://www.genshuixue.com",
						),
						"user"          => array(
							"display_name" => "王余洁",
							"avatar_url"   => "http://test-img.gsxservice.com/333070_ocktjons.jpeg",
							"number"       => "877452358",
						),
						'photo_list' => array(
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'user_id'     => 123123, //学生id
								'storage_id'  => 12312, //前端用不到
								'title'       => '图片的标题1', //图片标题
								'create_time' => 39994, //图片创建时间
								'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg', //图片url
								'width'       => 768,
								'height'      => 1024,
							)
						),
						'if_can_addition'      => true, // 是否可追评
						'if_can_review'        => true, // 是否可回复
						'additional'           => array(
							"student"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "几天过去了，心情好多了",
								"type"               => 1, // 1,追评 2,回复
								"create_time"        => "2015-11-09 19:23:23",
							),
							"teacher"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "你也是个认真的孩子呢",
								"type"               => 2,
								"create_time"        => "2015-11-09 19:23:23",
							),
							"total_score" => array(
								"one"        => 2,
								"two"        => 4,
								"three"      => 6,
								"four"       => 8,
								"five"       => 10,
								"total"      => 10,
							),
							"invite_comment_number"  => 21,
							"default_comment_number" => 32,
							"user_comment_number"    => 42,
						)
					),
					array(
						"anonymous"           => 1, // 匿名评价
						"desc_match"          => "5.0",
						"teach_result"        => "5.0",
						"service_attitude"    => "5.0",
						"face_type"           => "1",
						"info"                => "150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771",
						"create_time"         => "2015-04-02 10:51",
						"fr"                  => "2",
						"course_type"         => "1",
						"thumb_up"            => "2",
						"has_photo"           => "0",
						"display_title"       => "总课程",
						"comment_id"          => "36966",
						"has_thumb_up"        => false,
						"comprehensive_score" => "5",
						"course"              => array(
							"course_name"        => "排行榜第五季",
							"hours"              => "1.0",
							"lesson_way"         => "4",
							"real_student"       => "wwwwwwww",
							"lesson_way_name"    => "线下授课",
							"course_number"      => 150907747310,
							"course_url"         => "http://www.genshuixue.com",
							"teacher_name"       => "nihao",
							"teacher_url"        => "http://www.genshuixue.com",
						),
						"user"          => array(
							"display_name" => "王余洁",
							"avatar_url"   => "http://test-img.gsxservice.com/333070_ocktjons.jpeg",
							"number"       => "877452358",
						),
						'photo_list' => array(
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'user_id'     => 123123, //学生id
								'storage_id'  => 12312, //前端用不到
								'title'       => '图片的标题1', //图片标题
								'create_time' => 39994, //图片创建时间
								'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg', //图片url
								'width'       => 768,
								'height'      => 1024,
							)
						),
						'if_can_addition'      => true, // 是否可追评
						'if_can_review'        => true, // 是否可回复
						'additional'           => array(
							"student"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "几天过去了，心情好多了",
								"type"               => 1, // 1,追评 2,回复
								"create_time"        => "2015-11-09 19:23:23",
							),
							"teacher"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "你也是个认真的孩子呢",
								"type"               => 2,
								"create_time"        => "2015-11-09 19:23:23",
							),
							"total_score" => array(
								"one"        => 2,
								"two"        => 4,
								"three"      => 6,
								"four"       => 8,
								"five"       => 10,
								"total"      => 10,
							),
							"invite_comment_number"  => 21,
							"default_comment_number" => 32,
							"user_comment_number"    => 42,
						)
					),
					array(
						"anonymous"           => 1, // 匿名评价
						"desc_match"          => "5.0",
						"teach_result"        => "5.0",
						"service_attitude"    => "5.0",
						"face_type"           => "1",
						"info"                => "150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771150402809771",
						"create_time"         => "2015-04-02 10:51",
						"fr"                  => "0",
						"course_type"         => "1",
						"thumb_up"            => "2",
						"has_photo"           => "0",
						"display_title"       => "总课程",
						"comment_id"          => "36966",
						"has_thumb_up"        => false,
						"comprehensive_score" => "5",
						"course"              => array(
							"course_name"        => "排行榜第五季",
							"hours"              => "1.0",
							"lesson_way"         => "4",
							"real_student"       => "wwwwwwww",
							"lesson_way_name"    => "线下授课",
							"course_number"      => 150907747310,
							"course_url"         => "http://www.genshuixue.com",
							"teacher_name"       => "nihao",
							"teacher_url"        => "http://www.genshuixue.com",
						),
						"user"          => array(
							"display_name" => "王余洁",
							"avatar_url"   => "http://test-img.gsxservice.com/333070_ocktjons.jpeg",
							"number"       => "877452358",
						),
						'photo_list' => array(
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'url'    => 'http://img.gsxservice.com/27658_61zqh1ni.jpeg', //图片url
								'width'  => 768,
								'height' => 1024,
								'title'  => 'long long ago',
							),
							array(
								'user_id'     => 123123, //学生id
								'storage_id'  => 12312, //前端用不到
								'title'       => '图片的标题1', //图片标题
								'create_time' => 39994, //图片创建时间
								'url'         => 'http://img.gsxservice.com/29650_v8ag661z.jpeg', //图片url
								'width'       => 768,
								'height'      => 1024,
							)
						),
						'if_can_addition'      => true, // 是否可追评
						'if_can_review'        => true, // 是否可回复
						'additional'           => array(
							"student"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "几天过去了，心情好多了",
								"type"               => 1, // 1,追评 2,回复
								"create_time"        => "2015-11-09 19:23:23",
							),
							"teacher"             => array(
								"teacher_comment_id" => 4324,
								"info"               => "你也是个认真的孩子呢",
								"type"               => 2,
								"create_time"        => "2015-11-09 19:23:23",
							),
							"total_score" => array(
								"one"        => 2,
								"two"        => 4,
								"three"      => 6,
								"four"       => 8,
								"five"       => 10,
								"total"      => 10,
							),
							"invite_comment_number"  => 21,
							"default_comment_number" => 32,
							"user_comment_number"    => 42,
						)
					),
				),
				"additional"         => array(// 评价相关其他信息
					"user_diff"         => 0, // 是否是老师本人查看该页面
					"desc_match"        => "4.6", // 教学与描述相符
					"service_attitude"  => "4.8", // 老师的教学态度
					"teach_result"      => "4.6", // 老师的响应速度
					"average"           => "4.7", // 总平均分
					"user_total_number" => "18", // 一共多少用户评价
					"face_type"         => array(// 各种评价数目
						"total"            => 34,
						"lower"            => 3,
						"great"            => 25,
						"middle"           => 2,
						"has_photo"        => 4,
					),
					"total_score" => array(
						"one"        => 2,
						"two"        => 4,
						"three"      => 6,
						"four"       => 8,
						"five"       => 10,
						"total"      => 10,
					),
					"invite_comment_number"  => 21,
					"default_comment_number" => 32,
					"user_comment_number"    => 42,
					"comment_type"           => array(
						"total"                 => array(
							"value"                => 0,
							"name"                 => "全部评价",
							"total_count"          => 30,
						),
						"normal"       => array(
							"value"       => 1,
							"name"        => "一对一评价",
							"total_count" => 30,
						),
						"class"        => array(
							"value"       => 3,
							"name"        => "班课评价",
							"total_count" => 30,
						),
						"video"        => array(
							"value"       => 4,
							"name"        => "视频课评价",
							"total_count" => 30,
						),
						"invite"       => array(
							"value"       => 2,
							"name"        => "邀请评价",
							"total_count" => 30,
						)
					),
					"comment_nav"   => array(
						"face_type"    => 1,
						"comment_type" => 0,
						"sort_by"      => 'create_time',
					),
					'comment_tag' => array(
						array(
							'value'    => 'classify_1',
							'name'     => '高颜值',
							'selected' => true,
							'count'    => 22,
							'sys'      => true, // 是不是系统标签
							'type'     => 1// 0默认 1好词 2坏词
						),
						array(
							'value'    => 'classify_2',
							'name'     => '简单易懂',
							'selected' => false,
							'count'    => 12,
							'sys'      => true,
							'type'     => 1,
						),
						array(
							'value'    => 'classify_2',
							'name'     => '醍醐灌顶',
							'selected' => false,
							'count'    => 12,
							'sys'      => true,
							'type'     => 1,
						),
						array(
							'value'    => 'classify_2',
							'name'     => 'so easy',
							'selected' => false,
							'count'    => 12,
							'sys'      => true,
							'type'     => 1,
						),
						array(
							'value'    => 'classify_2',
							'name'     => '老师和蔼可亲',
							'selected' => false,
							'count'    => 12,
							'sys'      => true,
							'type'     => 1,
						),
						array(
							'value'    => 'classify_2',
							'name'     => '肤浅',
							'selected' => false,
							'count'    => 2,
							'sys'      => true,
							'type'     => 2,
						),
						array(
							'value'    => 'classify_2',
							'name'     => '无聊',
							'selected' => false,
							'count'    => 1,
							'sys'      => true,
							'type'     => 2,
						)
					)
				)
			)
		),
		"log_data" => array(
			"qid"     => "123123",
		)
	)
);
