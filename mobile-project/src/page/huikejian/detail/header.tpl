{{* 头图 *}}
{{$base_info = $tpl_data.base_info}}
{{if empty($tpl_data.is_custom_template_usable)}}
<div class="head">
    <div class="banner">
        {{if $base_info.preface}}
            {{$preface = $base_info.preface}}
        {{else}}
            {{$preface = "https://imgs.genshuixue.com/0cms/d/file/content/2015/07/55a0aa5312291.jpg"}}
        {{/if}}

        {{if $base_info.logo}}
        {{$logo = $base_info.logo}}
        {{else}}
        {{$logo = "https://imgs.genshuixue.com/75733_myznirk9.jpg"}}
        {{/if}}
        <img class="banner-img" width="auto" height="auto" clip-rc="2" data-src="{{$preface}}" />

        <div class="banner-center">
            <div class="avatar">
                <div class="org-avatar">
                    {{include file='common/image/image.tpl' url=$logo width="200" height="200" class="user-avatar"}}
                </div>
            </div>
            <div class="org-name">
                <div class="name">
                    {{$base_info.name}}
                </div>
            </div>
        </div>
    </div>
</div>
{{/if}}



{{$tabs = []}}
{{$tabs[0] = ['index', '主页', '/i/']}}
{{$tabs[1] = ['course', '课程', '/i/new_course/']}}
{{* $tabs[2] = ['teacher', '老师'] *}}
{{$tabs[3] = ['news', '动态', '/i/new_black/']}}

{{* tab 切换 *}}
<div class="tab">
    <ul class="ul-tab">

        {{foreach $tabs as $tab}}
            <li data-type="{{$type}}" class="title {{if $tab@index neq 0}} distance {{/if}} {{if $tab[0] eq $type}} active {{/if}} {{if $tab@last}}last{{/if}}" data-number="{{$tab@index}}">
                {{if $tab[0] neq  $type}}
                    <a href="{{$tab[2]|cat:$tpl_data['base_info']['number']}}" target="_self">{{$tab[1]}}</a>
                {{else}}
                    {{$tab[1]}}
                {{/if}}
            </li>
        {{/foreach}}
    </ul>
</div>
