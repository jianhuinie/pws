{{*课程简介*}}
<div class="course-sum">
    <div class="course-title">{{$briefIntro.name}}</div>
    {{if $courseInfo.course_type == 12}}
        {{if !$isCourseSet}}
            <div class="price">
                <span class="current">
                    <span class="unit">￥</span>{{$courseInfo.price}}
                </span>
                {{if !empty($courseInfo.original_price)}}
                    <span class="original"><span class="unit">￥</span>{{$courseInfo.original_price}}</span>
                {{/if}}
            </div>
        {{/if}}
        {{if isset($tpl_data.student.least)}}
            {{$student = $tpl_data.student}}
            <div class="student">
                {{if $student.now < $student.least}}
                    班级人数{{$student.max}}人，已报名{{$student.now}}人，{{$student.least}}人起开班
                {{else}}
                    班级人数{{$student.max}}人，已报名{{$student.now}}人
                {{/if}}
            </div>
        {{/if}}
    {{/if}}

    {{if isset($tpl_data.coupon.coupon_url) && $briefIntro.courseInfo != "开课"}}
        {{$layout = "left-right"}}
    {{else}}
        {{$layout = "top-bottom"}}
    {{/if}}

    <ul class="main-info">
        {{*开课信息*}}
        {{if $briefIntro.courseInfo != "开课"}}
            <li class="open open-{{$layout}}">
                <div class="inner-content">
                    <div class="open-img img">
                        {{if $isCourseSet || $courseInfo.course_type == 11}}
                            <img width="100%" height="100%"
                                 src="/src/page/course/details/component/img/ic_threecourse.png"/>
                        {{else}}
                            <img width="100%" height="100%"
                                 src="/src/page/course/details/component/img/ic_schedule.png"/>
                        {{/if}}
                    </div>
                    <div class="title">{{$briefIntro.courseInfo}}</div>
                    <div class="text">{{$briefIntro.courseInfoDetail}}</div>
                </div>
            </li>
        {{/if}}
        {{*位置*}}
        {{if $briefIntro.lessonWay == 4}}
            <li class="address address-{{$layout}}">
                <div class="inner-content ">
                    <div class="address-icon img">
                        <img width="100%" height="100%"
                             src="/src/page/course/details/component/img/ic_location.png" alt=""/>
                    </div>
                    <div class="title">
                        {{if isset($briefIntro.address)}}
                            {{$briefIntro.address|truncate:8:"...":true}}
                        {{else}}
                            暂无地址
                        {{/if}}
                    </div>
                    <div class="text">线下授课</div>
                </div>
            </li>
        {{else}}
            <li class="online online-{{$layout}}">
                <div class="inner-content">
                    <div class="online-img img">
                        <img width="100%" height="100%"
                             src="/src/page/course/details/component/img/ic_online.png" alt=""/>
                    </div>
                    <div class="title">在线授课</div>
                    <div class="text">支持手机观看</div>
                </div>
            </li>
        {{/if}}

    {{if $layout != "top-bottom"}}
    </ul>
    <ul class="main-info">
    {{/if}}

        {{*评价数*}}
        {{if !empty($comment.comment_list) && $briefIntro.commentNumber > 0}}
            {{$hasComment = true}}
        {{else}}
            {{$hasComment = false}}
        {{/if}}

        <li class="comment comment-{{$layout}}">
            <div class="inner-content">
                <a {{if $hasComment}}href="{{$comment.comment_url}}"{{/if}}>
                    <div class="comment-icon img">
                        <img width="100%" height="100%"
                             src="/src/page/course/details/component/img/ic_good.png" alt=""/>
                    </div>
                    {{if $hasComment}}
                        <div class="title">
                            {{$briefIntro.commentRate}}好评
                        </div>
                        <div class="text">{{$briefIntro.commentNumber}}条</div>
                    {{else}}
                        <div class="title no-comment">暂无评价</div>
                    {{/if}}
                </a>
            </div>
        </li>
        {{*优惠券*}}
        {{if isset($tpl_data.coupon.coupon_url)}}
            <li class="coupon coupon-{{$layout}}">
                <a href="{{$tpl_data.coupon.coupon_url}}">
                    <div class="inner-content">
                        <div class="coupon-img img">
                            <img width="100%" height="100%"
                                 src="https://img.genshuixue.com/0cms/d/file/content/2015/12/56751da387514.png" alt=""/>
                        </div>
                        <span class="right-info">
                            <div class="title">优惠券</div>
                            <div class="text">
                                立即领取
                            </div>
                        </span>
                    </div>
                </a>
            </li>
        {{/if}}
    </ul>
</div>
