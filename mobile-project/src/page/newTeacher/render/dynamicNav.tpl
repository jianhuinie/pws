<div class="dynamic-child-tab clearfix" data-type="{{index}}">
    {{if params.hasWenda}}
        <div class="item{{if index == 'wenda'}} on{{/if}}" data-type="wenda" data-url="/wenda/teacherAnswer">问答</div>
    {{/if}}

    {{if params.hasArticle}}
        <div class="item{{if index == 'article'}} on{{/if}}" data-type="article" data-url="/teacher/article">文章</div>
    {{/if}}

    {{if params.hasPhoto}}
        <div class="item{{if index == 'photo'}} on{{/if}}" data-type="photo" data-url="/teacher/photos_ajax">相册</div>
    {{/if}}

    {{if params.hasVideo}}
        <div class="item{{if index == 'video'}} on{{/if}}" data-type="video" data-url="/teacher/videos_ajax">视频</div>
    {{/if}}
</div>