{{ -- tpl:ad-slider -- }}
<ul class="promotion-slider">
    <% for (var i = 0; i < _this.length; i++) {
        var data = _this[i];
    %>
    <li class="promotion-slideritem" data-index="<%= i %>">
        <a href="<%= data.click %>" target="_blank" title="<%= data.hover %>" data-click-monitor="<%= data.clickMonitor %>">
            <img src="<%= data.material %>" width="1190" height="390"  alt="<%= data.hover %>">
        </a>
        <div class="mask"></div>
    </li>
    <% } %>
</ul>

<% if (_this.length > 1) {
%>
<ul class="promotion-slider-nav">
    <% for (var i = 0; i < _this.length; i++) {
    %>
    <li><span class="promotion-slider-navitem"></span></li>
    <% } %>
</ul>
<a href="javascript:;" class="promotion-slider-left" title="上一个">
    <i class="icon icon-chevron-left"></i>
</a>
<a href="javascript:;" class="promotion-slider-right" title="下一张">
    <i class="icon icon-chevron-right"></i>
</a>

<% } %>

{{ -- /tpl -- }}

