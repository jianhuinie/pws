
<div class="teacher-intro">
    {{* 所在地区 *}}
    <a href="{{if !$tpl_data.detail_info.country}}{{$tpl_data.detail_info.area_detail_url}}{{else}}javascript:;{{/if}}" class="address">
        <span class="title">
            上课地址
        </span>
        <div class="info">
            {{$tpl_data.detail_info.location}}
        </div>
        {{if !$tpl_data.detail_info.country}}
        <span class="distance"></span>
        <i class="icon icon-angle-right"></i>
        {{/if}}
    </a>
    {{* 个人认证 *}}
    {{if !empty($tpl_data.detail_info.certs)}}
    <div class="personal-identify">
        <span class="title">
            个人认证
        </span>
        <div class="info">
            {{foreach $tpl_data.detail_info.certs as $certs}}
                {{if $certs@index mod 2 == 0}}
                <div class="one-line">
                    <span>
                        <i class="icon icon-check-o-org"></i>
                        <span class="cert">{{$certs}}</span>
                    </span>
                    {{if $tpl_data.detail_info.certs|count-1 == $certs@index}}
                    </div>
                    {{/if}}
                {{else}}
                <span>
                    <i class="icon icon-check-o-org"></i>
                    <span class="cert">{{$certs}}</span>
                 </span>
                {{if $certs@index mod 2 != 0}}
                </div>
                {{/if}}
                {{/if}}
            {{/foreach}}
        </div>
    </div>
    {{/if}}
    {{* 老师特点 *}}
    <div class="feature">
        <span class="gray-400">老师特点</span>
        {{if count($tpl_data.detail_info.skill) > 0}}
        <div class="content">
            <div id="content-slide-down">
                {{foreach item=skill from=$tpl_data.detail_info.skill}}
                <span class="skill">{{$skill}}</span>
                {{/foreach}}
            </div>
        </div>
        <div class="slide-down">
            {{foreach item=skill from=$tpl_data.detail_info.skill}}
            <span class="skill">{{$skill}}</span>
            {{/foreach}}
        </div>
        <i class="icon icon-angle-down"></i>
        {{else}}
        暂无
        {{/if}}
    </div>
 </div>

<div class="teacher-other-intro">
    {{if !empty($tpl_data.base_info.self_introduce)}}
    <div class="self-intro">
        <span class="title {{$tpl_data.model}}">
            自我介绍
        </span>
        <div class="info">
            {{$tpl_data.base_info.self_introduce}}
        </div>
    </div>
    {{/if}}

    {{if !empty($tpl_data.cases.list)}}
    <div class="relative-case">
        <span class="title {{$tpl_data.model}}">
            相关案例
        </span>
        {{foreach $tpl_data.cases.list as $case}}
        <div class="info">
            {{$case.content}}
        </div>
        {{/foreach}}
    </div>
    {{/if}}

    {{if !empty($tpl_data.experiences.list)}}
    <div class="past-experience">
        <span class="title {{$tpl_data.model}}">
            过往经历
        </span>
        <div class="exp-info">
            {{foreach $tpl_data.experiences.list as $exp}}
            <div class="one-exp-line {{if $exp@index > 1}} hide {{/if}}">
                <span class="date-{{$tpl_data.model}}">
                    {{date("Y年m月d日",$exp.start_date)}}
                    <span class="date-space">—</span>
                    {{if $exp.end_date != "至今"}}
                    {{date("Y年m月d日",$exp.end_date)}}
                    {{else}}
                    {{$exp.end_date}}
                    {{/if}}
                </span>
                <div class="exp-des exp-{{$tpl_data.model}}">
                    {{preg_replace('/(\n)+/','<br/>', $exp.content)}}
                    <span class="triangle triangle-{{$tpl_data.model}}"></span>
                </div>
            </div>
            {{/foreach}}
            {{if $tpl_data.experiences.list|count > 2}}
            <div class="exp-spread">
                <i class="icon icon-angle-down"></i>
            </div>
            {{/if}}
        </div>
    </div>
    {{/if}}

    {{*学生评价*}}
    {{if !empty($tpl_data.comment.list)}}
    <div class="student-comment">
        <span class="title {{$tpl_data.model}}">
            学生评价
        </span>
        <div class="intro-comment">
            {{if $tpl_data.comment.list[0].fr !=2}}
            <div class="score-info">
                {{$score=$tpl_data.comment.score.total_score}}
                {{if $score == 0}}
                    {{$score = 5}}
                {{/if}}
                {{for $i = 1 to 5}}
                    {{if $score >= $i}}
                    <i class="icon icon-star_all star-shine {{$tpl_data.model}}"></i>
                    {{elseif $i - $score <= 0.5}}
                    <b class="star-half">
                        <i class="icon icon-star_half half {{$tpl_data.model}}"></i>
                        <i class="icon icon-star_all"></i>
                    </b>
                    {{else}}
                    <i class="icon icon-star_all"></i>
                    {{/if}}

                {{/for}}

                <span class="score-detail">{{$score}}分</span>
            </div>
            {{/if}}
            <div class="score-tag">
                {{foreach $tpl_data.comment.comment_tags as $tag}}
                <span class="tag-info">{{$tag.name}}</span>
                {{/foreach}}
            </div>
            <div class="evaluation-info gray-600">
                {{foreach item=comment from=$tpl_data.comment.list}}
                {{if $comment@index eq 0}}
                <div class="eva-detail">
                    {{if isset($comment.number) && !empty($comment.number)}}
                    <div class="eva-img">
                        <img data-src="{{$comment.user_avatar}}">
                    </div>
                    {{else}}
                    <div class="eva-img">
                        <img data-src="{{$comment.user_avatar}}">
                    </div>
                    {{/if}}
                    <div class="eva-user">
                        <p>{{$comment.user_name}}</p>
                        <p class="comment-time">{{$comment.create_time}}</p>
                    </div>
                    <p>{{$comment.info}}</p>
                </div>
                {{/if}}
                {{/foreach}}
            </div>
            <div class="more">
                <span class="more-comment">查看全部评价</span>
            </div>
        </div>
    </div>
    {{/if}}

    {{if !empty($tpl_data.other_info)}}
    <div class="img-text">
        <span class="title {{$tpl_data.model}}">更多详情</span>
        <div class="img-text-content">
            {{$tpl_data.other_info}}
        </div>
    </div>
    {{/if}}

</div>