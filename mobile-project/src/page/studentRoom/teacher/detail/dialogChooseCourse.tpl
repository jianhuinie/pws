<div class="choose-course">
    <div class="header">
        <div class="title">
            <div class="reason">
                报名理由
            </div>
            <div class="close"></div>
        </div>
        <div class="line-clamp line-clamp-2 content">
            {{content}}
        </div>
    </div>

    <div class="container">
        <div class="title">
            选择一门课程推荐给学生（选填）
        </div>
        <div class="type-tabs">
            <div class="tab tab-selected" data-value="all">
                全部
            </div>
            <div class="tab" data-value="class">
                班课
            </div>
            <div class="tab" data-value="video">
                视频课
            </div>
            <div class="tab" data-value="oneToOne">
                一对一
            </div>
        </div>
        <div class="course-list-wrapper">
            <div class="course-list">
                {{foreach list as $item}}
                <div class="course-item" data-type="{{$item.type}}" data-number="{{$item.number}}">
                    <div class="course-name">
                        {{$item.name}}
                    </div>
                    <div class="course-price">
                        {{$item.price}}
                    </div>
                </div>
                {{/foreach}}
            </div>
        </div>
    </div>

    <div class="footer">
        <div class="button confirm" data-value="1" data-submitting="0">
            确认报名
        </div>
    </div>
</div>
