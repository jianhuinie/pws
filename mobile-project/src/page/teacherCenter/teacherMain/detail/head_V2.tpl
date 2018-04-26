{{* 头图 *}}
{{if !empty($tpl_data.base_info.preface)}}
{{$cover = $tpl_data.base_info.preface}}
{{else}}
{{$cover = "https://imgs.genshuixue.com/0cms/d/file/content/2015/12/566bb889136dc.jpg"}}
{{/if}}
<div class="head-img">
    <span class="edit-banner"></span>
    <span class="img-background">
        <img class="cover banner-bg" width="100%" height="100%" clip-rc="1" data-src="{{$cover}}">
    </span>
    <div class="edit-background">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a5cd86ec513.png">
    </div>
    <div class="headV2-bottom-shade">
        <div class="headV2-teacher-name">
            <span class="name">{{$tpl_data.base_info.name}}</span>
            {{if $tpl_data.base_info.is_gold_certification == true}}
                <span class="teacher-gold">
                    <img width="auto" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/586d161ac6963.png">
                </span>
            {{else}}
                <span class="teacher-sex">
                     {{if $tpl_data.base_info.sex == '1'}}
                         <img width="100%" height="auto" src="{{$static_origin}}/src/page/teacherCenter/teacherMain/image/ic_man_symbol_n.png">
                     {{else}}
                         <img width="100%" height="auto" src="{{$static_origin}}/src/page/teacherCenter/teacherMain/image/ic_woman_symbol_n.png">
                     {{/if}}

                </span>
                {{if !empty($tpl_data.base_info.org)}}
                    {{if !empty($tpl_data.base_info.org.membership_level) && $tpl_data.base_info.org.membership_level != 1}}
                    {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，为了保持统一，将机构的会员等级做了减1的处理*}}
                        {{$vip_level = $tpl_data.base_info.org.membership_level - 1}}
                    {{else }}
                        {{$vip_level = "" }}
                    {{/if }}
                {{else }}
                    {{if !empty($tpl_data.base_info.vip_level) && $tpl_data.base_info.vip_level != 0}}
                        {{$vip_level = $tpl_data.base_info.vip_level}}
                    {{else }}
                        {{$vip_level = ""}}
                    {{/if }}
                {{/if }}

                {{if !empty($vip_level)}}
                <span class="teacher-vip level{{$vip_level}}">
                    {{if $vip_level == 3}}
                     <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                    {{else if $vip_level == 2}}
                     <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                    {{else}}
                     <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                    {{/if}}
                </span>
                {{/if}}
            {{/if}}
        </div>
        <div class="headV2-other-info">
            <p class="short-intro">
                {{$tpl_data.base_info.short_introduce}}
            </p>
            <p class="age">
                {{if !empty($tpl_data.base_info.org)}}
                <a href="{{$tpl_data.base_info.org.url}}" class="org-name">
                    {{$tpl_data.base_info.org.name}}
                </a>
                {{/if}}
                {{if !empty($tpl_data.detail_info.school_age) && $tpl_data.detail_info.school_age > 0}}
                {{$age = $tpl_data.detail_info.school_age}}
                {{else}}
                {{$age = ''}}
                {{/if}}
                {{if !empty($age)}}
                <span>{{$age}}年教龄</span>
                {{/if}}
                {{if !empty($tpl_data.detail_info.certs)}}
                <span>{{$tpl_data.detail_info.certs[0]}}</span>
                {{/if}}
            </p>
        </div>
        <div class="audio-show">
            {{if !empty($tpl_data.base_info.audio)}}
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5674c1cb535ec.png">
            <span class="audio-length"></span>
            <div class="audio audio-player" data-url="{{$tpl_data.base_info.audio.url}}" data-length="{{$tpl_data.base_info.audio.audio_length}}">
            </div>
            {{/if}}
        </div>
    </div>
</div>
<div class="V2-item-list">
    <div class="V2-item-flex">
        {{if $tpl_data.base_info.great_rate == 0 && $tpl_data.comment.total == 0}}
        {{$has_comment = false}}
        {{else}}
        {{$has_comment = true}}
        {{/if}}
        {{if $has_comment}}
        <p class="figure">{{$tpl_data.base_info.great_rate * 100|cat:'%'}}</p>
        <p class="explain">好评</p>
        {{else}}
        <p class="headV2-no-comment">暂无评价</p>
        {{/if}}
    </div>
    <div class="line"></div>
    <div class="V2-item-flex">
        <p class="figure">{{$tpl_data.base_info.student_count}}</p>
        <p class="explain">学生</p>

    </div>
    <div class="line"></div>
    <div class="V2-item-flex">
        <p class="figure">{{$tpl_data.base_info.fans_num}}</p>
        <p class="explain">粉丝</p>
    </div>
</div>