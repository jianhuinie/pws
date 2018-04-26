<a href="{{info.detail_url}}">
    <div class="teacher-info">
        <div class="avatar">
            <img src="{{info.avatar}}" alt="" />
        </div>
        <div class="details">
            <p class="name">
                <span>{{info.name}}</span>
                {{if info.vip_level == '3'}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                {{else if info.vip_level == '2'}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                {{else if info.vip_level == '1'}}
                    <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                {{/if}}
            </p>
            <p class="info">
                <span>学生{{info.student_count}}人</span><span>授课{{info.teacher_hours}}小时</span><span>{{info.great_score_rate * 100}}%好评</span><img src="/src/page/invite/target/img/Rectangle_217.png" class="arrow" alt="" />
            </p>
            <p class="introduce">
                {{info.short_introduce}}
            </p>
        </div>
    </div>
</a>
