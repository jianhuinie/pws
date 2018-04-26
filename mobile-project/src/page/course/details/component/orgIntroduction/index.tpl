{{*机构介绍*}}
<div class="org-intro">
    <div class="title">机构介绍</div>
    <div class="base-info">
        <a href="{{$orgInfo.home_url}}">
            <img class="avatar" src="{{$orgInfo.photo_url}}" alt="" />
            <div class="name">
                {{$orgInfo.name}}
                {{if $orgInfo.is_authentication}}
                    <!-- <img class="vip" src="/src/page/course/details/component/img/vip.png" alt="" /> -->
                {{/if}}
            </div>
            <div class="short-intro">
                {{$orgInfo.short_intro}}
            </div>
        </a>
    </div>
    <div class="proportion-info">
        <div class="info">
            <a href="{{$orgInfo.home_url}}?source=course">
                <div class="number">
                    {{$orgInfo.course_count}}
                </div>
                <div class="item">
                    课程
                </div>
            </a>
        </div>
        <div class="clap-board"></div>
        <div class="info">
            <div class="number">
                {{$orgInfo.student_count}}
            </div>
            <div class="item">
                学生
            </div>
        </div>
        <div class="clap-board"></div>
        <div class="info">
            <a href="{{$orgInfo.home_url}}?source=comment">
                <div class="number">
                    {{$orgInfo.comment_rate}}
                </div>
                <div class="item">
                    好评率
                </div>
            </a>
        </div>
    </div>
    <div class="operation">
        <div class="btn" onclick="(function(){$('.consult-box').click();})()">
            立即咨询
        </div>
        <a href="{{$orgInfo.home_url}}">
            <div class="btn last">
                查看主页
            </div>
        </a>
    </div>
</div>
