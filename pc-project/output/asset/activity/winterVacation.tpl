{{ -- tpl:teacher-list -- }}
    <%
        var teacherId = _this.teacherId;
        var data = _this.data;
        if (teacherId) {
            var idx = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].tid == teacherId) {
                    idx = i;
                    break;
                }
            }
            var tdata = data.splice(idx, 1);
            data.unshift(tdata[0]);
        }
        $.each(data, function(idx, obj) {
    %>

            <div class="teacher-box">
                <div class="teacher-content">
                    <div class="title"><a href="<%= obj.curl %>" target="_blank"><%= obj.title %></a></div>
                    <div>
                        <div class="detail-info">
                            <div class="photo">
                                <a href="/<%= obj.tid %>" target="_blank"><img src="<%= obj.photo %>" width="130"></a>
                                <%
                                if (obj.video_url) {
                                %>
                                <span class="icon icon-play-o video" data-view="<%= obj.video_url %>" data-title="<%= obj.title %>"></span>
                                <%
                                }
                                %>
                                
                            </div>
                            <div class="detail">
                                <div class="name"><a href="/<%= obj.tid %>" target="_blank"><%= obj.name %></a></div>
                                <div class="intro">
                                    <a href="<%= obj.curl %>" target="_blank"><%= obj.des %></a>
                                </div>
                            </div>
                        </div>
                        <div class="price">
                            <div class="price-info">
                                <span class="price-no"><%= obj.pre_price %></span>
                                <%= obj.price %>
                            </div>
                            <div class="buttons">
                                <a href="https://eco-api.meiqia.com/dist/standalone.html?eid=3781" target="_blank">
                                    <div class="course button">了解课程</div>
                                </a>
                                <a class="buy button" href="<%= obj.curl %>" target="_blank">立即抢购</a>
                            </div>
                        </div>
                        <div class="corner"></div>

                    </div>
                </div>
            </div>
    <%
        });
    %>
{{ -- /tpl -- }}