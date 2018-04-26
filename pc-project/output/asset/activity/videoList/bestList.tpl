{{ -- tpl:best-list -- }}

<div class="best-list" data-click="best-list">
    <%
        var today_data = _this.today;
        var tomorrow_data = _this.tomorrow;
        var dat_data = _this.day_after_tomorrow;
    %>
    <div class="best-content">
        <ul class="title-tabs">
            <%
            if (today_data.length > 0) {
                if (tomorrow_data.length > 0) {
                    if (dat_data.length > 0) {
            %>
                        <li class="first active width3" data-idx="0" data-click="today">今天</li>
                        <li class="width3" data-idx="1" data-click="tomorrow">明天</li>
                        <li class="last width3" data-idx="2" data-click="day-affter-tomorrow">后天</li>
            <%
                    } else {
            %>
                        <li class="first active width2" data-idx="0" data-click="today">今天</li>
                        <li class="last width2" data-idx="1" data-click="tomorrow">明天</li>
            <%
                    }
                } else {
                    if (dat_data.length > 0) {
            %>
                        <li class="first active width2" data-idx="0" data-click="today">今天</li>
                        <li class="last width2" data-idx="1" data-click="day-affter-tomorrow">后天</li>
            <%
                    } else {
            %>
                     <li class="first active width1" data-idx="0" data-click="today">今天</li>
            <%
                    }
                }
            } else {
                if (tomorrow_data.length > 0) {
                    if (dat_data.length > 0) {
            %>
                        <li class="first active  width2" data-idx="0" data-click="tomorrow">明天</li>
                        <li class="last  width2" data-idx="1" data-click="day-affter-tomorrow">后天</li>
            <%
                    } else {
            %>
                        <li class="first active width1" data-idx="0" data-click="tomorrow">明天</li>
            <%
                    }
                } else {
                    if (dat_data.length > 0) {
            %>
                        <li class="first last width1" data-idx="0" data-click="day-affter-tomorrow">后天</li>
            <%
                    }
                }
            }
            %>
        </ul>
        <div class="content-list">
            <% 
            if (today_data.length > 0) {
            %>
            <ul data-click="list-today">
                <% 
                    for (var i = 0; i < today_data.length; i++) {
                        var item = today_data[i];
                        var stime = item.begin_time * 1000;
                        var etime = item.end_time * 1000;
                        var ntime = new Date().getTime();
                %>
                <li data-sku="class|<%= today_data.number %>">
                    <a href="<%= item.link %>" target="_blank">
                        <% if (ntime >= stime && etime >= ntime) {%>
                        <p>正在直播<span class="img-live"></span></p>
                        <% } else { 
                            stime = new Date(stime);
                            var sh = stime.getHours();
                            var sm = stime.getMinutes();
                            sh = sh < 10 ? '0' + sh : sh;
                            sm = sm < 10 ? '0' + sm : sm;
                            stime = sh + ':' + sm;
                        %>
                        <p><%= stime %> 开始</p>
                        <% } %>
                        <p class="info"><%= item.name %></p>
                    </a>
                </li>
                <%
                    }
                 %>
            </ul>
            <%
            }
            %>
            <%
            if (tomorrow_data.length > 0) {
            %>
            <ul style="display: none;" data-click="list-tomorrow">
                <% 
                    for (var i = 0; i < tomorrow_data.length; i++) {
                        var item = tomorrow_data[i];
                        var stime = item.begin_time * 1000;
                        stime = new Date(stime);
                        var sh = stime.getHours();
                        var sm = stime.getMinutes();
                        sh = sh < 10 ? '0' + sh : sh;
                        sm = sm < 10 ? '0' + sm : sm;
                        stime = sh + ':' + sm;
                %>
                <li data-sku="class|<%= tomorrow_data.number %>">
                    <a href="<%= item.link %>" target="_blank">
                        <p><%= stime %> 开始</p>
                        <p class="info"><%= item.name %></p>
                    </a>
                </li>
                <%
                    }
                 %>
            </ul>
            <%
            }
            %>
            <%
            if (dat_data.length > 0) {
            %>
            <ul style="display: none;" data-click="list-datomorrow">
                <% 
                    for (var i = 0; i < dat_data.length; i++) {
                        var item = dat_data[i];
                        var stime = item.begin_time * 1000;
                        stime = new Date(stime);
                        var sh = stime.getHours();
                        var sm = stime.getMinutes();
                        sh = sh < 10 ? '0' + sh : sh;
                        sm = sm < 10 ? '0' + sm : sm;
                        stime = sh + ':' + sm;
                %>
                <li data-sku="class|<%= dat_data.number %>">
                    <a href="<%= item.link %>" target="_blank">
                        <p><%= stime %> 开始</p>
                        <p class="info"><%= item.name %></p>
                    </a>
                </li>
                <%
                    }
                 %>
            </ul>
            <%
            }
            %>
            
        </div>
    </div>
    
    <a href="#" class="get-button" data-click="get-button">收起精品课<i class="icon icon-angle-up"></i></a>
</div>

{{ -- /tpl -- }}