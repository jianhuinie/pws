{{$photo_list = $tpl_data.photo.list}}
{{$base_info = $tpl_data.base_info}}
{{$tags = $tpl_data.base_info.tags}}
{{$more_url = $tpl_data.photo.more_url}}
{{$evaluation_list = $tpl_data.comment.list}}
{{$evaluation_num = count($tpl_data.comment.list)}}
{{$position_num = $tpl_data.area.count}}
{{$more_comment = $tpl_data.comment.more_url}}
{{$org_type = $tpl_data.base_info.org_type}}

{{if $tpl_data.photo.total != 0}}
<div class="org-photo">
    <h3>相册 <span class="video-num">{{$tpl_data.photo.total_videos}}个视频</span><span class="photo-num"> {{$tpl_data.photo.total_photos}}张照片</span>
    </h3>

    <div class="img-bars">
        <div class="img-bars-wrapper">
            <div class="img-bars-content">
                {{foreach name=photo_list item=photo from=$photo_list}}
                <span>
                    {{if $photo.type eq 'photo'}}
                    <img  class="photo-video" width="auto" height="auto" clip-rc="1" data-src="{{$photo.img}}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7"/>
                    {{elseif $photo.type eq 'video'}}
                    <a href="{{$photo.url}}">
                        <img  class="photo-video" width="auto" height="auto" clip-rc="1" data-src="{{$photo.img}}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7"/>
                        <img class="video-img" src="/src/page/huikejian/img/detail_video.png">
                    </a>
                    {{/if}}
                </span>
                {{/foreach}}
            </div>
        </div>
    </div>
    {{if !empty($more_url)}}
    <div class="more-photo" data-url="{{$more_url}}">
        <div class="total">全部视频/照片<i class="icon icon-angle-right"></i></div>
    </div>
    {{/if}}
</div>
{{/if}}
<div class="org-intro">
    <h3>机构简介</h3>

    <div class="org-intro-position">
        <h3>
            <span class="gray-font">位置：</span>

            <div class="slide-down pos-short">{{$base_info.address}}</div>
        </h3>
    </div>
    <div class="org-intro-cer">
        <h3>
            <span class="gray-font">资质：</span>

            <div><i class="icon icon-check-o-org"></i></div>
            <div class="pos">{{$org_type.name}}({{$org_type.certify|cat:'认证'}})</div>
        </h3>
    </div>
    {{if (not empty($tags)) and ($tags|count gt 0)}}
    <div class="org-intro-feature">
        <h3>
            <span class="gray-font">特点：</span>

            <div class="content">
                {{foreach name=tags item=tag from=$tags}}
                <span class="course">{{$tag.name}}</span>
                {{/foreach}}
            </div>
            <div class="slide-down">
                {{foreach name=tags item=tag from=$tags}}
                <span class="course">{{$tag.name}}</span>
                {{/foreach}}
            </div>
            <i class="icon icon-angle-down"></i>
        </h3>

    </div>
    {{/if}}
    <div class="org-intro-detail">
        <span class="gray-font">简介：</span>

        <p class="content">{{$base_info.brief}}</p>

        <p class="slide-down">{{$base_info.brief}}</p>
        <i class="icon icon-angle-down"></i>
    </div>
</div>

{{if $position_num != 0}}
<div class="org-school">
    <h3>校区 <span class="school-num">{{$position_num}}个</span><a href="{{$tpl_data.area.more_url}}"></a></h3>
    <i class="icon icon-angle-right"></i>

    <div class="org-map course-address">
        <img src=""/>
    </div>
</div>
{{/if}}

{{if !empty($tpl_data.comment.list)}}

{{$commentTypeIcons = ["", "icon-smile-o", "icon-neutral-o", "icon-frown-o"]}}
{{$commentTypeTexts = ["", "好评", "中评", "差评"]}}

<div class="org-evaluation">
    <h3>课程评价 <span class="evaluation-num">共{{$tpl_data.base_info.total_comments}}条评价</span></h3>
    {{foreach name=comment_list item=comment from=$evaluation_list}}
    <div class="eva-detail">
        {{if isset($comment.number) && !empty($comment.number)}}
        <a href="/x/{{$comment.number}}">
            <div class="eva-img">
                {{include file='common/image/image.tpl' url={{$comment.user_avatar}} width="120" height="120"}}
            </div>
        </a>
        {{else}}
        <div class="eva-img">
            {{include file='common/image/image.tpl' url={{$comment.user_avatar}} width="120" height="120"}}
        </div>
        {{/if}}

        <div class="eva-user">
            <p>{{$comment.user_name}}</p>

            <div>
                <i class="icon {{$commentTypeIcons[$comment.face_type]}} face-type"></i>
                <em>{{$commentTypeTexts[$comment.face_type]}}</em>

                {{include file="common/starScore/starScore.tpl" score=$comment.stars}}
            </div>
        </div>
        <p>{{$comment.info}}</p>
    </div>
    {{/foreach}}
    {{if !empty($more_comment)}}
    <div class="more-eva">
        <a href="{{$more_comment}}"></a>

        <div>全部评价<i class="icon icon-angle-right"></i></div>
    </div>
    {{/if}}
</div>
{{/if}}
