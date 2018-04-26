{{$base_info = $tpl_data.base_info}}

<div class="header {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}help{{/if}}">
<div class="preface">
    <img data-src="{{$base_info.preface}}" class="{{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}help{{/if}}">
</div>
<div class="info">
    <div class="avatar">
        <img class="single-img" data-src="{{$base_info.avatar}}">
    </div>
    <div class="base-info">
        <div class="first-nav">
            <span class="name line-clamp {{if $base_info.audio == null}}name-max-width{{/if}}">{{$base_info.name}}</span>
            {{if $base_info.is_gold_certification == true}}
                <span class="teacher-gold">
                    <img width="auto" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5851115f3eff7.png">
                </span>
            {{else}}
                {{if $base_info.sex == 0}}
                    <img class="sex" src="https://imgs.genshuixue.com/2016/12/7150e136ad.png">
                {{else}}
                    <img class="sex" src="https://imgs.genshuixue.com/2016/12/16b2ef9423.png">
                {{/if}}

                {{if !empty($tpl_data.base_info.org)}}
                    {{if !empty($tpl_data.base_info.org.membership_level) && $tpl_data.base_info.org.membership_level != 1}}
                        {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，为了保持统一，将机构的会员等级做了减1的处理*}}
                        {{$vip_level = $tpl_data.base_info.org.membership_level - 1}}
                    {{else}}
                        {{$vip_level = "" }}
                    {{/if }}
                {{else}}
                    {{if !empty($tpl_data.base_info.vip_level) && $tpl_data.base_info.vip_level != 0}}
                        {{$vip_level = $tpl_data.base_info.vip_level}}
                    {{else}}
                        {{$vip_level = ""}}
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
            {{/if}} 

            {{if $base_info.audio}}
            <div class="teacher-audio-show" data-url="{{$base_info.audio.url}}" data-length="{{$base_info.audio.audio_length}}">
                <img class="audio-border" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569e00c1c9d38.png">
                <img class="play-icon" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569ee8d2bf4e1.png">
                <span class="audio-length" data-length="{{$base_info.audio.audio_length}}"></span>
            </div>
            {{/if}}
        </div>
        {{if isset($base_info.org) && $base_info.org}}
            <div class="clickRevers org-name" data-url="{{$base_info.org.url}}">
            {{$base_info.org.name}}
            </div>
        {{/if}}
        <div class="intro line-clamp">
            {{$base_info.short_introduce}}
        </div>
    </div>
</div>

{{$detail_info = $tpl_data.detail_info}}
<div class="header-bottom-mask {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}hide{{/if}}"></div>
<div class="header-bottom {{if isset($smarty.get.viewType) && $smarty.get.viewType == 'hide'}}hide{{/if}}">
    <ul>
        <li>
            <span class="item single-r school-age">{{$detail_info.school_age}}</span>
            <span class="bot-line"></span>
        </li>
        <li  style="flex: 1.5;">
            <span class="item both school-length">
                {{$base_info.course_length}}教学时长
            </span>
            <span class="bot-line"></span>
        </li>
        <li>
            <span class="item both">{{$base_info.student_count}} 学生</span>
            <span class="bot-line"></span>
        </li>
        <li>
            <span class="item single-l">{{$base_info.fans_num}} 粉丝</span>
        </li>
    </ul>
</div>
</div>