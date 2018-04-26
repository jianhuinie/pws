{{* 简介 *}}
<div class="avatar-other">
    <div class="teacher-avatar">
        <div class="avatar-sex">
            <img class="avatar" width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src="{{$tpl_data.base_info.avatar}}">
            {{if $tpl_data.base_info.sex == '1'}}
            <img class="sex" width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f009091d0d.png">
            {{else}}
            <img class="sex" width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569f00906ae81.png">
            {{/if}}
        </div>
    </div>
    <p class="teacher-name">
        {{$tpl_data.base_info.name}}
        {{if !empty($tpl_data.base_info.org)}}
            {{if !empty($tpl_data.base_info.org.membership_level) && $tpl_data.base_info.org.membership_level != 1}}
                {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，为了保持统一，将机构的会员等级做了减1的处理*}}
                {{$vip_level = $tpl_data.base_info.org.membership_level - 1}}
            {{else}}
                {{$vip_level = ""}}
            {{/if}}
        {{else}}
            {{if !empty($tpl_data.base_info.vip_level) && $tpl_data.base_info.vip_level != 0}}
                {{$vip_level = $tpl_data.base_info.vip_level}}
            {{else}}
                s{{$vip_level = ""}}
            {{/if}}
        {{/if}}

        {{if !empty($vip_level)}}
        <span class="teacher-vip level{{$vip_level}}">
            {{if $vip_level == 3}}
             <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
            {{elseif $vip_level == 2}}
             <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
            {{else}}
             <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
            {{/if}}
        </span>
        {{/if}}
    </p>
    {{* 机构信息 *}}
    {{if !empty($tpl_data.base_info.org)}}
    <a href="{{$tpl_data.base_info.org.url}}" class="org-name">
        {{$tpl_data.base_info.org.name}}
    </a>
        {{if $tpl_data.base_info.is_gold_certification == true}}
            <span class="teacher-gold">
                <img height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/586d161ac6963.png">
            </span>
        {{/if}}
    {{/if}}
    {{* 个人认证 *}}
    {{if !empty($tpl_data.detail_info.certs)}}
    <div class="personal-identify">
        {{if !empty($tpl_data.detail_info.school_age)}}
        <div class="info">
            <p>
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569efce908755.png">
            </p>
            {{if $tpl_data.detail_info.school_age < 0}}
            30+年教龄
            {{else}}
            {{$tpl_data.detail_info.school_age}}年教龄
            {{/if}}
        </div>
        {{/if}}
        {{foreach $tpl_data.detail_info.certs as $certs}}
        <div class="info">
            <p>
                {{if $certs == "教师认证"}}
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569efce9471df.png" />
                {{elseif $certs == "学历认证"}}
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a0a24ca68b4.png"/>
                {{elseif $certs == "专业认证"}}
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569efce8c8214.png"/>
                {{elseif $certs == "身份认证"}}
                <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569efce92783b.png"/>
                {{/if}}
            </p>
            {{$certs}}
        </div>
        {{/foreach}}
    </div>
    {{/if}}
</div>

{{* 自我介绍 *}}
{{if !empty($tpl_data.base_info.self_introduce)}}
<div class="introduce">
    <p class="title">
        自我介绍
    </p>
    <div class="info">
        {{$tpl_data.base_info.self_introduce}}
    </div>
</div>
{{/if}}

{{if !empty($tpl_data.cases.list)}}
<div class="relative-case">
    <p class="title">
        相关案例
    </p>
    <div class="overflow-info">
        {{foreach $tpl_data.cases.list as $case}}
        <div class="info">
            {{$case.content}}
        </div>
        {{/foreach}}
    </div>
    <div class="more-info" data-spread="false">
        <span>展开更多</span>
        <i class="icon icon-angle-down"></i>
    </div>
</div>
{{/if}}

{{if !empty($tpl_data.experiences.list)}}
<div class="past-experience">
    <p class="title">
        过往经历
    </p>
    <div class="info">
        <div class="overflow-info">
            {{foreach $tpl_data.experiences.list as $exp}}
            <div class="info">
                <span class="date">
                    {{date("Y年m月d日",$exp.start_date)}}
                    <span class="date-space">—</span>
                    {{if $exp.end_date != "至今"}}
                     {{date("Y年m月d日",$exp.end_date)}}
                    {{else}}
                    {{$exp.end_date}}
                    {{/if}}
                </span>
                <div class="exp-des">
                    {{$exp.content}}
                </div>
            </div>
            {{/foreach}}
        </div>
        <div class="more-info" data-spread="false">
            <span>展开更多</span>
            <i class="icon icon-angle-down"></i>
        </div>
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
                            <a href="/x/{{$comment.number}}">
                                <div class="eva-img">
                                    <img data-src="{{$comment.user_avatar}}">
                                </div>
                            </a>
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
    更多详情
</div>
<div id="detail-container">
    <div class="title">
        <i class="icon icon-image-o"></i>
        课程图文详情
    </div>
    <div id="detail">
    </div>
</div>
{{/if}}
