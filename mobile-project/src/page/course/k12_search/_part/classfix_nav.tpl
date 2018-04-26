{{$is_gaozhong=true}}
{{if $grade=='chuzhong' || $grade=='xiaoxue'}}
    {{$is_gaozhong=false}}
{{/if}}

{{$area="bj"}}
{{if isset($ext_data.curr_city) && !empty($ext_data.curr_city.domain)}}
    {{$area = $ext_data.curr_city.domain}}
{{/if}}

{{if $grade!='xiaoxue'}}
{{$classfix_nav=[[
    "name"=>"语文",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732f54141c22.png",
    "url"=>"/{{$area}}/st-{{$grade_value}}语文---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=teacher_search&q={{$grade_value}}语文{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"数学",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732f65299fa8.png",
    "url"=>"/{{$area}}/st-{{$grade_value}}数学---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=teacher_search&q={{$grade_value}}数学{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"英语",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732f8945738f.png",
    "url"=>"/{{$area}}/st-{{$grade_value}}英语---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=teacher_search&q={{$grade_value}}英语{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"物理",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732f90757884.png",
    "url"=>"/{{$area}}/st-{{$grade_value}}物理---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=teacher_search&q={{$grade_value}}物理{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"化学",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732f93146e3d.png",
    "url"=>"/{{$area}}/st-{{$grade_value}}化学---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=teacher_search&q={{$grade_value}}化学{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"优选名师",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732f9a13879c.png",
    "url"=>"/k12/choseBetterTeacher?grade={{$grade}}&catname=all{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"知识视频库",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732fa5b0475e.png",
    "url"=>"/video_course/store_house{{if $grade=='chuzhong'}}?condition=-2048-0-2054{{/if}}"
],
[
    "name"=>"真题视频库",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732fa990fe0e.png",
    "url"=>"/video_course/zhenti{{if $grade=='chuzhong'}}?condition=-2743-0-2901{{/if}}"
],
[
    "name"=>"学习社区",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732fab422ec9.png",
    "url"=>"{{if $grade=='gaozhong'}}/forum/threadBrowse?forum_group_id=14{{else}}/forum/threadBrowse?forum_group_id=13{{/if}}",
    "jockey"=>"a=sns_toThreadBrowse&group_id={{if $is_gaozhong}}14{{else}}13{{/if}}"
]
]}}

{{if $is_gaozhong==true}}
    {{$classfix_nav[9]["name"]="高考志愿"}}
    {{$classfix_nav[9]["img"]="https://imgs.genshuixue.com/0cms/d/file/content/2016/06/574e54ff24e33.png"}}
    {{$classfix_nav[9]["url"]="/gaokao?source=searchbottom&page_type=k12_choicecollege"}}
{{else}}
    {{$classfix_nav[9]["name"]="名师答疑"}}
    {{$classfix_nav[9]["img"]="https://imgs.genshuixue.com/0cms/d/file/content/2016/05/5732fad395848.png"}}
    {{$classfix_nav[9]["url"]="/wenda/home"}}
    {{*$classfix_nav[9]["jockey"]="a=ask_question"*}}
{{/if}}

{{else}}

{{$classfix_nav=[
[
    "name"=>"数学",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd34ab3d.png",
    "url"=>"/{{$area}}/sc-{{$grade_value}}数学---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q={{$grade_value}}数学{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"英语",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd32a1d9.png",
    "url"=>"/{{$area}}/sc-{{$grade_value}}英语---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q={{$grade_value}}英语{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"语文",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd2cbfab.png",
    "url"=>"/{{$area}}/sc-{{$grade_value}}语文---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q={{$grade_value}}语文{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"思维训练",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/08/579ee9deb0300.png",
    "url"=>"/{{$area}}/sc-思维训练---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q=思维训练{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"家庭教育",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd40853e.png",
    "url"=>"/{{$area}}/sc-家庭教育---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q=家庭教育{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"绘画",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd3835af.png",
    "url"=>"/{{$area}}/sc-绘画---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q=绘画{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"乐器",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd369647.png",
    "url"=>"/{{$area}}/sc-器乐---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q=器乐{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"舞蹈",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd308780.png",
    "url"=>"/{{$area}}/sc-舞蹈---.html{{if $isShare}}?s=share{{/if}}",
    "jockey"=>"a=course_search&q=舞蹈{{if $isShare}}&s=share{{/if}}"
],
[
    "name"=>"知识视频库",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd47d225.png",
    "url"=>"/video_course/store_house?condition=-2048-0-3415"
],
[
    "name"=>"名师答疑",
    "img"=>"https://imgs.genshuixue.com/0cms/d/file/content/2016/07/57982dd3aa502.png",
    "url"=>"/wenda/home"
]
]}}


{{/if}}

<ul class="class-list clearfix bottom">
    {{foreach $classfix_nav as $item}}
        <li class="item">
            <a class="logClick" data-ctype="{{$item@index+1}}" data-cname="k12_category" href="{{$item.url}}" {{if isset($item.jockey)}}data-jockey='urlSchemeRoute|{"url":"bjhlstudent://o.c?{{$item.jockey}}"}'{{/if}}>
                <div class="img">
                    <img data-src="{{$item.img}}"/>
                </div>
                <div class="text">{{$item.name}}</div>
            </a>
        </li>
    {{/foreach}}
</ul>