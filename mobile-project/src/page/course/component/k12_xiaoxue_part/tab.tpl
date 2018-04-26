{{if $tpl_data.page.has_more}}
    {{$has_more = 1}}
{{else}}
    {{$has_more = 0}}
{{/if}}

<div class="land-list">
    <div class="list-container">
        <div class="list">
            {{foreach $tpl_data.catnames as $item}}
                <p class="list-item {{if $item.catid == $tpl_data.selected.id}}on{{/if}} subject-tag line-clamp" data-url="/k12/getClassifyCourses?grade={{$grade}}&class_name={{$class_name}}&catid={{$item.catid}}&subject_name={{$item.catname}}" data-catid="{{$item.catid}}" data-subject="{{$item.catname}}">
                {{$item.catname}}
                </p>
            {{/foreach}}
            <p class="list-item-blank">    </p>
        </div>
    </div>
    <div class="course-type" data-show="0">
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a198dbead78.png">
    </div>
</div>
