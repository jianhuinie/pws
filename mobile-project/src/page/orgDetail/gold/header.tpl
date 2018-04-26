{{$base_info = $tpl_data.base_info}}
<div class="gold-borad">
    <div class="board-top" {{if !$ext_data.is_app}}style="padding-right: 10px"{{/if}}>
        <img class="avatar" data-src="{{$base_info.logo}}">
        <div class="top-content">
            <div class="org-name line-clamp">{{$base_info.name}}</div>
            <div class="gold-cert">
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/585a180bcdde2.png">
                <span class="gold-name">金牌认证</span>
            </div>

            {{if $ext_data.is_app}}
                <div class="focus" data-flag="{{$tpl_data.is_focused}}"
                {{if $tpl_data.is_focused!=0}}
                    style="background: #9d9d9e; color: white;"
                {{/if}}>
                    {{if $tpl_data.is_focused == 0}}
                        关注
                    {{else}}
                        已关注
                    {{/if}}
                </div>
            {{/if}}
            </div>
    </div>
    <div class="border-bottom hide">
        <div class="bottom-text">
            <span class="text">
                评价 {{$base_info.total_comments}}
            </span>
        </div>
        <span class="line"></span>

        <div class="bottom-text">
            <span class="text student-number">

            </span>
        </div>
        <span class="line"></span>

        <div class="bottom-text">
            <span class="text">
                浏览 {{$base_info.total_views}}
            </span>
        </div>

        <span class="line"></span>

        <div class="bottom-text">
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/585a1b980a5a2.png">
            <span class="text">
                {{$base_info.location}}
            </span>
        </div>
    </div>
</div>