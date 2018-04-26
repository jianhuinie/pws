{{ -- tpl:social-rank-star -- }}
<table class="rank-table star-table">
    <thead class="rank-table-header">
        <tr>
            <th class="width-68">排名</th>
            <th class="width-198 text-left">昵称</th>
            <th>经验值</th>
            <th class="width-198"></th>
        </tr>
    </thead>
    <tbody class="rank-table-body">
        <% var tmp; %>
        <% for(var i = 0, len = _this.data.length; i < len; i++){ tmp = _this.data[i]; %>
        <tr class="<% if(i % 2){ %>even<% } else { %>odd<% } %>">
            <td class="rank-index <% if(+tmp.rank < 4){ %>active <% } %>"><%= tmp.rank %></td>
            <td class="text-left"><%=# tmp.display_name %></td>
            <td><%= tmp.experience_score %></td>
            <td></td>
        </tr>
        <% } %>
   </tbody>
</table>
{{ -- /tpl -- }}

{{ -- tpl:social-rank-teacher -- }}
<table class="rank-table teacher-table">
    <thead class="rank-table-header">
        <tr>
            <th class="width-68">排名</th>
            <th class="width-198 text-left">昵称</th>
            <th>经验值</th>
            <th class="width-198"></th>
        </tr>
    </thead>
        <tbody class="rank-table-body">
            <% var tmp; %>
            <% for(var i = 0, len = _this.data.length; i < len; i++){ tmp = _this.data[i]; %>
            <tr class="<% if(i % 2){ %>even<% } else { %>odd<% } %>">
                <td class="rank-index <%= (+tmp.rank < 4) ? ' active' : '' %>"><%= tmp.rank %></td>
                <td class="text-left"><%=# tmp.display_name %></td>
                <td><%= tmp.experience_score %></td>
                <td></td>
            </tr>
            <% } %>
        </tbody>
    </table>
{{ -- /tpl -- }}