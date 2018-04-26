{{$interactive_clickable = data.interactive_clickable}}
{{$interactive_unclickable = data.interactive_unclickable}}
{{if $interactive_clickable}}
<div 
    class="can-click hide"
    data-subtype="{{$interactive_clickable.list[0].sub_type}}"
    {{if $interactive_clickable.list[0].sub_type != 6}}
        data-tNumber="{{$data.teacherNumber}}" 
        {{if $interactive_clickable.list[0].sub_type == 2}}
            data-vNumber="{{$interactive_clickable.list[0].number}}"
        {{/if}}
    {{/if}}
    {{if $interactive_clickable.list[0].number}}
        data-courseNumber="{{$interactive_clickable.list[0].number}}"
    {{/if}}
>
    <div class="inter-container">
        <div class="inter-div">
            <img class="inter-div-img" data-src="{{$interactive_clickable.list[0].icon}}">
            <img data-src="{{if $interactive_clickable.list[0].sub_type == 1 || $interactive_clickable.list[0].sub_type == 5}}https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583ced3c3e8b8.gif{{else}}https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583ced3cb7eb5.png{{/if}}" class="icon hide">
            {{if $interactive_clickable.list[0].sub_type == 4}}
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d396d6104f.png" class="icon hide">
            {{/if}}
            <div class="inter-mask"></div>
            {{if $interactive_clickable.list[0].sub_type != 4}}
            <div data-href="{{$interactive_clickable.list[0].url}}" class="inter-a"></div>
            {{/if}}
        </div>
    </div>
    <div class="inter-info">
        {{if $interactive_clickable.list[0].sub_type != 4}}
        <div data-href="{{$interactive_clickable.list[0].url}}" class="inter-info-a single-line" data-point="{{if $interactive_clickable.list[0].sub_type == 1 || $interactive_clickable.list[0].sub_type == 5}}m_teacher_live{{else if $interactive_clickable.list[0].sub_type == 2}}m_teacher_videocourse{{else if $interactive_clickable.list[0].sub_type == 3}}m_teacher_foretell{{else if $interactive_clickable.list[0].sub_type == 6}}CoursePage_WeixinActivity_open{{/if}}">
            <span class="inter-text">{{$interactive_clickable.list[0].text}}</span>
        </div>
        {{else}}
        <span class="inter-text inter-audio single-line" data-url="{{$interactive_clickable.list[0].url}}">{{$interactive_clickable.list[0].text}}</span>
        {{/if}}
        <img class="close" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583ced3c6df05.png">
    </div>
</div>
{{/if}}
{{if $interactive_unclickable}}
<div class="no-click">
    <ul class="inter-ul hide">
        {{foreach $interactive_unclickable.list as $info}}
        <li class="inter-li single-line">
            <img class="inter-img" data-src="{{$info.icon}}">
            <span class="inter-msg">{{$info.text}}</span>
        </li>
        {{/foreach}}
    </ul>
</div>
{{/if}}