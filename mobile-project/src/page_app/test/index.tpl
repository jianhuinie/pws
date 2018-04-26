{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = ""}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = ""}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{*{{$script_data["key"] = "value"}}*}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/test/index.styl"/>
{{/block}}



{{*页面内容*}}
{{block name="content"}}
    <div id="test" style="width:500px;height:500px;border:1px solid #000;"
         data-info="{{htmlspecialchars(json_encode($tpl_data,77))}}"
    ></div>
    <input type="text" value='{{json_encode($tpl_data,77)}}'/>
    <div id="page_bottom">
        <div style="position: relative;width:100%;height:40px;border:1px solid #000;background-color:#fff;">
            <div style="position: absolute;right:0;height:40px;line-height: 40px;padding:0 20px;background:#f90;color:#fff;">
                立即购买
            </div>
        </div>
    </div>

    <div style="position: relative;width:100%;height:500px;">
        <img style="border:1px solid #000" id="abc" data-src="https://imgs.genshuixue.com/6191719_s2rhwef1.jpeg"
             width="100%"
             height="auto"
             alt="336231277812666202.jpg"
    </div>

    <script>
        var aaa = "{{$smarty}}";
    </script>

{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}
    <script>
        var emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7';

        var img = document.getElementById('abc');
        var offsetWidth = img.width;
        var offsetHeight = img.height;

        alert(img.complete + ',' + offsetWidth + ',' + offsetHeight);
        img.src = emptyImage;

        offsetWidth = img.width;
        offsetHeight = img.height;



    </script>
{{/block}}