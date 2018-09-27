{{ -- tpl:course-classify -- }}
<% if (_this.type === 'lest') { %>
     <p class="message-default no-data-message">
          抱歉，要不换个词重新查询或者在<span>全部类目</span>中选择相近的类目
     </p>
<% } else if (_this.type === 'less') { %>
     <p class="row-head">根据你填写的关键字，你是否是要开设以下类目的课程：</p>
     <% for (var i = 0, list = _this.list, len = list.length; i < len; i++) { 
            var item = list[i];
            var itemData = '';
            if (item[3]) {
                itemData = '' + 'data-cat1-id="' + item[1].id + '" data-cat1-name="' + item[1].name + '" '
                              + 'data-cat2-id="' + item[2].id + '" data-cat2-name="' + item[2].name + '" '
                              + 'data-cat3-id="' + item[3].id + '" data-cat3-name="' + item[3].name + '"';
            } else if (item[2]) {
                itemData = '' + 'data-cat1-id="' + item[1].id + '" data-cat1-name="' + item[1].name + '" '
                              + 'data-cat2-id="' + item[2].id + '" data-cat2-name="' + item[2].name + '" ';
            } else if (item[1]) {
                itemData = '' + 'data-cat1-id="' + item[1].id + '" data-cat1-name="' + item[1].name + '" ';
                
            }
     %>
            <div class="message-default row-classify" <%= itemData %>>
               <% if (item[3]) { %>
                    <div class="remark_name">
                         <%= item[3].remark_name %>
                    </div>
                    <%= item[1].name %>&gt;<%= item[2].name %>&gt;<%= item[3].name %>
               <% } else if (item[2]) { %>
                    <div class="remark_name">
                         <%= item[2].remark_name %>
                    </div>
                    <%= item[1].name %>&gt;<%= item[2].name %>
               <% } else if (item[1]) { %>
                    <div class="remark_name">
                         <%= item[1].remark_name %>
                    </div>
                    <%= item[1].name %>
               <% } %>
            </div>
     <% } %>
<% } else if (_this.type === 'more') { %>
     <p class="row-head">根据你填写的关键字，你是否是要开设以下类目的课程：</p>
     <% for (var classifyName in _this.list) { 
          var item = _this.list[classifyName];
          var len = item.length;
     %>
          <div class="classify">
          <div class="classify-name">
               <%= classifyName %>
          </div>
          <div class="classify-content">
          <%
                for (var i = 0; i < len; i++) {
                var itemi = item[i];
                var itemName = '';
                var itemData = '';
                if (itemi[3]) {
                    itemName = itemi[3].remark_name;
                    itemData = '' + 'data-cat1-id="' + itemi[1].id + '" data-cat1-name="' + itemi[1].name + '" '
                                  + 'data-cat2-id="' + itemi[2].id + '" data-cat2-name="' + itemi[2].name + '" '
                                  + 'data-cat3-id="' + itemi[3].id + '" data-cat3-name="' + itemi[3].name + '"';
                } else if (itemi[2]) {
                    itemName = itemi[2].remark_name;
                    itemData = '' + 'data-cat1-id="' + itemi[1].id + '" data-cat1-name="' + itemi[1].name + '" '
                                  + 'data-cat2-id="' + itemi[2].id + '" data-cat2-name="' + itemi[2].name + '" ';
                } else if (itemi[1]) {
                    itemName = itemi[1].remark_name;
                    itemData = '' + 'data-cat1-id="' + itemi[1].id + '" data-cat1-name="' + itemi[1].name + '" ';
                    
                }
          %>
               <% if (i % 5 === 0) { %>
                    <div class="row-con">
               <% } %>
               <div class="message-default row-col-classify" <%= itemData %>>
                    <%= itemName %>
               </div>
               <% if (i % 5 == 4 || i == len) { %>
                    </div>
               <% } %>
          <% } %>
          </div>
     </div>
     <% } %>
<% } else { %>
     <p class="message-default no-data">
          老师，多给小秘书点信息吧，这点信息小秘书已经挑花眼了，实在不敢给你推荐啊
     </p>
<% } %>
{{ -- /tpl -- }}