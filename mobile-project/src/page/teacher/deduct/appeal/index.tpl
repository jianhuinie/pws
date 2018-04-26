{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "申诉"}}

    {{$page_module = "page/teacher/deduct/appeal/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data.pageData = $tpl_data}}
    {{$script_data.id = $tpl_data.id}}
    {{$script_data.problem = $tpl_data.deduct_reason}}
    {{$script_data.deduct_id = $tpl_data.id}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/teacher/deduct/appeal/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="content">
        <div class="item">申诉事项：</div>
        <div class="how">{{$tpl_data.deduct_reason}}</div>
        <div class="item">申诉说明：</div>
        <div class="text-container">
            <textarea class="form-text" placeholder="请填写20-200字说明（申诉失败后，将不能再次申诉）"></textarea>
        </div>

        <section id="add-photo">

            <div class="add-title">
                <div class="add-photos">＋添加图片
                    <span class="max">（最多5张）</span>
                    <span class="remain">200</span>
                </div>
                <input type="file" accept="image/*">
            </div>
            <div class="photo-container">
            <ul>
                <li class="add-photo">
                    {{*<div class="wrap">*}}
                    {{*<i class="icon icon-add"></i>*}}
                    {{*<input type="file" accept="image/*">*}}
                    {{*</div>*}}
               </li>
            </ul>
            </div>
        </section>
        <div class="footer">
            <div class="notice">客服处理后，我们会通过“系统通知”通知您</div>
            <span class="submit">提交申诉</span>
        </div>
    </div>
{{/block}}
