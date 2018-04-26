{{extends file="page_app/_base/base.tpl"}}

{{*页面配置*}}
{{block name="page" append}}
    {{*标题*}}
    {{$page_title = "评价客户经理"}}
    {{*页面入口模块, 例如:page/app_teacher/vip_index/index*}}
    {{$page_module = "page_app/teacher/comment_manager/comment_mana"}}
    {{*是否使用返回顶部的按钮*}}
    {{$enable_backTopButton = false}}
{{/block}}

{{*模板数据, 需要传递到js模块中的模板数据在这里配置*}}
{{block name="data"}}
    {{*{{$script_data["key"] = "value"}}*}}
{{/block}}

{{*页面样式*}}
{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page_app/teacher/comment_manager/comment_mana.styl"/>
{{/block}}



{{*页面内容*}}
{{block name="content"}}
    <div class="container">
        <p class="title">
            为了更好地为您服务，请认真填写以下问卷，您的反馈对跟谁学非常重要：
        </p>
        <p class="title-descri">
            （您的回答将直接发送给跟谁学客户服务监督部门，不会发送给客户经理。）
        </p>
        <div class="question">
            <div class="question-item question_1">
                <p>1. 请对客户经理的服务质量进行评价：</p>
                <div class="radio-item same-line service">
                    <span>服务态度：</span>
                    <ul>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="service" value="满意" />
                                </i>
                            </div>
                            满意
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="service" value="一般"/>
                                </i>
                            </div>
                            一般
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="service" value="不满意"/>
                                </i>
                            </div>
                            不满意
                        </li>
                    </ul>
                </div>
                <div class="radio-item same-line promise">
                    <span>承诺兑现：</span>
                    <ul>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="promise" value="满意" />
                                </i>
                            </div>
                            满意
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="promise" value="一般"/>
                                </i>
                            </div>
                            一般
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="promise" value="不满意"/>
                                </i>
                            </div>
                            不满意
                        </li>
                    </ul>
                </div>
            </div>
            <div class="question-item question_2">
                <p>2. 请对客户经理的业务质量进行评价：</p>
                <div class="radio-item same-line familiar">
                    <span>对平台熟悉程度，主动指导平台操作能力：</span>
                    <ul>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="familiar" value="满意" />
                                </i>
                            </div>
                            满意
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="familiar" value="一般"/>
                                </i>
                            </div>
                            一般
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="familiar" value="不满意"/>
                                </i>
                            </div>
                            不满意
                        </li>
                    </ul>
                </div>
                <div class="radio-item same-line speed">
                    <span>问题相应速度及解决能力：</span>
                    <ul>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="speed" value="满意" />
                                </i>
                            </div>
                            满意
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="speed" value="一般"/>
                                </i>
                            </div>
                            一般
                        </li>
                        <li class="danxuan">
                            <div class="radio-btn">
                                <i>
                                    <input type="radio" name="speed" value="不满意"/>
                                </i>
                            </div>
                            不满意
                        </li>
                    </ul>
                </div>
            </div>
            <div class="question-item question_3">
                <p>
                    3. 对客户经理的服务，有其他建议或意见？
                    <span class="select">（选填）</span>
                </p>
                <div class="input-c">
                    <textarea class="advice" type="text" maxlength="5000"></textarea>
                </div>
            </div>
        </div>
        <div class="submit" data-click="41006">提交评价</div>
    </div>

{{/block}}

{{*js脚本, 有些特殊情况js需要写在页面里的时候用写在这个block里*}}
{{block name="script"}}

{{/block}}