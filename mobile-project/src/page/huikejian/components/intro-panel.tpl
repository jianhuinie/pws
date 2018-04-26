{{*

@file 机构链接面板
@author zhengxu
@date 2015.04.17


css: src/css/org/component/intro-panel.styl

*}}

<div class="org-intro-panel">
    <a href="{{$org.url}}" class="mask-link"></a>
    <img class="org-image" data-src="{{$org.avatar_url}}" width="60" height="60">

    <div class="context">
        <p class="org-name">
            <span class="name">{{$org.name}}</span>
            {{* vip 标识*}}
            {{if !empty($tpl_data.organization.membership_level) && $tpl_data.organization.membership_level != 1}}
                {{* 机构vip分为1、2、3、4 4个等级，分别与老师会员的0、1、2、3相对应，因此机构的会员等级做了减1的处理*}}
                {{$vip_level = $tpl_data.organization.membership_level-1}}
            {{else}}
                {{$vip_level = ""}}
            {{/if}}
            {{if !empty($vip_level)}}
             <span class="teacher-vip level{{$vip_level}}">
                {{if $vip_level == 3}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                {{else if $vip_level == 2}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                {{else}}
                 <img width="100%" height="auto" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5f02d7.png">
                {{/if}}
            </span>
            {{/if}}
        </p>

        {{if not empty($org.brief)}}
        <p>{{$org.brief}}</p>
        {{/if}}

        {{if not empty($org.tips)}}
        <p>{{$org.tips}}</p>
        {{/if}}

    </div>
    <i class="icon icon-angle-right"></i>
</div>