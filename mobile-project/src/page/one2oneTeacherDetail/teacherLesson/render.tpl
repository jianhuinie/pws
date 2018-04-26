<div class="titles">授课信息</div>
<div class="cross-line"></div>
{{if list.subject}}
<div class="item">
    <i class="icon icon-ic_class"></i>
    <span class="title">授课科目</span>
    <span class="content">{{list.subject}}</span>
</div>
{{/if}}

{{if list.grade}}
<div class="item">
    <i class="icon icon-ic_edu-certification"></i>
    <span class="title">课程类型</span>
    <span class="content">{{list.grade}}</span>
</div>
{{/if}}

{{if list.ways}}
<div class="item">
    <i class="icon icon-ic_classway"></i>
    <span class="title">授课方式</span>
    <span class="content">{{list.ways}}</span>
</div>
{{/if}}

{{if list.areas}}
<div class="item">
    <i class="icon icon-ditu"></i>
    <span class="title">授课区域</span>
    <span class="content">{{list.areas}}</span>
</div>
{{/if}}