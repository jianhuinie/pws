<div class="contact-teacher">
    <div class="title-container">
        <span class="title">联系老师</span>
        <i class="icon-close"></i>
    </div>
    {{each teacherItem as item}}
        <div class="contact-item">
            <div class="avator">
                <img src="{{item.avatar_url}}">
            </div>
            <div class="information">
                <div class="profile">
                    <div class="name">{{item.display_name}}</div>
                    <div class="vip">
                        {{if item.vip_level == 3}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5d1676.png">
                        {{else if item.vip_level == 2}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5690b6c5aef77.png">
                        {{else if item.vip_level == 1}}
                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/02/56d3b6e867bb9.png">
                        {{/if}}
                    </div>
                </div>
                <div class="score">
                    <div class="star">{{item.comment_summary.avg}}分</div>
                    <div class="comment">{{item.comment_summary.count}}评价</div>
                </div>
            </div>
            <div class="icon phone" data-number="{{item.number}}" data-selfMobile="{{mobile}}"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/588085b4cf214.png"></div>
            <div class="icon im-chat" data-number="{{item.number}}"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2017/01/588085c8ee1f4.png"></div>
        </div>
    {{/each}}
</div>