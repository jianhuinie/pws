{{*
@file 热文推广详情页面
@author shubaiqiao
@date 2016-09-06
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "微信热文详情"}}

    {{$page_module = "page/activity/hotDocument/hotDoc_detail/index"}}

    {{$isNeedScale = false}}    
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
    {{$article = $tpl_data.article}}
    {{$teacher = $tpl_data.teacher}}
{{/block}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/hotDocument/hotDoc_detail/index.styl"/>
{{/block}}

{{block name="content"}}

    <div class="container">
        <div class="content">
            <div class="title">{{$article.title}}</div>
            <div class="tip">
                <p class="date">{{$article.updatetime}}</p>
                <p class="author">{{$article.author}}</p>
            </div>
            <div class="detail">
                {{$article.content}}
                <!-- <img src="http://imgsrc.baidu.com/forum/pic/item/91ef76c6a7efce1b4b724a5eaf51f3deb58f65cd.jpg">
                <p>
                    我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                </p>
                <p>
                    我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                </p> -->
            </div>
        </div>
        <div class="bottom">
            <div class="teacher">
                <i class="icon icon-chevron-thin-right"></i>
                <div class="teacher-icon"><img src="{{$teacher.info.avatar}}"></div>
                <div class="right">
                    <div class="teacher-name line-clamp">
                        {{$teacher.info.display_name}}&nbsp;
                        <div class="vip">
                            {{if $teacher.info.vip_level == 3}}
                                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                            {{else if $teacher.info.vip_level == 2}}
                                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                            {{else if $teacher.info.vip_level == 1}}
                                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                            {{/if}}
                        </div>
                    </div>
                    <div class="teacher-info">
                        <p class="student-number">学生{{$teacher.student_count}}人</p>&nbsp;
                        <p class="course-time">授课{{$teacher.teach_time|string_format:'%.1f'}}小时</p>&nbsp;
                        <p class="praise-rate">{{$teacher.great_rate * 100}}%好评</p>
                    </div>
                    <div class="description">
                        <p>{{$teacher.info.short_introduce}}</p>
                    </div>
                </div>
            </div>
            <div class="banner">
                <p class="slogan">
                    跟谁学,最活跃的在线教育平台
                </p>
                <div class="button">我要免费开课</div>
            </div>
        </div>
    </div>

{{/block}}