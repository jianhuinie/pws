{{if !empty($tpl_data.additional.comment_tags)}}
    <ul class="comments-filter">
        {{foreach $tpl_data.additional.comment_tags as $tags}}
            <li data-type="{{$tags.value}}"
                class="comment-tag {{if $tags@index == 0}}active{{/if}}">
                {{$tags.name}}{{if !($tags.value === "all" ||
                    $tags.value === "classify_3002" ||
                    $tags.value === "classify_3004" ||
                    $tags.value === "classify_3003")
                    }}{{$tags.count}}{{/if}}
            </li>
        {{/foreach}}
    </ul>
{{/if}}
<div class="comment-panel">
    {{include file="page/comment/commentDetail/component/comment-pannel.tpl" comment_list = $tpl_data.comment_list}}
</div>