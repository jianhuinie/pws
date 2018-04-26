<div class="comment">

    <div class="content">
        {{foreach data.comment.list as $item}}
        <div class="box">
        <div class="first-content">
            <div class="avatar">
                <img src="{{$item.user_avatar}}">
            </div>

            <div class="header">
                <div class="name line-clamp">{{$item.user_name}}</div>
                <div class="type">
                    {{if $item.face_type == 1}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816e701a135c.png">
                    {{else if $item.face_type == 2}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816e7822bc2c.png">
                    {{else}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816e7016db5f.png">
                    {{/if}}
                    <span class="score_desc">{{$item.total_score_desc}}</span>
                    <span class="star" data-socre="{{$item.stars}}"></span>
                </div>
            </div>
        </div>
        <div class="second-course">
            {{$item.course}}
        </div>

        <div class="third-content">
            {{$item.info}}
        </div>

        {{if $item.photo_list && $item.photo_list.length}}
        <div class="photots">
            {{foreach $item.photo_list as $it index}}
            <img data-src="{{$it}}" class="comment-photo" data-index="{{index}}">
            {{/foreach}}
        </div>
        {{/if}}

        <div class="last-content">
            <span class="time">
            {{$item.create_time}}
            </span>
        </div>
        {{if $item.additional && $item.additional.length > 0}}
        <div class="additional">
            {{foreach $item.additional as $it index}}
            <div class="item">
                <div class="narrow"></div>
                <div class="content">
                    {{if $it.type == 1}}
                    <div class="title">学生追评:</div>
                    {{else if $it.type == 3}}
                    <div class="title">机构回复:</div>
                    {{/if}}
                    <div class="info">
                        {{$it.info}}
                    </div>
                    <div class="time">
                        {{$it.create_time}}
                    </div>
                </div>
            </div>
            {{/foreach}}
        </div>
        {{/if}}

        </div>
        {{/foreach}}
    </div>

</div>