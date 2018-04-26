{{ -- tpl:social-detail-commentImgs -- }}
<% for(var i = 0, offset = _this.start, len = _this.data.length; i < len; i++){ %>
<li class="img-wrapper" data-index="<%= i + offset %>">
    <img src="" width="80" height="60">
    <i class="icon icon-recycle-bin"></i>
</li>
<% } %>
{{ -- /tpl -- }}

{{ -- tpl:social-detail-reply -- }}
<li class="reply-item-wrapper" data-user="<%= _this.user_name %>" data-user-id="<%= _this.user_id %>" data-comment-id="<%= _this.comment_id %>">
    <div class="reply-item">
        <div class="reply-user-avatar">
            <a href="<%= _this.homepage %>" target="_blank">
                <img src="<%= _this.avatar %>@1e_30w_30h_1c_0i_1o_90Q_1x.jpeg" width="30" height="30"/>
            </a>
        </div>
        <div class="reply-content">
            <p>
                <a class="user-name" href="<%= _this.homepage %>">
                    <%= _this.user_name %>
                </a>
                <% if(_this.commented_user){ %>
                    <span class="action-label">回复</span>
                    <a class="user-name" href="<%= _this.commented_user.homepage %>" target="_blank"><%=# _this.commented_user.user_name %></a>
                <% } %>：<%=# _this.content %>
            </p>
            <div class="reply-actions">
                <span class="action reply-to-action" data-need-login="1" data-action="reply-to-action">回复</span>
                <span class="action"><%= _this.time_tip %></span>
                <% if((_this.permission && _this.permission.is_admin == '1') || (_this.user && _this.user.id == _this.user_id)){ %>
                    <span class="action delete-reply-action" data-need-login="1" data-action="delete-reply-action">
                        删除
                    </span>
                <% } %>
            </div>
        </div>
    </div>
</li>
{{ -- /tpl -- }}

{{ -- tpl:social-detail-comment -- }}
<li class="comment-item" data-post-id="<%= _this.post_id %>" data-user-id="<%= _this.user_id %>">
    <div class="user-avatar">
        <a href="<%= _this.homepage %>" target="_blank">
            <img src="<%= _this.avatar %>@1e_48w_48h_1c_0i_1o_90Q_1x.jpeg" width="48" height="48"/>
         </a>
    </div>
    <% if (!_this.comment_list) { _this.comment_list = {}; } %>
    <div class="comment-content <%= (_this.comment_list.list && _this.comment_list.list.length)  ? ' open-reply' : '' %>">
        <h4 class="comment-info">
            <a class="user-name" href="<%= _this.homepage %>" target="_blank">
                <%= _this.user_name %>
            </a>
            <% if(_this.user_role == 0){ %>
            <span class="user-label">师</span>
            <% } %>
            <span class="icon icon-level"></span>
            <span class="time-tip">发表于 <%= _this.time_tip %></span>
            <% if(_this.floor){ %>
            <span class="comment-top <%= (+_this.floor <= 3) ? ('top' + _this.floor ) : ' topx' %>">
                <% if(_this.floor > 3){ %>
                <%= ('#' + _this.floor) %>
                <% } else { %>
                <%= ['沙发', '板凳', '地板'][_this.floor-1] %>
                <% } %>
            </span>
            <% } %>
        </h4>
        <p class="comment-des"><%= _this.content %></p>
        <% if (_this.photo_list){ %>
            <div class="comment-photo-box photo-list-wrapper">
                <ul class="comment-photo-list photo-list">
                    <% for(var j = 0, max = _this.photo_list.length; j < max; j++){ %>
                    <li class="photo-item" data-image="<%= _this.photo_list[j].img %>"
                        data-horizontal="<%= _this.photo_list[j].img %>"
                        data-vertical="<%= _this.photo_list[j].img %>"
                        data-hheight="<%= _this.photo_list[j].height %>"
                        data-vheight="<%= _this.photo_list[j].height %>">
                        <img src="<%= _this.photo_list[j].img %>@1e_80w_60h_1c_0i_1o_90Q_1x" />
                    </li>
                    <% } %>
                </ul>
                <div class="comment-photo-player" style="display:none;">
                    <ul class="photo-action">
                        <li class="packup"><i class="photo-icon photo-packup"></i>收起</li>
                        <li class="sourse"><i class="photo-icon photo-sourse"></i>原图</li>
                        <li class="left"><i class="photo-icon photo-left"></i>向左转</li>
                        <li class="right"><i class="photo-icon photo-right"></i>向右转</li>
                    </ul>
                    <div class="photo-wrapper">
                        <div class="floater" style=""></div>
                        <img src="" class="rotate-img">
                    </div>
                    <div class="photo-name">
                    </div>
                </div>
            </div>
        <% } %>
        <div class="comment-actions">
            <span class="action up-action up-btn <% if(_this.is_zan == '1'){ %> uped active<% } %>" data-need-login="1" data-action="up-action">
                <i class="icon icon-thumbs-up"></i>
                <b class="num"><%= (_this.zans||0) %></b>
            </span>
            <span class="action reply-action" data-need-login="1" data-action="reply-action">回复</span>
            <% if(_this.permission && _this.permission.is_admin == 1){ %>
            <span class="action close-action" data-need-login="1" data-action="close-action">禁言</span>
            <span class="divider">|</span>
            <span class="action delete-action" data-need-login="1" data-action="delete-action">删除</span>
            <% } else if (_this.user && _this.user.id == _this.user_id){ %>
            <span class="action delete-action" data-need-login="1" data-action="delete-action">删除</span>
            <% } %>
        </div>

        <div class="reply-list-wrapper">
            <div class="reply-list">
                <ul>
                    <%
                        var tmp;
                        var list = _this.comment_list.list || [];
                        for(var i = 0, len = list.length; i < len; i++){
                            tmp = list[i];
                            tmp.user = _this.user;
                            tmp.permission = _this.permission;
                            include('social-detail-reply', tmp);
                        }
                    %>
                </ul>
                <div class="reply-form">
                    <textarea class="hide" data-init=""></textarea>
                    <div class="reply-form-actions">
                        <div class="form-hint"></div>
                        <button class="btn btn-primary btn-reply" data-need-login="1" data-action="btn-reply">回复</button>
                    </div>
                </div>
                <% if(_this.comment_list.has_more == '1'){ %>
                <span class="more-reply" data-page="1">查看更多回复</span>
                <% } %>
            </div>
        </div>
    </div>
</li>
{{ -- /tpl -- }}

{{ -- tpl:social-detail-commentList -- }}
<ul class="comment-list">
    <% var tmp; %>
    <%
        for(var i = 0, len = _this.data.length; i < len; i++){
            tmp = _this.data[i];
            tmp.permission = _this.permission;
            tmp.user = _this.loginUser;
            include('social-detail-comment', tmp);
        }
    %>
</ul>
{{ -- /tpl -- }}