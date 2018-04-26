{{ -- tpl:reject-reson -- }}
    <div class="dialog-content">
        <% 
            var basic = _this.basic;
            var photo = _this.photo;
            var introduction = _this.introduction;
            var schedule = _this.schedule;
        %>
            <ul class="info-con">
        <%
            if (! (basic instanceof Array)) {
        %>
                <li>课程信息：</li>
                <%
                    $.each(basic, function(key, value) {
                %>
                <li class="reason"><%= value %></li>
                <%
                    });
                %>
            
        <%
            }
            if (! (photo instanceof Array)) {
        %>
                <li>课程照片：</li>
                <%
                    $.each(photo, function(key, value) {
                %>
                <li class="reason"><%= value %></li>
                <%
                    });
                %>
        <%
            }
            if (! (introduction instanceof Array)) {
        %>
                <li>课程简介：</li>
                <%
                    $.each(introduction, function(key, value) {
                %>
                <li class="reason"><%= value %></li>
                <%
                    });
                %>
        <%
            }
            if (! (schedule instanceof Array)) {
        %>
                <li>教学计划：</li>
                <%
                    $.each(schedule, function(key, value) {
                %>
                <li class="reason"><%= value %></li>
                <%
                    });
                %>
        <%
            }
        %>
            </ul>

    </div>
    <div class="dialog-action">
        <button class="btn btn-primary btn-confirm">
            我知道了
        </button>
    </div>
{{ -- /tpl -- }}