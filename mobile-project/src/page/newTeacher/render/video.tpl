<div class="dynamic-child-box" data-type="video">
    {{foreach videoList as $item}}
        <div class="video-item clickRevers" data-url="{{$item.url}}" data-stype="m_teacher_video">
            <div class="first-nav">
                <img class="avatar" data-src="{{basicInfo.avatar}}">
                <div class="name line-clamp">{{basicInfo.name}}</div>
                <div class="text">发布了视频</div>
            </div>

            <div class="video-preface">
                <div class="preface">
                    <img class="cover" data-src="{{$item.img}}">
                </div>
                <img class="play-icon" src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57a03363b7f51.png">
            </div>

            <div class="time">
                {{$item.create_time}}
            </div>
        </div>
    {{/foreach}}
</div>