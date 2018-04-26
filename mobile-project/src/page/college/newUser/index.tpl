{{*
    @file 新手必读
    @author shubaiqiao
    @date 16/10/9
*}}

{{extends file="page/_base/base_default.tpl"}}
{{block name="page"}}
    {{$page_title = "新手必读"}}

    {{$page_module = "page/college/newUser/index"}}

    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/college/newUser/index.styl"/>
{{/block}}

{{block name="content"}}

    <div class="container">
        <div class="search">
            {{include file="page/college/ui/search/index.tpl"}}
            <!-- <div class="logo">
                <i class="icon icon-share"></i>
            </div>
            <div class="input">
                <input type="search" name="search" placeholder="请输入关键词">
                <i class="icon icon-search"></i>
            </div>
            <div class="button menu"><i class="icon icon-menu"></i></div> -->
        </div>
        <ul class="catalogue">
            {{foreach $tpl_data.funareas as $funareas name=name}}
                <li class="border-cata R{{$smarty.foreach.name.iteration-1}}Btn">
                    <a href="javascript:go('#{{$smarty.foreach.name.iteration-1}}');">{{$funareas.subtitle}}</a>
                </li>
            {{/foreach}}
        </ul>
        <!-- <ul class="catalogue">
            <li class="border-cata R0Btn"><a href="javascript:go('#0');">生效</a></li>
            <li class="border-cata R1Btn"><a href="javascript:go('#1');">开课</a></li>
            <li class="border-cata R2Btn"><a href="javascript:go('#2');">运营</a></li>
            <li class="border-cata R3Btn"><a href="javascript:go('#3');">工具</a></li>
            <li class="border-cata R4Btn"><a href="javascript:go('#4');">生效</a></li>
        </ul> -->
        <script type="text/javascript">
            function go(hr) {
                location.href = hr;
            }
        </script>

        {{foreach $tpl_data.funareas as $funareas name=name}}
            {{if isset($tpl_data.funareas[$smarty.foreach.name.iteration-1])}}
                {{foreach $funareas.submenu as $submenu}}
                    <div class="register reveal-{{$smarty.foreach.name.iteration-1}}">
                        <div class="border-b">
                            <div class="register-picture">
                                <div class="icon-img-border">
                                </div>
                                <i class="hidden-s"></i>
                                <p>{{$submenu.name}}</p>
                            </div>
                            <div class="register-list-show list-show">
                                <ul>
                                    {{foreach $submenu.qlist as $qlist}}
                                    <li>
                                        <i class="dot"></i>
                                        <a href="{{$qlist.ans_url}}">
                                            <span>{{$qlist.question}}</span>
                                        </a>
                                    </li>
                                    {{/foreach}}
                                </ul>
                            </div>
                        </div>
                    </div>
                {{/foreach}}
            {{/if}}
        {{/foreach}}

        <!-- <div class="register reveal-0">
            <div class="border-b">
                <div class="register-picture">
                    <div class="icon-img-border">
                    </div>
                    <i class="hidden-s"></i>
                    <p>用户注册</p>
                </div>
                <div class="register-list-show list-show">
                    <ul>
                        <li>
                            <i class="dot"></i>
                            <a href="#">
                                <span>老师如何注册跟谁学账号</span>
                            </a>
                            <i class="hidden-s"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="register reveal-1">
            <div class="border-b">
                <div class="register-picture">
                    <div class="icon-img-border">
                    </div>
                    <i class="hidden-s"></i>
                    <p>完善信息</p>
                </div>
                <div class="register-list-show list-show">
                    <ul>
                        <li>
                            <i class="dot"></i>
                            <a href="#">
                                <span>老师如何完善个人基本资料</span>
                            </a>
                        </li>
                        <li>
                            <i class="dot"></i>
                            <a href="#">
                                <span>老师如何上传照片和视频</span>
                            </a>
                        </li>
                        <li>
                            <i class="dot"></i>
                            <a href="#">
                                <span>老师如何设置上课地址</span>
                            </a>
                            <i class="hidden-s"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="register reveal-2">
            <div class="border-b">
                <div class="register-picture">
                    <div class="icon-img-border">
                    </div>
                    <i class="hidden-s"></i>
                    <p>认证审核</p>
                </div>
                <div class="register-list-show list-show">
                    <ul>
                        <li>
                            <i class="dot"></i>
                            <a href="#">
                                <span>老师如何完成平台认证</span>
                            </a>
                            <i class="hidden-s"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div> -->
    </div>
{{/block}}
