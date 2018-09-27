{{ -- tpl:social-group-postList -- }}
<% var tmp; var data = _this.data; %>
<% if(data.length > 0){ %>
    <ul class="post-items">
        <% for(var i = 0, len = data.length; i < len; i++){ tmp = data[i]; %>
        <li class="post-item" data-id="<%= tmp.thread_id %>" data-user-id="<%= tmp.user_id %>">
            <div class="post-num-wrapper <% if(tmp.is_new == '1'){ %>new-post <% } else if(tmp.is_good == '1'){ %>good-post<% } %>">
                <div class="post-comment-num">
                    <% if(tmp.is_new == '1'){ %>
                        新贴
                    <% } else { %>
                        <%= tmp.posts == '0' ? '评论' : tmp.posts %>
                    <% } %>
                </div>
            </div>
            <div class="post-content">
                <div class="post-header">
                    <a class="ellipsis" href="<%= tmp.link %>" target="_blank">
                        <%=# tmp.name %>
                    </a>
                    <span class="label-fine" <% if(tmp.is_good == '1'){ %> style="display:inline-block;"<% } %>>精</span>
                    <span class="label-top" <% if(tmp.is_top == '1'){ %> style="display:inline-block;"<% } %>>置顶</span>
                    <% if(_this.isAdmin == '1'){ %>
                    <span class="action-holder">
                        管理<i class="icon icon-caret-down"></i>
                        <div class="action-list-wrapper">
                            <ul class="action-list">
                                <li class="set-top" data-status="<% if(tmp.is_top == '1'){ %>1<% } else { %>0<% } %>">
                                    <% if(tmp.is_top == '1'){ %>取消置顶 <% } else { %> 置顶 <% } %>
                                </li>
                                <li class="set-good" data-status="<% if(tmp.is_good == '1'){ %>1<% } else { %>0<% } %>">
                                    <% if(tmp.is_good == '1'){ %>取消加精 <% } else { %> 设为精华 <% } %>
                                </li>
                                <li class="delete">
                                    删除
                                </li>
                                <% if(tmp.is_baned == '0'){ %>
                                <li class="set-ban">禁言</li>
                                <% }else{ %>
                                <li class="baned">已禁言</li>
                                <% } %>
                            </ul>
                        </div>
                    </span>
                    <% } %>
                </div>

                <div class="post-abstract">
                    <% if(tmp.summary){ %>
                    <div class="post-abstract-wrapper">
                        <a class="post-abstract-intro ellipsis" href="<%= tmp.link %>" target="_blank">
                            <%=# tmp.summary %>
                        </a>
                    </div>
                    <% } %>
                    <% if(tmp.photo_list && tmp.photo_list.length > 0){ %>
                    <ul class="post-img-list">
                        <% for(var j = 0, l = tmp.photo_list.length; j < l && j < 4; j++){ %>
                            <li>
                                <a href="<%= tmp.link %>" target="_blank">
                                    <img src="<%= tmp.photo_list[j].img %>@1e_140w_80h_1c_0i_1o_90Q_1x" width="140px" height="80px"/>
                                </a>
                            </li>
                        <% } %>
                    </ul>
                    <% } %>
                </div>

                <div class="post-info">
                    <a class="user-link" href="<%= tmp.homepage %>" target="_blank">
                        <%=# tmp.user_name %>
                    </a>
                    <span><%= tmp.time_tip %></span>
                    <span class="right"><i class="icon icon-thumbs-up"></i>
                        <%= tmp.zans == '0' ? '赞' : tmp.zans %></span>
                </div>
            </div>
        </li>
        <% } %>
    </ul>
<% } else { %>
   <div class="no-data">
        <i class="icon icon-info-circle"></i>暂无数据
    </div>
<% } %>
{{ -- /tpl -- }}