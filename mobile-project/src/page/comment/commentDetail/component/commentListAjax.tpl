{{if isset($tpl_data.comment_list)}}
    {{foreach $tpl_data.comment_list as $ul}}

        {{include file="./commentList.tpl" list=$ul index=$ul@index page_module=main}}

        {{if $ul.can_open}}
            <ul class="other-comment-list" {{if !empty($ul.user_id)}}data-user_num="{{$ul.user_id}}"{{/if}} style="display: none">
                {{foreach $ul.other_comment as $cl}}
                    {{if $cl@index >= 0 && $cl@index <= 4}}
                        {{include file="./commentList.tpl" list=$cl uIndex=$ul@index index=$cl@index page_module=other}}
                    {{/if}}
                {{/foreach}}
            </ul>
            <div class="user-more-comment" {{if !empty($ul.user_id)}}data-user_num="{{$ul.user_id}}"{{/if}} data-comment_num="{{$ul.other_comment|count}}">
                查看该用户其他{{$ul.other_comment|count}}条评价
            </div>
        {{/if}}
    {{/foreach}}
{{/if}}

{{if isset($tpl_data.related_comment_list)}}
    {{foreach $tpl_data.related_comment_list as $ul}}

        {{include file="./commentList.tpl" list=$ul index=$ul@index page_module=main}}

        {{if $ul.can_open}}
            <ul class="other-comment-list" {{if !empty($ul.user_id)}}data-user_num="{{$ul.user_id}}"{{/if}} style="display: none">
                {{foreach $ul.other_comment as $cl}}
                    {{if $cl@index >= 0 && $cl@index <= 4}}
                        {{include file="./commentList.tpl" list=$cl uIndex=$ul@index index=$cl@index page_module=other}}
                    {{/if}}
                {{/foreach}}
            </ul>
            <div class="user-more-comment" {{if !empty($ul.user_id)}}data-user_num="{{$ul.user_id}}"{{/if}} data-comment_num="{{$ul.other_comment|count}}">
                查看该用户其他{{$ul.other_comment|count}}条评价
            </div>
        {{/if}}
    {{/foreach}}
{{/if}}