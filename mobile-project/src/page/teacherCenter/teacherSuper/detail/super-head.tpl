{{$base_info = $tpl_data.base_info}}
{{$detail_info = $tpl_data.detail_info}}
<div class="head-img">
    <span class="edit-banner"></span>
    <span class="img-background">
        <img width="100%" height="100%" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569cd696ea425.png">
    </span>
    <div class="teacher-info">
        <div class="center-avatar">
            <div class="avatar">
                <img class="cover" width="100%" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src="{{$base_info.avatar}}">
                {{if $detail_info.is_recommend}}
                <div class="recommend">
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569efe88328bf.png">
                    <span>推荐</span>
                </div>
                {{/if}}

                {{if !empty($base_info.audio)}}
                <div class="teacher-audio">
                    <img class="audio-border" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569e00c1c9d38.png">
                    <img class="audio-wave" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569ee8d2bf4e1.png">
                    <span class="audio-length"></span>
                    <div audioplayer class="audio audio-player" data-url="{{$tpl_data.base_info.audio.url}}" data-length="{{$tpl_data.base_info.audio.audio_length}}">
                    </div>
                </div>
                {{/if}}
            </div>
            <div class="christmas-mark christmas-hat"></div>
            <div class="christmas-mark christmas-tree"></div>
        </div>
        {{* 老师姓名 *}}
        <p class="teacher-name">
            {{$base_info.name}}
            {{if $tpl_data.base_info.is_gold_certification == true}}
                <span class="teacher-gold">
                    <img width="auto" height="100%" src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/586d161ac6963.png">
                </span>
            {{else}}
                {{if !empty($tpl_data.base_info.org)}}
                    {{if !empty($tpl_data.base_info.org.membership_level) && $tpl_data.base_info.org.membership_level != 1}}
                        {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，为了保持统一，将机构的会员等级做了减1的处理*}}
                        {{$vip_level = $tpl_data.base_info.org.membership_level - 1}}
                    {{else }}
                        {{$vip_level = ""}}
                    {{/if}}
                {{else}}
                    {{if !empty($tpl_data.base_info.vip_level) && $tpl_data.base_info.vip_level != 0}}
                        {{$vip_level = $tpl_data.base_info.vip_level}}
                    {{else}}
                        {{$vip_level = ""}}
                    {{/if }}
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
        </p>

        {{* 简介 *}}
        <p class="short-intro">
            “{{$base_info.short_introduce}}”
        </p>

        {{* 地址 *}}
        <a href="{{if !$tpl_data.detail_info.country}}{{$detail_info.area_detail_url}}{{else}}javascript:;{{/if}}" class="address">
            <span class="address-info">
                <i class="icon icon-address"></i>
                {{$detail_info.location}}
            </span>
            {{if !$tpl_data.detail_info.country}}
            <span class="distance"></span>
            {{/if}}
            <i class="icon icon-angle-right"></i>
        </a>
    </div>
</div>