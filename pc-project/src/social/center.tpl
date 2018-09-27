{{ -- tpl:social-center-post -- }}
<div class="my-post">
    <% if (_this.data.length > 0){ %>
    <ul>
        <% var tmp; %>
        <% for (var i = 0, len = _this.data.length; i < len; i++){ tmp = _this.data[i]; %>
        <li class="post-item" data-post-id="<%= tmp.id %>">
            <a class="post-title ellipsis" href="<%= tmp.post_info_url %>" target="_blank">
                <%=# tmp.title %>
            </a>
            <a class="post-group" href="<%= tmp.group_info_url %>" target="_blank">
                <%=# tmp.group_name %>
            </a>
            <span class="post-time"><%= tmp.create_time %></span>
            <span class="action delete-action">删除</span>
            <span class="action edit-action">编辑</span>
        </li>
        <% } %>
    </ul>
    <% } else { %>
        <div class="no-data">
            <i class="icon icon-info-circle"></i>暂无数据
        </div>
    <% } %>
</div>
{{ -- /tpl -- }}

{{ -- tpl:social-center-favor -- }}
<div class="my-favor">
    <% if (_this.data.length > 0){ %>
    <ul>
        <% var tmp; %>
        <% for (var i = 0, len = _this.data.length; i < len; i++){ tmp = _this.data[i]; %>
        <li class="post-item" data-thread-id="<%= tmp.id %>">
            <a class="post-title ellipsis" href="<%= tmp.post_info_url %>" target="_blank">
                <%=# tmp.title %>
            </a>
            <a class="post-group" href="<%= tmp.group_info_url %>" target="_blank">
                <%=# tmp.group_name %>
            </a>
            <span class="divider"></span>
            <a class="post-author" href="<%= tmp.user_homepage_url %>" target="_blank">
                <%=# tmp.author_name %>
            </a>
            <span class="action delete-action">取消收藏</span>
        </li>
        <% } %>
    </ul>
    <% } else { %>
        <div class="no-data">
            <i class="icon icon-info-circle"></i>暂无数据
        </div>
    <% } %>
</div>
{{ -- /tpl -- }}

{{ -- tpl:social-center-group -- }}
<div class="group">
    <% if (_this.data.length > 0){ %>
    <div class="group-list-wrapper">
        <ul class="group-list">
            <% var tmp; %>
            <% for (var i = 0, len = _this.data.length; i < len; i++){ tmp = _this.data[i]; %>
            <li class="group-item" data-id="<%= tmp.id %>">
                <div class="group-avatar">
                    <a class="img-wrapper" href="<%= tmp.group_info_url %>" target="_blank">
                        <img src="<%= tmp.avatar %>@1e_70w_70h_1c_0i_1o_90Q_1x" width="70px" height="70px"/>
                    </a>
                </div>
                <div class="group-info">
                    <div class="group-title">
                        <a href="<%= tmp.group_info_url %>" target="_blank"><%=# tmp.name %></a>
                        <span class="group-btn cancel-btn">退出</span>
                    </div>
                    <p class="group-des">
                        <%=# tmp.brief %>
                    </p>
                </div>
            </li>
            <% } %>
        </ul>
    </div>
    <% } else { %>
        <div class="no-data">
            <i class="icon icon-info-circle"></i>暂无数据
        </div>
    <% } %>
</div>
{{ -- /tpl -- }}