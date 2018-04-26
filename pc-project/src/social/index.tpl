{{ -- tpl:social-index-post -- }}
 <ul class="post-list">
    <% var data = _this.data; var tmp; %>
    <% for(var i = 0, len = _this.data.length; i < len; i++){ tmp = data[i]; %>
    <li class="post-item <% if(tmp.img){ %> with-cover<% } %>">
        <h4 class="post-item-title ellipsis">
            <a href="<%= tmp.post_info_url %>" target="_blank"><%=# tmp.title %></a>
        </h4>
        <p class="post-item-content">
            <a href="<%= tmp.post_info_url %>" target="_blank"><%=# tmp.brief %></a>
        </p>
        <div class="post-item-action">
             <a href="<%= tmp.user_homepage_url %>" target="_blank">
                <%=# tmp.author %>
            </a>
            <span class="divider"></span>
            <a href="<%= tmp.group_info_url %>" target="_blank">
                <%=# tmp.group_name %>
            </a>
            <span class="post-time"><%= tmp.create_time %></span>
            <span class="action"><i class="icon icon-thumbs-up"></i><%= tmp.zan_num %></span>
            <span class="action"><i class="icon icon-message"></i><%= tmp.reply_num %></span>
        </div>
        <% if(tmp.img){ %>
        <a class="cover" href="<%= tmp.post_info_url %>" target="_blank">
            <img src="<%= tmp.img %>@1e_175w_100h_1c_0i_1o_90Q_1x" width="175px" height="100px">
        </a>
        <% } %>
    </li>
    <% } %>
</ul>
{{ -- /tpl -- }}