{{ -- tpl:quick-plan-step1 -- }}
<div class="form date-period">
    <%
        include('quick-plan-step1-group', [{labelName: '开课日期', name: 'start_date'}, {labelName: '结课日期', name: 'end_date'}]);
    %>
    <div class="form-actions">
        <button class="btn-primary next">下一步</button>
    </div>
</div>
{{ -- /tpl -- }}

{{ -- tpl:quick-plan-step1-group -- }}
<%
    for (var i = 0, len = _this.length; i < len; i++) {
        var item = _this[i];
%>
<div class="form-group inline">
    <label class="form-label"><i class="form-required"></i><%= item.labelName %>：</label>
    <div class="form-controls">
        <div class="form-date">
            <input type="text" readonly name="<%= item.name %>" data-validate-name="<%= item.name %>" class="form-text" required placeholder="YYYY-MM-DD" />
            <div class="calendar"></div>
            <span class="error"></span>
        </div>
    </div>
</div>
<% } %>
{{ -- /tpl -- }}

{{ -- tpl:quick-plan-step2 -- }}
<div class="form time-period">
    <div class="schedule"></div>
    <div class="add">
        <b><i class="icon icon-plus-o"></i>&nbsp;添加新时间段</b>
    </div>
    <div class="form-actions">
        <button class="btn-default pre">上一步</button>
        <button class="btn-primary complete">完成</button>
    </div>
    <div class="hint">
        <i class="icon icon-info-circle"></i>&nbsp;时间冲突时，新设置的课程将覆盖教学计划中的原有课程。如果有需要微调的课程，请点击“完成”后具体手动调整。'
    </div>
</div>
{{ -- /tpl -- }}

{{ -- tpl:quick-plan-step2-select-teacher -- }}
<div class="form-group teacher">
    <label class="form-label"><i class="form-required"></i>授课老师：</label>
    <div class="form-controls">
        <div class="dropdown" required>
            <button class="btn-default">
                <i class="caret"></i>
                <span>请选择老师</span>
            </button>
            <ul class="dropdown-menu"></ul>
            <span class="error">请选择老师</span>
        </div>
    </div>
</div>
{{ -- /tpl -- }}

{{ -- tpl:added-plan-item -- }}
<%
    var endTime = new Date(_this.endTime * 1000);
    var endTimeHour = endTime.getHours();
%>


<div class="plan-item" data-start-time="<%= _this.startTime %>" data-end-time="<%= _this.endTime %>" data-id="<%= _this.id || '' %>">

    <div class="form-group class-line">
        <label class="form-label"></label>
        <div class="form-controls">
            <div class="class-plan-index-container">
                <div><span class="class-plan-index">第1节</span></div>
            </div>
        </div>
    </div>
    <div class="form-group plan-container">
        <label class="form-label">课程时间</label>
        <div class="form-controls">
            <div class="course-date"><%= _this.date %></div>
            <div class="start-time"><%= _this.start %></div>
            至
            <div class="course-end-date"><%= _this.endDate %></div>
            <div class="end-time"><%= _this.end %></div>
            <div class="action delete-class-plan icon icon-delete">删除课节</div>
            <div class="action edit-class-plan icon icon-edit-o">编辑课节</div>
        </div>
    </div>
    <% if (_this.content) {
    %>
    <div class="form-group" style="margin-top: 0;">
        <label class="form-label">课程内容</label>
        <div class="form-controls">
            <div class="added-content"><%= _this.content || '' %></div>
        </div>
    </div>
    <%} %>

    <% if (_this.isOrganization) { %>
        <div class="form-group" style="margin-top: 0;">
            <label class="form-label">授课老师</label>
            <div class="form-controls">
                <div class="selected-teacher" data-teacher-id="<%= _this.teacherId %>"><%= _this.teacherName %></div>
            </div>
        </div>
    <% } %>
</div>
{{ -- /tpl -- }}

{{ -- tpl:plan-time-item -- }}
<% for (var i = 0, len = _this.length; i < len; i++) {
    var item = _this[i];
%>
    <li data-value="<%= item %>" data-text="<%= item %>">
        <%= item %>
    </li>
<% } %>
{{ -- /tpl -- }}

{{ -- tpl:single-plan-item -- }}
<% if (_this.isOrganization) { %>
<div class="form-group">
    <label class="form-label">授课老师</label>
    <div class="form-controls">
        <div class="dropdown teacher-list">
            <button class="btn-default">
                <i class="caret"></i>
                <span>请选择授课老师</span>
            </button>
            <ul class="dropdown-menu"></ul>
        </div>
        <div class="error icon icon-info-circle teacher-error">请选择授课老师</div>
    </div>
</div>
<% } %>
<div class="form-group">
    <label class="form-label">课程时间</label>
    <div class="form-controls">
        <input type="text" class="course-date form-text" readonly="readonly" placeholder="选择课程日期" />
    </div>
</div>

<div class="form-group">
    <label class="form-label">开始时间</label>
    <div class="form-controls">
        <div class="dropdown hour">
            <button class="btn-default">
                <i class="caret"></i>
                <span>小时</span>
            </button>
            <ul class="dropdown-menu"></ul>
        </div>

        <div class="dropdown minute">
            <button class="btn-default">
                <i class="caret"></i>
                <span>分钟</span>
            </button>
            <ul class="dropdown-menu"></ul>
        </div>

        <label class="form-label ending">课程时长</label>
        <div class="dropdown end-time">
            <button class="btn-default">
                <i class="caret"></i>
                <span>选择课程时长</span>
            </button>
            <ul class="dropdown-menu"></ul>
        </div>

        <div class="error icon icon-info-circle schedule-error time-error"></div>
    </div>
</div>

<div class="form-group">
    <label class="form-label">内容（选填）</label>
    <div class="form-controls">
        <textarea class="form-text plan-content" style="width: 426px; height: 100px;" maxlength="200" placeholder="请输入具体教学内容，最多200字" ></textarea>
        <div class="input-desc">填写具体的课程内容有助于学生信服您的教学</div>
        <div class="error icon icon-info-circle schedule-error content-error"></div>
    </div>
</div>

<div class="action-container">
    <button class="btn btn-primary add-single-schedule">确定</button><button class="btn btn-default cancel">取消</button>
</div>
{{ -- /tpl -- }}